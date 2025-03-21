var ych = function() {};
ych.gui = function() {};
var xybot = {};
xybot.version = 0.5;
xybot.init = {};      //handle initalization of ych and view/template vars
xybot.balance = {};
xybot.page = {};
xybot.part = {};
xybot.part.orderbook = {};
xybot.view = {};        //contains all the views (rendered)
xybot.current_market = {};  //{market: 'TLTC-BTC', coina: 'TLTC', coinb: 'TBTC'};
xybot.current_coin = "";  //coin specific pages, deposit withdrawal etc..
xybot.vars = {};            //has arrays and objects, like groupedMarketpairs
xybot.vars.mikado = {};            //contains Mikado template data and rendered data



xybot.api = {testnet: 'testnet-api.nighttrader.exchange', mainnet: 'my-api.nighttrader.exchange'}




//set default network
const validNetworks = ["mainnet", "testnet"];
const network = validNetworks.includes(storage_s.get("xybot")?.network) 
  ? storage_s.get("xybot").network 
  : "mainnet"; // Default to "mainnet" if missing or invalid.

xybot.network = xybot.api[network];

document.querySelectorAll("[data-set-network]").forEach(el => {
    el.classList.toggle("active", el.dataset.setNetwork === network);
  });


$( function() {

console.log("Init1 - Exchange.js");

window.ych_login_path = "/u/init";
window.ych_buy_path = "/u/buy";
window.ych_sell_path = "/u/sell";
window.ych_nobuy_path = "/u/nobuy";
window.ych_nosell_path = "/u/nosell";
window.ych_withdraw_path = "/u/withdraw";
window.ych_nowithdraw_path = "/u/nowithdraw";
window.ych_withdraw_evm_txid = "/u/withdraw_evm_txid";
window.ych_address_path = "/u/address";


// data keeping

ych.nnum = "";
ych.user = "";
ych.sigi_num = 30;
ych.pubkey1 = "";
ych.prvkey1 = "";
ych.pubkey2 = "";
ych.pubkey3 = "";
ych.address = {};
ych.locktime1 = {};
ych.locktime2 = {};

ych.asset_extra = {};

ych.data = {};
ych.data.buys = {};
ych.data.sells = {};
ych.data.trades = {};

ych.ws_calls = {};

ych.gui.tables = {};
ych.gui.pagesize = 15;
ych.gui.current_market = '';
ych.gui.buys_up_side_down = false;
ych.gui.prefs_txouts_debug = true;

ych.gui.connecting1 = true;
ych.gui.connecting2 = true;

ych.timer_reauth = setTimeout(function() {}, 5*60*1000);

ych.zerotxid = "0000000000000000000000000000000000000000000000000000000000000000";

//for deposit and withdrawal
//for deposit and withdrawal
ych.gui.parts = {};
ych.gui.parts["recv"] = {}; 
ych.gui.parts["recv"]["evm"] = {}; 

ych.gui.parts["send"] = {}; 
ych.gui.parts["send"]["evm"] = {}; 
ych.gui.parts["send"]["crypto"] = {}; 
ych.gui.parts["send"]["instant"] = {}; 

ych.gui.pages = {}; //added for withdrawals

/*
ych.gui.parts = {
  "recv": {
    "evm": {},
  },
  "send": {
    "evm": {},
    "crypto": {},
    "instant": {},

  },
};
*/
console.log('ych.gui.parts: ', ych.gui.parts);


//var part = {};  //for deposits
//var partWithdraw = {};  //for withdrawals
var page = {};  //for modals show_error, show_warn, clear_error...




ych.gui.cleanup_email = function(email) {
  if (email.startsWith("BM-")) {
    return email;
  }
  return email.toLowerCase();
};

window.onconnecting = function() {
  if (ych.gui.connecting1) {
    $( '#pages' ).hide();
    $( '#connecting2' ).hide();
  } else if (ych.gui.connecting2) {
    $( '#pages' ).hide();
    $( '#connecting1' ).hide();
  } else {
    $( '#pages' ).show();
    $( '#connecting1' ).hide();
    $( '#connecting2' ).hide();
  }
};
});

ych.gui.update_balance = function(balance) {
  //if ("account" in ych.gui.parts) {
    //if ("balances" in ych.gui.parts.account) {
      //ych.gui.parts.account.balances.update_balance(balance);
    //}
  //}
  xybot.balance.update(balance);
}


//if password is not set by user, upon withdrawal: validate the user password!
ych.gui.call_with_pass1 = function() {
  return new Promise((resolve, reject) => {
    // check if prv key is in memory
    if (ych.prvkey1 != "") {
      resolve({ok:true,msg:""});
      return;
    }

    // prv key is not present, ask for it!
    $('#modal-privkey').modal('show');
    
    // Bootstrap modal 'hidden.bs.modal' event is triggered when the modal is closed
    $('#modal-privkey').on('hidden.bs.modal', function () {
        // Clean up event listener
        $('#modal-privkey').off('hidden.bs.modal');

        //restore/enable the deposit button 
        //$( '#page-recv-evm-but-deposit' ).prop("disabled",false);
        //$( '#part-recv-evm-but-register-sender' ).prop("disabled",false);

        if (ych.prvkey1 == "") {
          console.log('exchange.js: privkey missmatch!')
          resolve({ok:false,msg:"public key mismatch"});
        }

        // Resolve the Promise when the modal is closed
        //resolve();
        //resolve({ok:true,msg:""});
    });
  });
};

//get input/withdrawal amount
ych.gui.get_input_amount = function(id) {
  let amount = 0n;
  if (!isNaN($( '#'+id ).val()) && $( '#'+id ).val() != "") {
    amount = BigInt(Math.floor(0.5 + parseFloat($( '#'+id ).val()) *1e8));
  }
  return amount;
};


ych.gui.update_markettrades = function(market, tradesupdatepage) {
  xybot.update_markettrades(market, tradesupdatepage);
}
