/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {

console.log("Init utils-gui");

ych.gui.format_date = function(t) {
  if (t==0) {
    return "-";
  }
  let now = new Date();
  let date = new Date(1000 * t);
  let lzero = function(i) {
    if (i < 10) { i = "0" + i; }
    return i;
  }
  if (now.getFullYear() == date.getFullYear()
    && now.getMonth() == date.getMonth()
    && now.getDate() == date.getDate()) {
    return lzero(date.getHours()) + ":" + lzero(date.getMinutes()) + ":" + lzero(date.getSeconds());
  }
  if (now.getFullYear() == date.getFullYear()) {
    var ms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return ms[date.getMonth()]+ " " + lzero(date.getDate()) + " " + lzero(date.getHours()) + ":" + lzero(date.getMinutes());
  }
  var ms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return ms[date.getMonth()]+ " " + lzero(date.getDate()) + " " + date.getFullYear();
};

ych.gui.format_txout_link1 = function(coin, txid, nout) {
  const typ = ych.data.coininfos[coin].type;
  let txoutid = txid.substr(0,8)+":"+nout;
  let url = ych.data.coininfos[coin].ext.txhashurl;
  if (url != "" && url != undefined && (typ == "txout_t1" || typ == "peg_t1" || typ == "evm_t1" || typ == "erc20_t1")) {
    url = url.replace("{txid}", txid);
    url = url.replace("{nout}", nout);
    return "<a class='ytable-txout-a' href='"
      +url
      +"' target='_blank'>"
      +txoutid
      +"</a>";
  }
  return txoutid;
};

ych.gui.format_txout_link2 = function(coin, txid, nout, state) {
  const typ = ych.data.coininfos[coin].type;
  let txoutid = txid.substr(0,8)+":"+nout;
  if (state == 350) txoutid = txid.substr(0,8)+"'"+nout;
  if (state == 800) txoutid = txid.substr(0,8)+"."+nout;
  let url = ych.data.coininfos[coin].ext.txhashurl;
  if (url != "" && url != undefined && (typ == "txout_t1" || typ == "peg_t1")) {
    url = url.replace("{txid}", txid);
    url = url.replace("{nout}", nout);
    return "<a class='ytable-txout-a' href='"
      +url
      +"' target='_blank'>"
      +txoutid
      +"</a>";
  }
  return txoutid;
};

ych.gui.format_addr_link = function(coin, addr) {
  let url = ych.data.coininfos[coin].ext.txaddrurl;
  if (url != "" && url != undefined) {
    url = url.replace("{addr}", addr);
    let short = addr.substr(0,6)+"..."+addr.substr(addr.length-4,addr.length);
    return "<a class='ytable-txout-a' href='"
      +url
      +"' target='_blank'>"
      +short
      +"</a>";
  }
  return addr;
};

ych.gui.format_amount = function(amount) {
  if (amount <0) {
    return "-"+ych.gui.format_amount(-amount);
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let html = "";
  let sats = Number(amount % 100000000n)
  let text_coin = (amount/100000000n)+".";
  let text_sats = zeroPad(sats, 8);
  let text = text_coin+text_sats;
  let pref = text.match(/^0(\.)?0*/g);
  if (pref != null) {
    html += '<span class="ysemi text-muted">'+pref[0]+'</span>';
    let left = text.substr(pref[0].length);
    html += '<span class="ynormb">'+left+'</span>';
  } else {
    html += '<span class="ynormb">'+text_coin+'</span>';
    html += '<span class="ysemi">'+text_sats+'</span>';
  }
  return html;
};

ych.gui.format_amount_off = function(amount) {
  if (amount <0) {
    return "-"+ych.gui.format_amount_off(-amount);
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let html = "";
  let sats = Number(amount % 100000000n)
  let text_coin = (amount/100000000n)+".";
  let text_sats = zeroPad(sats, 8);
  let text = text_coin+text_sats;
  let pref = text.match(/^0(\.)?0*/g);
  if (pref != null) {
    html += '<span class="ysemi">'+pref[0]+'</span>';
    let left = text.substr(pref[0].length);
    html += '<span class="ysemi">'+left+'</span>';
  } else {
    html += '<span class="ysemi">'+text_coin+'</span>';
    html += '<span class="ysemi">'+text_sats+'</span>';
  }
  return html;
};

ych.gui.format_amount_nb = function(amount) {
  if (amount <0) {
    return "-"+ych.gui.format_amount(-amount);
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let html = "";
  let sats = Number(amount % 100000000n)
  let text = (amount/100000000n)+"."+zeroPad(sats, 8);
  let pref = text.match(/^0(\.)?0*/g);
  if (pref != null) {
    html += '<span class="ysemi">'+pref[0]+'</span>';
    let left = text.substr(pref[0].length);
    html += '<span class="ynorm">'+left+'</span>';
  } else {
    html += '<span class="ynorm">'+text+'</span>';
  }
  return html;
};

ych.gui.format_amount_or_empty = function(amount) {
  if (amount != 0) return ych.gui.format_amount(amount);
  return "-";
};

ych.gui.format_usd_like = function(symb, amount) {
  if (amount <0) {
    return "-"+ych.gui.format_usd_like(symb, -amount);
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let html = "";
  let usd = (Math.round(amount*100) / 100);
  let left = zeroPad(Math.round(usd*100 % 100), 2);
  let pref = Number(((usd*100-usd*100 % 100)/100).toFixed(0)).toLocaleString();
  html += '<span class="ysemi">'+symb+'</span>';
  html += '<span class="ynorm">'+pref+'</span>';
  html += '<span class="ysemi ycents">.'+left+'</span>';
  return html;
};

ych.gui.format_usd = function(amount) {
  if (amount <0) {
    return "-"+ych.gui.format_usd(-amount);
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let html = "";
  let usd = (Math.round(amount*100) / 100);
  let left = zeroPad(Math.round(usd*100 % 100), 2);
  let pref = Number(((usd*100-usd*100 % 100)/100).toFixed(0)).toLocaleString();
  html += '<span class="ysemi">≈$</span>';
  html += '<span class="ynorm">'+pref+'</span>';
  html += '<span class="ysemi ycents">.'+left+'</span>';
  return html;
};

ych.gui.format_usd_off = function(amount) {
  if (amount <0) {
    return "-"+ych.gui.format_usd(-amount);
  }
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  let html = "";
  let usd = (Math.round(amount*100) / 100);
  let left = zeroPad(Math.round(usd*100 % 100), 2);
  let pref = Number(((usd*100-usd*100 % 100)/100).toFixed(0)).toLocaleString();
  html += '<span class="ysemi">≈$</span>';
  html += '<span class="ysemi">'+pref+'</span>';
  html += '<span class="ysemi ycents">.'+left+'</span>';
  return html;
};

ych.gui.format_usd_or_empty = function(amount) {
  return ych.gui.format_usd(amount); // tmp
  if (amount >= 0.01) return ych.gui.format_usd(amount);
  return "-";
};

ych.gui.format_paused = function(text, paused) {
  let html = "";
  if (paused >0) {
    html += '<span class="ysemi">'+text+'</span>';
  } else {
    html += '<span>'+text+'</span>';
  }
  return html;
};

ych.gui.cleanup_email = function(email) {
  if (email.startsWith("BM-")) {
    return email;
  }
  return email.toLowerCase();
};

ych.gui.check_email = function(email) {
  if (email.startsWith("BM-")) {
    try {
      coinjs.base58decode(email.substring(3));
    } catch(e) {
      console.log(e);
      return false;
    }
    return true;
  }

  var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return re.test(email);
};

ych.gui.get_input_amount = function(id) {
  let amount = 0n;
  if (!isNaN($( '#'+id ).val()) && $( '#'+id ).val() != "") {
    amount = BigInt(Math.floor(0.5 + parseFloat($( '#'+id ).val()) *1e8));
  }
  return amount;
};

ych.gui.get_bigIntValue = function(num) {
  let amount = 0n;
  if (!isNaN(num) && num != "") {
    amount = BigInt(Math.floor(0.5 + parseFloat(num *1e8)));
  }
  return amount;
};

});

