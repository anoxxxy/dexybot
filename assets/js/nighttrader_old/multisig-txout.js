/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {

console.log("Init multisig-txout");

ych.str2bytes = function(str) {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
};

ych.privtopub = function(hash, compressed) {
  let privateKeyBigInt = BigInteger.fromByteArrayUnsigned(Crypto.util.hexToBytes(hash));
  let curve = EllipticCurve.getSECCurveByName("secp256k1");

  let curvePt = curve.getG().multiply(privateKeyBigInt);
  let x = curvePt.getX().toBigInteger();
  let y = curvePt.getY().toBigInteger();

  let publicKeyBytes = EllipticCurve.integerToBytes(x, 32);
  publicKeyBytes = publicKeyBytes.concat(EllipticCurve.integerToBytes(y,32));
  publicKeyBytes.unshift(0x04);

  if(compressed==true){
    let publicKeyBytesCompressed = EllipticCurve.integerToBytes(x,32)
    if (y.isEven()){
      publicKeyBytesCompressed.unshift(0x02)
    } else {
      publicKeyBytesCompressed.unshift(0x03)
    }
    return Crypto.util.bytesToHex(publicKeyBytesCompressed);
  } else {
    return Crypto.util.bytesToHex(publicKeyBytes);
  }
};

ych.user_keys_v1 = function(userid, password) {
  userid = ych.gui.cleanup_email(userid);
  let prvkey = Crypto.SHA256(Crypto.SHA256(userid)+Crypto.SHA256(password));
  let pubkey = ych.privtopub(prvkey, true);
  return [prvkey, pubkey];
};

ych.init_coinjs = function(coin) {
  // default testnet3
  coinjs.pub = [111];
  coinjs.priv = [239];
  coinjs.multisig = [196];
  coinjs.base32pref = "";
  coinjs.compressed = false;
  coinjs.txversion = 1;
  coinjs.shf = 0;
  coinjs.maxrbf = 0;
  coinjs.txExtraTimeField = 0;
  // from coininfo config

  if(ych.data) {
    if (!(coin in ych.data.coininfos)) {
      return; // no coininfo
    }
    if (ych.data.coininfos[coin].type != "peg_t1" &&
        ych.data.coininfos[coin].type != "txout_t1" ) {
      return; // no txout-type config
    }
    let cfg = ych.data.coininfos[coin].cfg;
    if (cfg.pub == "") {
      return; // no txout-type config pub
    }
    let pubbytes = Crypto.util.hexToBytes(cfg.pub);
    let prvbytes = Crypto.util.hexToBytes(cfg.prv);
    let msigbytes = Crypto.util.hexToBytes(cfg.msig);
    coinjs.pub = pubbytes;
    coinjs.priv = prvbytes;
    coinjs.multisig = msigbytes;
    coinjs.base32pref = cfg.pref;
    coinjs.compressed = cfg.comp;
    coinjs.txversion = cfg.txver;
    coinjs.txExtraTimeField = cfg.txtime;
    coinjs.shf = cfg.shf;
    coinjs.maxrbf = cfg.maxrbf;
  }
};

/* input txouts to be sorted min-to-max */
ych.txout_select_inps = function(txouts, amount) {
  let txouts_selected = [];
  let txouts_selected_free = 0n;
  let txouts_selected_orders = 0n;
  let txouts_selected_filled = 0n;

  // check available
  let txouts_free = 0n;
  txouts.forEach(function(txout, i) { txouts_free += txout.free; });
  if (txouts_free < amount) {
    console.log("ych_select_txouts, free", txouts_free," is less than amount", amount);
    return [txouts_selected, -1, -1, -1]
  }
  // select one-by-one
  while (txouts_selected_free < amount) {
    // from minimum to maximum
    for(let idx=0; idx< txouts.length; idx++) {
      let txout = txouts[idx];
      if ((idx+1)==txouts.length) { // last one
        txouts_selected.push(txout);
        let to_select = txout.free;
        if (txouts_selected_free + to_select > amount) {
          to_select = amount - txouts_selected_free;
        }
        txout.selected = txout.free;
        txouts_selected_free += txout.free;
        txouts_selected_orders += txout.orders;
        txouts_selected_filled += txout.filled;
        txouts = txouts.slice(0, idx);
        break;
      } else {
        if ((txouts_selected_free+txout.free) >= amount) {
          txouts_selected.push(txout);
          let to_select = txout.free;
          if (txouts_selected_free + to_select > amount) {
            to_select = amount - txouts_selected_free;
          }
          txout.selected = txout.free;
          txouts_selected_free += txout.free;
          txouts_selected_orders += txout.orders;
          txouts_selected_filled += txout.filled;
          txouts.splice(idx, 1);
          break;
        }
      }
      if (txouts_selected_free >= amount) {
        break;
      }
    };
  }

  return [txouts_selected, txouts_selected_free, txouts_selected_orders, txouts_selected_filled]
}

ych.sign_txout = function(txout) /*[usetxout, err]*/ {

  if (txout.txid == "") {
    return [null, "Txid is empty"];
  }
  if (txout.nout <0) {
    return [null, "Nout is not valid"];
  }
  const coin = txout.coin;
  const change_addr = ych.address[coin];
  if (change_addr == "") {
    return [null,"Not change address"];
  }
  if (!(coin in ych.data.coininfos)) {
    return [null,"No coininfo"];
  }
  const coininfo = ych.data.coininfos[coin];
  const coin_min = coininfo.fee.minamount;
  if (coininfo.type != "txout_t1") {
    return [null,"Not supported"];
  }
  if (txout.addr.rdsc == "") {
    return [null,"Redeem script is not valid"];
  }

  let change_sigv = txout.free-txout.selected;

  // check if ops amount is more than min amount
  let amount_ops = txout.amount - change_sigv;
  if (amount_ops < coin_min) { amount_ops = coin_min; }
  if (amount_ops > txout.amount) { amount_ops = txout.amount; }
  change_sigv = txout.amount - amount_ops;

  // check if rest amount is more than min amount
  let change_rest = txout.amount - txout.filled - change_sigv;
  if (change_rest < coin_min) { change_rest = coin_min; }
  if (change_rest > (txout.amount-txout.filled)) { change_rest = (txout.amount-txout.filled); }
  change_sigv = txout.amount - txout.filled - change_rest;

  let signed_txinp = {};
  signed_txinp.txid = txout.txid;
  signed_txinp.nout = txout.nout;
  signed_txinp.amnt = txout.amount;
  signed_txinp.fill = txout.filled;
  signed_txinp.usea = txout.selected;

  if (change_sigv >= coin_min) {

    const sigs = ych.sign_txout_multipos(
      coin,
      txout,
      change_addr,
      change_sigv
    );
    if (sigs.length == 0) {
      return [null,"Fail to sign change"];
    }

    signed_txinp.sigv = change_sigv;
    signed_txinp.siga = change_addr;
    signed_txinp.sigs = sigs;
    signed_txinp.sigf = "";

    return [signed_txinp,null];
  }

  // change is lesser than minimal, sign full

  const sigf = ych.sign_txout_full(coin, txout);
  if (sigf.length == 0) {
    return [null,"Fail to sign txout"];
  }

  signed_txinp.sigv = 0n;
  signed_txinp.siga = "";
  signed_txinp.sigs = [];
  signed_txinp.sigf = sigf;

  return [signed_txinp,null];
}

ych.sign_txout_full = function(coin, txout) {

  if (txout.txid == "") {
    console.log("Txid is empty");
    return [];
  }
  if (txout.nout <0) {
    console.log("Nout is not valid");
    return [];
  }
  if (!(coin in ych.data.coininfos)) {
    console.log("No coininfo", coin);
    return [];
  }
  const coininfo = ych.data.coininfos[coin];

  if (coininfo.type == "txout_t1") {

    if (txout.addr.rdsc == "") {
      console.log("Redeem script is not valid");
      return [];
    }

    ych.init_coinjs(coin);

    let rbf = null;
    if (coinjs.maxrbf >0) {
      rbf = coinjs.maxrbf-1;
    }
    let hashType = 130 // 0x82
    let tx = coinjs.transaction();

    // inputs
    tx.addinput(txout.txid, txout.nout, Crypto.util.hexToBytes(txout.addr.rdsc), rbf, txout.amount);

    // sigs
    let wif = coinjs.privkey2wif(ych.prvkey1);
    let sig = tx.transactionSig(0, wif, hashType);
    return sig;

  }

  console.log("Not supported", coin);
  return [];
}

ych.sign_txout_multipos = function(coin, txout, change_addr, change_amount) {

  if (txout.txid == "") {
    console.log("Txid is empty");
    return [];
  }
  if (txout.nout <0) {
    console.log("Nout is not valid");
    return [];
  }
  if (change_addr == "") {
    console.log("Change address is empty");
    return [];
  }
  if (typeof change_amount != "bigint") {
    console.log("Change need bigint", change);
    return [];
  }
  if (!(coin in ych.data.coininfos)) {
    console.log("No coininfo", coin);
    return [];
  }
  const coininfo = ych.data.coininfos[coin];

  if (coininfo.type == "txout_t1") {

    if (txout.addr.rdsc == "") {
      console.log("Redeem script is not valid");
      return [];
    }

    ych.init_coinjs(coin);
    let rbf = null;
    if (coinjs.maxrbf >0) {
      rbf = coinjs.maxrbf-1;
    }
    let wif = coinjs.privkey2wif(ych.prvkey1);

    // sign change
    let sigs = [];
    let null_txid = 'e'.repeat(64);
    for(let i=0; i< ych.sigi_num; i++) {

      let tx = coinjs.transaction();

      for (let j=0; j<i; j++) {
        let nout = 0;
        let rdsc = [];
        tx.addinput(null_txid, nout, Crypto.util.hexToBytes(rdsc), null, 1n);
        tx.addoutput(change_addr, 1n);
      }

      tx.addinput(txout.txid, txout.nout, Crypto.util.hexToBytes(txout.addr.rdsc), rbf, txout.amount);
      tx.addoutput(change_addr, change_amount);

      //console.log("rawtx1:", tx.serialize());

      // sighash
      //let shType = hashType || 1;
      //let sighash = Crypto.util.hexToBytes(tx.transactionHash(i, shType));
      //console.log(sighash);

      // sigs
      let hashType = 131 // 0x83
      let sig = tx.transactionSig(i, wif, hashType);
      let sighash = tx.transactionHash(i, hashType);

      //console.log("sighash:", Crypto.util.bytesToHex(sighash));
      //console.log("rawtx2:", tx.serialize());

      sigs.push(sig);
    }

    return sigs;

  }

  console.log("Not supported", coin);
  return [];
};
/*
ych.sign_txout_multipos = async function(coin, txout, change_addr, change_amount) {

  if (txout.txid == "") {
    console.log("Txid is empty");
    return [];
  }
  if (txout.nout <0) {
    console.log("Nout is not valid");
    return [];
  }
  if (change_addr == "") {
    console.log("Change address is empty");
    return [];
  }
  if (typeof change_amount != "bigint") {
    console.log("Change need bigint", change);
    return [];
  }
  if (!(coin in ych.data.coininfos)) {
    console.log("No coininfo", coin);
    return [];
  }
  const coininfo = ych.data.coininfos[coin];

  if (coininfo.type == "txout_t1") {

    if (txout.addr.rdsc == "") {
      console.log("Redeem script is not valid");
      return [];
    }

    ych.init_coinjs(coin);
    let rbf = null;
    if (coinjs.maxrbf >0) {
      rbf = coinjs.maxrbf-1;
    }
    let wif = coinjs.privkey2wif(ych.prvkey1);

    // sign change
    let sigs = [];
    let null_txid = 'e'.repeat(64);
    for(let i=0; i< ych.sigi_num; i++) {

      let tx = coinjs.transaction();

      for (let j=0; j<i; j++) {
        let nout = 0;
        let rdsc = [];
        tx.addinput(null_txid, nout, Crypto.util.hexToBytes(rdsc), null, 1n);
        tx.addoutput(change_addr, 1n);
      }

      tx.addinput(txout.txid, txout.nout, Crypto.util.hexToBytes(txout.addr.rdsc), rbf, txout.amount);
      tx.addoutput(change_addr, change_amount);

      //console.log("rawtx1:", tx.serialize());

      // sighash
      //let shType = hashType || 1;
      //let sighash = Crypto.util.hexToBytes(tx.transactionHash(i, shType));
      //console.log(sighash);

      // sigs
      let hashType = 131 // 0x83
      let sig = tx.transactionSig(i, wif, hashType);
      let sighash = tx.transactionHash(i, hashType);

      //console.log("sighash:", Crypto.util.bytesToHex(sighash));
      //console.log("rawtx2:", tx.serialize());

      sigs.push(sig);
      await new Promise(resolve => setTimeout(resolve, 0)); // Introduce a small delay between iterations
    }

    return sigs;

  }

  console.log("Not supported", coin);
  return [];
};

*/
// ws

});
