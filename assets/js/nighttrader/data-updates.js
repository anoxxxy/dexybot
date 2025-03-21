/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {

console.log("Init data updates");

ych.gui.update_coininfo2 = function(coininfo) {
  if (ych.data.profile != null) {
    if (coininfo.coin in ych.data.profile.balances) {
      let balance = ych.data.profile.balances[coininfo.coin];
      ych.gui.parts.account.balances.show_sync(balance, coininfo);
    }
  }
  ych.data_update("coininfo", coininfo);
};

ych.data_update2 = function(name, data) {
  let callname = "on_"+name;
  for (let path in ych.gui.pages) {
    let page = ych.gui.pages[path];
    if (callname in page) {
      let call = page[callname];
      call(data);
    }
    if (path in ych.gui.parts) {
      for (let part_name in ych.gui.parts[path]) {
        let part = ych.gui.parts[path][part_name];
        if (callname in part) {
          let call = part[callname];
          call(data);
        }
      }
    }
  }
};

ych.gui.update_balance2 = function(balance) {
  if ("account" in ych.gui.parts) {
    if ("balances" in ych.gui.parts.account) {
      ych.gui.parts.account.balances.update_balance(balance);
    }
  }
}

});
