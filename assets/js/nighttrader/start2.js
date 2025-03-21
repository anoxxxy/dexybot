/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {
window.getJWT = function() {
  const regex = /jwt=(.*?)(?:;|$)/;
  const match = regex.exec(document.cookie);
  const jwt = match ? match[1] : null;
  return jwt;
};

console.log("Start2");

  

// init data
$.ajax({
  type: "GET",
  url: "https://"+xybot.network+"/u/init",
  data: JSON.stringify({}),
  contentType: "application/json",
  dataType: "text",
  //'Authorization': 'Bearer <token>'
  //set tokenString before send
  headers: { 'Authorization': 'Bearer ' + window.getJWT() },
  //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + window.getJWT() ); }, 

  


  /*
  crossDomain: true,
  
  
  headers: {'Access-Control-Allow-Origin': '*'},
  headers: {'Cookie': document.cookie},
  

  xhrFields: {
    withCredentials: true
  },

  headers: {'Access-Control-Allow-Origin': '*'},
  headers: {'Cookie': document.cookie},
  
  
  
  headers: {
    'icecar':'Basic xxxxxxxxxxxxx',
  },
  headers: { 'Cookie': 'some value' }
  */
  

  success: function(datastr) {
    const data = JSON.parse(datastr, jsonBNparse);
    console.log('Connecting1 data: ', data);
    if (data.ok) {
      
      ych.gui.connecting1 = false;
      window.onconnecting();
      //we got init data
      window.ych_gui_on_init(data);
      

      //not needed for bot - ice
      // navigate to start page
      //let path = window.location.hash;
      //window.ych_onnavigate(path);

      iziToast.success({
        icon: 'ti ti-check',
        title: 'Success',
        message: `Connected to NightTrader`,
      });

    } else {
      //need to indicate error
      console.log(data);
      console.log("logout");
      ych.gui.connecting1 = true;
      window.onconnecting();
      
      iziToast.error({
        icon: 'ti ti-alert-circle',
        title: 'Error-C1',
        message: `Unable to connect to NightTrader`,
      });
      console.log(`Connecting1: Success: ${data}`)
      //$( '#connecting1 .alert' ).text(data);
    }
  },
  error: function(xhr, status, error) {
    //need to indicate error
    console.log(xhr, status, error);
    console.log("logout");
    ych.gui.connecting1 = true;
    window.onconnecting();
    //$( '#connecting1 .alert' ).text("Status: "+status+", error: "+error);

    console.log(`Connecting2 Error: Status: ${status}, Error: ${error}`)

    iziToast.error({
      icon: 'ti ti-alert-circle',
      title: 'Error-C2',
      message: `Unable to connect to NightTrader`,
    });

  }
});

window.ych_reauth = function() {
  let jwt = ych.get_cookie('jwt');
  let jwt_parts = jwt.split('.');
  let uid = '';
  if (jwt_parts.length == 3) {
    let b64 = jwt_parts[1].replace('-', '+').replace('_', '/');
    let jwt_info = JSON.parse(window.atob(b64));
    if ('uid' in jwt_info) {
      uid = jwt_info.uid
    }
  }
  if (uid == '') {
    return;
  }
  //console.log("reauth:", uid);

  $.ajax({
    type: "GET",
    url: "https://"+xybot.network+"/u/reauth",
    data: JSON.stringify({}),
    dataType: 'json',
    headers: { 'Authorization': 'Bearer ' + window.getJWT() },
    //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + window.getJWT() ); }, 
    //beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 

    success: function(data) {
      if (data.ok) {
        document.cookie = 'jwt='+data.access+';SameSite=Strict';
        window.ych_ws_init();
      } else {
        //window.ych_gui_on_logout(); //not needed for bot - ice
      }
    },
    error: function(xhr, status, error) {
      //window.ych_gui_on_logout(); //not needed for bot - ice
    }
  });
};

window.ych_gui_on_login = function(user, profile) {

  console.log('===window.ych_gui_on_login===')


  xybot.login(user, profile);
  
  //ych.data_update("login", profile);

  profile.assets.forEach(function(asset, idx) {
    let coin = asset.coin;
    if (asset.address != "") {
      ych.address[coin] = asset.address;
    }
  });
  for (let coin in profile.balances) {
    const balance = profile.balances[coin];
    ych.gui.update_balance(balance);
  }
  profile.assets.forEach(function(asset, idx) {
    let coin = asset.coin;
    let coininfo = ych.data.coininfos[coin];
    if (asset.address != "") {
      ych.address[coin] = asset.address;
      ych.locktime1[coin] = asset.locktime1;
      ych.locktime2[coin] = asset.locktime2;
    } else {
      if (!(coin in ych.address)) {
        ych.address[coin] = asset.address;
        ych.locktime1[coin] = asset.locktime1;
        ych.locktime2[coin] = asset.locktime2;
      }
    }
    if (asset.extra != undefined) {
      ych.asset_extra[coin] = asset.extra;
    }

    if (coininfo.type == "txout_t1") {
      ych.init_coinjs(coin);
      let multi = coinjs.pubkeys2MultisigAddressWithBackup(
        ych.pubkey1,
        ych.pubkey2,
        asset.locktime1,
        asset.locktime2);

      let msig_addr = multi["address"];
      let msig_rdsc = multi["redeemScript"];

      if (msig_addr != asset.address && asset.address != "") {
        // (mismatch with server)
        // todo: indicate error
        console.log(coin+" address mismatch, server:"+asset.address+", client:"+msig_addr);
      } else {
        // all ok
      }
    }

    
    /*ych.data_update("txouts", {coin,txouts:ych.data.profile.txouts});
    if ("market" in ych.gui.parts) {
      if ("txouts" in ych.gui.parts.market) {
        ych.gui.parts.market.txouts.update_debit_credit(coin);
        if (ych.gui.current_market in ych.data.markets) {
          let market = ych.data.markets[ych.gui.current_market];
          if (market["coina"] == coin) {
            ych.gui.parts.market.txouts.update_txouts_a(asset.txoutspage);
          }
          if (market["coinb"] == coin) {
            ych.gui.parts.market.txouts.update_txouts_b(asset.txoutspage);
          }
        }
      }
    }
    */
    
  });


}

window.ych_gui_on_logout = function() {
  console.log('===window.ych_gui_on_logout===')

  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=Strict';
  ych.user = '';
  ych.data.profile = null;
  //ych.data_update("logout", {});
  window.ych_ws_init()

  xybot.logout();
};

  
//ws
  ych.ws_calls["balances"] = function(wsdata) {
    //console.log('==ych.ws_calls["balances"]==');  //iceee commented out
    let balances = wsdata.objects[0];
    balances.forEach(function(balance, idx) {
      ych.data.profile.balances[balance.coin] = balance;
      ych.gui.update_balance(balance);
    }); 
  };



ych.ws_calls["coininfo"] = function(wsdata) {
  //console.log('==ych.ws_calls["coininfo"]=='); //iceee commented out
  let coininfo = wsdata.objects[0];
  //console.log('==ych.ws_calls["coininfo"]==', coininfo); //iceee commented out
  ych.data.coininfos[coininfo.coin] = coininfo;
  
  //ych.gui.update_coininfo(coininfo);
  //page.update_coininfo_in_table(coininfo);
};

ych.ws_calls["txoutsupdate"] = function(wsdata) {
  //console.log('==ych.ws_calls["txoutsupdate"]=='); //iceee commented out
  let coin = wsdata.objects[0];
  let txouts = wsdata.objects[1];

  //part.update_debit_credit();
  ych.data.profile.txouts[coin] = txouts;
  /*if (ych.gui.current_market in ych.data.markets) {
    let market = ych.data.markets[ych.gui.current_market];
    let balance = ych.data.profile.balances[coin];
    if (market["coina"] == coin) {
      part.update_txouts_a(txouts);
    }
    if (market["coinb"] == coin) {
      part.update_txouts_b(txouts);
    }
  }
  ych.data_update("txouts", {coin,txouts});
  ych.gui.pages.account.update_expired_table();
  */
};

ych.ws_calls["userbuysupdate"] = function(wsdata) {
  console.log('==ych.ws_calls["userbuysupdate"]==')
  let buysupdate = wsdata.objects[0];
  let marketname = buysupdate.coina+"-"+buysupdate.coinb;
  ych.data.profile.buys[marketname] = buysupdate.buyspage;
  /*if (marketname == ych.gui.current_market) {
    part.update_buyorders(buysupdate.buyspage);
  }*/
  xybot.update_userorders(marketname, buysupdate.buyspage);
}

ych.ws_calls["usersellsupdate"] = function(wsdata) {
  //console.log('==ych.ws_calls["usersellsupdate"]==');   //iceee commented out
  let sellsupdate = wsdata.objects[0];
  let marketname = sellsupdate.coina+"-"+sellsupdate.coinb;
  ych.data.profile.sells[marketname] = sellsupdate.sellspage;
  /*if (marketname == ych.gui.current_market) {
    part.update_sellorders(sellsupdate.sellspage);
  }
  */
  xybot.update_userorders(marketname, sellsupdate.sellspage);
}

ych.ws_calls["buysupdate"] = function(wsdata) {
  let buysupdate = wsdata.objects[0];
  let marketname = buysupdate.coina+"-"+buysupdate.coinb;
  ych.data.buys[marketname] = buysupdate.buyspage;

  xybot.part.orderbook.update('buy');
  /*if (marketname == ych.gui.current_market) {
    part.update_buyvolumes(buysupdate.buyspage);
    let highest_bid = 0;
    if (buysupdate.buyspage.length) {
      highest_bid = buysupdate.buyspage[0].price;
    }
    ych.gui.parts.market.buy.fill_buyprice('makesell-offer-text', highest_bid);
  }
  */
}

ych.ws_calls["sellsupdate"] = function(wsdata) {
  let sellsupdate = wsdata.objects[0];
  let marketname = sellsupdate.coina+"-"+sellsupdate.coinb;
  ych.data.sells[marketname] = sellsupdate.sellspage;
  xybot.part.orderbook.update('sell');
  /*if (marketname == ych.gui.current_market) {
    part.update_sellvolumes(sellsupdate.sellspage);
    let lowest_ask = 0;
    if (sellsupdate.sellspage.length) {
      lowest_ask = sellsupdate.sellspage[0].price;
    }
    ych.gui.parts.market.sell.fill_sellprice('makebuy-offer-text', lowest_ask);
  }*/
}

ych.ws_calls["markettradesupdate"] = function(wsdata) {
  let tradesupdate = wsdata.objects[0];
  let market = wsdata.objects[1];
  let marketname = tradesupdate.coina+"-"+tradesupdate.coinb;
  ych.data.trades[marketname] = tradesupdate.page;
  /*if (marketname == ych.gui.current_market) {
    page.update_markettrades(tradesupdate.page);
  }
  ych.gui.pages.main.update_market(market);
  */
  //console.log('==ych.ws_calls["markettradesupdate"]==', market, tradesupdate.page);
  ych.gui.update_markettrades(market, tradesupdate.page);
};

ych.ws_calls["usertradesupdate"] = function(wsdata) {
  //console.log('==ych.ws_calls["usertradesupdate"]==')
  let tradesupdate = wsdata.objects[0];
  let marketname = tradesupdate.coina+"-"+tradesupdate.coinb;
  ych.data.profile.trades[marketname] = tradesupdate.page;
  /*if (marketname == ych.gui.current_market) {
    page.update_usertrades(tradesupdate.page);
  }
  */

  //xybot.update_usertrades(tradesupdate.page); //user trade_history

};

//deposit

ych.ws_calls["depositaddress"] = function(wsdata) {
  let update = wsdata.objects[0];
  let coin = update.coin;
  ych.address[coin] = update.addr;
  ych.locktime1[coin] = update.lck1;
  ych.locktime2[coin] = update.lck2;
  if (xybot.current_coin == coin) {
    for (let part_name in ych.gui.parts["recv"]) {
      let part = ych.gui.parts["recv"][part_name];
      callname = "update";
      if (callname in part) {
        let call = part[callname];
        call(data);
      }
    }
  }
  // balance table to indicate deposit
  if (coin in ych.data.profile.balances) {
    ych.gui.update_balance(ych.data.profile.balances[coin]);
  }
};

ych.ws_calls["adddeposit"] = function(wsdata) {

  //let balances = wsdata.objects[0];
  //balances.forEach(function(balance, idx) {
  //  ych.gui.update_balance(balance);
  //});

  let adddeposit = wsdata.objects[1];
  let coin = adddeposit.coin;
  let depositspage = ych.data.profile.deposits[coin];

  // index to be greater
  todo_add = true;
  depositspage.forEach(function(deposit, idx) {
    if (deposit.index >= adddeposit.index) {
      todo_add = false;
      return; // looks like a message for old deposit
    }
  });

  if (!todo_add) {
    return;
  }

  // add as first and slice to pagesize
  depositspage.unshift(adddeposit);
  depositspage = depositspage.slice(0,ych.gui.pagesize);
  ych.data.profile.deposits[coin] = depositspage;

  if (coin == xybot.current_coin) {
    //page.update(coin);  //iceee fix me
  }
};

ych.ws_calls["regdeposit"] = function(wsdata) {
  //console.log(wsdata);

  //let balances = wsdata.objects[0];
  //balances.forEach(function(balance, idx) {
  //  ych.gui.update_balance(balance);
  //});

  let regdeposit = wsdata.objects[1];
  let depositspage = ych.data.profile.deposits[regdeposit.coin];
  depositspage.forEach(function(deposit, idx) {
    if (regdeposit.index == deposit.index) {
      depositspage[idx] = regdeposit;
      deposit = regdeposit;

      if (regdeposit.coin == xybot.current_coin) {
        $( "#recv-table-"+idx+'-Date'   ).text(ych.gui.format_date(deposit.date));
        $( "#recv-table-"+idx+'-Amount' ).text("+"+(deposit.amount/1.e8).toFixed(8));
        if (deposit.liquid >0) {
          $( "#recv-table-"+idx+'-liquid' ).text("+"+(deposit.liquid/1.e8).toFixed(8));
        }
        if (deposit.reserve >0) {
          $( "#recv-table-"+idx+'-reserve').text("+"+(deposit.reserve/1.e8).toFixed(8));
        }
        $( '#recv-table-'+idx+'-USD-R' ).html(ych.gui.format_usd(deposit.usdext));
        if (deposit.registered) {
          $( "#recv-table-"+idx+'-Status-C' ).text("DEPOSITED");
        } else {
          $( "#recv-table-"+idx+'-Status-C' ).text("PENDING");
        }
      }
    }
  });
};

//withdrawal
ych.ws_calls["addressesupdate1"] = function(wsdata) {
  console.log("start2.js - ych.ws_calls.addressesupdate1", wsdata);
  const update1 = wsdata.objects[0];
  if (update1.coin != part.coin) {
    return;
  }
  const list = update1.list;
  if (!(part.coin in ych.asset_extra)) {
    ych.asset_extra[part.coin] = {};
    ych.asset_extra[part.coin].senders = [];
  }
  ych.asset_extra[part.coin].senders = list;
  //part.update(part.coin, false);
}


// ws
//related to withdrawals to address or instant?

ych.ws_calls["addwithdraw"] = function(wsdata) {

  console.log('ych.ws_calls["addwithdraw"]');
  //let balances = wsdata.objects[0];
  //balances.forEach(function(balance, idx) {
  //  ych.gui.update_balance(balance);
  //});

  let addwithdraw = wsdata.objects[1];
  let withdrawspage = ych.data.profile.withdraws[addwithdraw.coin];

  // index to be greater
  withdrawspage.forEach(function(withdraw, idx) {
    if (withdraw.uidx >= addwithdraw.uidx) {
      return; // looks like a message for old withdraw
    }
  });

  // add as first and slice to pagesize
  withdrawspage.unshift(addwithdraw);
  withdrawspage = withdrawspage.slice(0,ych.gui.pagesize);
  ych.data.profile.withdraws[addwithdraw.coin] = withdrawspage;

  if (addwithdraw.coin == xybot.current_coin) {
    //page.update_table(withdrawspage, addwithdraw.coin);
    console.log('add Withdrawals ?', withdrawspage, addwithdraw.coin)
    //render withdrawals history table
    xybot.update_userwithdrawals_table(addwithdraw.coin);
  }
};

ych.ws_calls["regwithdraw"] = function(wsdata) {

  console.log('ych.ws_calls["regwithdraw"]');
  //let balances = wsdata.objects[0];
  //balances.forEach(function(balance, idx) {
  //  ych.gui.update_balance(balance);
  //});



  let regwithdraw = wsdata.objects[1];
  let withdrawspage = ych.data.profile.withdraws[regwithdraw.coin];

  withdrawspage.forEach(function(withdraw, idx) {
    if (regwithdraw.uidx == withdraw.uidx) {
      withdrawspage[idx] = regwithdraw;
      withdraw = regwithdraw;
    }
  });

  if (regwithdraw.coin == xybot.current_coin) {
    //page.update_table(withdrawspage, regwithdraw.coin);
    console.log('Register Withdrawals ?', withdrawspage, regwithdraw.coin)
    //render withdrawals history table
    xybot.update_userwithdrawals_table(regwithdraw.coin);
  }
  


  let coininfo = ych.data.coininfos[regwithdraw.coin];
  if (coininfo.type == "evm_t1" || coininfo.type == "erc20_t1") {
    ych.gui.parts.send.evm.on_withdraw_bcast(regwithdraw);
  }
};



});
