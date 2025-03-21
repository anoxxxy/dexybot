/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {

console.log("Start2");

// init data
$.ajax({
  type: "GET",
  url: "https://testnet.nighttrader.exchange/u/init",
  data: JSON.stringify({}),
  contentType: "application/json",
  dataType: "text",
  //'Authorization': 'Bearer <token>'
  //set tokenString before send
  //headers: { 'Authorization': 'Bearer ' + document.cookie },
  beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 

  
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
    console.log('data: ', data);
    if (data.ok) {
      
      ych.gui.connecting1 = false;
      window.onconnecting();
      //we got init data
      window.ych_gui_on_init(data);
      

      //not needed for bot - ice
      // navigate to start page
      //let path = window.location.hash;
      //window.ych_onnavigate(path);
    } else {
      //need to indicate error
      console.log(data);
      console.log("logout");
      ych.gui.connecting1 = true;
      window.onconnecting();
      $( '#connecting1' ).text(data);
    }
  },
  error: function(xhr, status, error) {
    //need to indicate error
    console.log(xhr, status, error);
    console.log("logout");
    ych.gui.connecting1 = true;
    window.onconnecting();
    $( '#connecting1' ).text("Status: "+status+", error: "+error);
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
  console.log("reauth:", uid);

  $.ajax({
    type: "GET",
    url: "https://testnet.nighttrader.exchange/u/reauth",
    data: JSON.stringify({}),
    dataType: 'json',
    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 
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

  $( '#page-login-box-status' ).removeClass('hidden');
  $( '#page-login-box-status .alert' ).removeClass('alert-danger').addClass('alert-success').html('Connected to NightTrader! <br> user: '+ych.user);

  
  
  $( '[data-user="email"]').text(ych.user);
  $( '[data-user="title"]').text(ych.data.profile.title);

  //generate icon from pubkey1
  $( '[data-user="hashicon"]').html( jdenticon.toSvg(ych.data.profile.pubk1, 32) );

  //show auth elements
  $( '[data-user="guest"]').addClass('hidden');
  $( '[data-user="auth"]').removeClass('hidden');
  
  //setBalance
  xybot.balance.init();

  //init elements
  xybot.page.init();
  Router.navigate('balance');

  
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

    /*
    ych.data_update("txouts", {coin,txouts:ych.data.profile.txouts});
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

  $( '#page-login-box-status' ).addClass('hidden');
  $( '#page-login-box-status .alert' ).removeClass('alert-danger').addClass('alert-success').text('');

  //reset/empty all user-data
  $( '[data-user="email"]').text('login@first.com');
  $( '[data-user="title"]').text('NoUser');
  $( '[data-user="hashicon"]').html( jdenticon.toSvg('', 32) );

  $('#table-balance tbody').text('');

  //hide auth elements
  $( '[data-user="guest"]').removeClass('hidden');
  $( '[data-user="auth"]').addClass('hidden');


  


  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;SameSite=Strict';
  ych.user = '';
  ych.data.profile = null;
  //ych.data_update("logout", {});
  window.ych_ws_init()
};

  
//ws
  ych.ws_calls["balances"] = function(wsdata) {
    console.log('==ych.ws_calls["balances"]==')
    let balances = wsdata.objects[0];
    balances.forEach(function(balance, idx) {
      ych.data.profile.balances[balance.coin] = balance;
      ych.gui.update_balance(balance);
    }); 
  };



ych.ws_calls["coininfo"] = function(wsdata) {
  console.log('==ych.ws_calls["coininfo"]==')
  let coininfo = wsdata.objects[0];
  ych.data.coininfos[coininfo.coin] = coininfo;
  //ych.gui.update_coininfo(coininfo);
  //page.update_coininfo_in_table(coininfo);
};

ych.ws_calls["txoutsupdate"] = function(wsdata) {
  console.log('==ych.ws_calls["txoutsupdate"]==')
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
}

ych.ws_calls["usersellsupdate"] = function(wsdata) {
  console.log('==ych.ws_calls["usersellsupdate"]==')
  let sellsupdate = wsdata.objects[0];
  let marketname = sellsupdate.coina+"-"+sellsupdate.coinb;
  ych.data.profile.sells[marketname] = sellsupdate.sellspage;
  /*if (marketname == ych.gui.current_market) {
    part.update_sellorders(sellsupdate.sellspage);
  }
  */
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
};

ych.ws_calls["usertradesupdate"] = function(wsdata) {
  let tradesupdate = wsdata.objects[0];
  let marketname = tradesupdate.coina+"-"+tradesupdate.coinb;
  ych.data.profile.trades[marketname] = tradesupdate.page;
  /*if (marketname == ych.gui.current_market) {
    page.update_usertrades(tradesupdate.page);
  }
  */
};

});
