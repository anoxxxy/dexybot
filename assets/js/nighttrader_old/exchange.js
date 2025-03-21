var ych = function() {};
ych.gui = function() {};
var xybot = {};
xybot.balance = {};
xybot.page = {};
xybot.part = {};
xybot.part.orderbook = {}

$( function() {

console.log("Init1 - Exchange.js");

window.ych_login_path = "/u/init";
window.ych_buy_path = "/u/buy";
window.ych_sell_path = "/u/sell";
window.ych_nobuy_path = "/u/nobuy";
window.ych_nosell_path = "/u/nosell";


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
