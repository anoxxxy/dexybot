/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

$( function() {

console.log("Start1");

window.onconnecting();

// websockets to start
{
  window.ych_ws = new ReconnectingWebSocket("wss://testnet.nighttrader.exchange/ws");
}

window.ych_ws_init = function() {
  if (window.ych_ws.readyState != WebSocket.OPEN) {
    return;
  }
  var init = {
    "type" : "init",
    "jwt" : ych.get_cookie('jwt')
  };
  window.ych_ws.send(JSON.stringify(init));
  // restart reauth
  clearTimeout(ych.timer_reauth);
  ych.timer_reauth = setTimeout(window.ych_reauth, 5*60*1000);
};

window.ych_ws.onopen = function (event) {
  ych.gui.connecting2 = false;
  window.onconnecting();
  window.ych_ws_init();
};

window.ych_ws.onclose = function (event) {
  ych.gui.connecting2 = true;
  window.onconnecting();
};

window.ych_ws.onmessage = function (event) {
  if (event.type == "message") {
    let wsdata = {};
    let datas = event.data.split("\n");
    datas.forEach(function(data, idx) {
      try {
        wsdata = JSON.parse(data, jsonBNparse);
      }
      catch(err) {
        //just skip for now
        return; // continue
      }
      if (wsdata.type in ych.ws_calls) {
        ych.ws_calls[wsdata.type](wsdata);
        console.log("Received known ws event, message: ", wsdata);
      } else {
        //console.log("Received unknown ws event, message: ", wsdata);
      }

      if (wsdata.type == 'nnum') {
        ych.nnum = wsdata.objects[0];
      }

    });
  } else {
    console.log("Received ws event, not message: ",event);
  }
};


window.ych_gui_on_init = function(data) {
  let uid = '';
  let upub = '';
  let jwt = ych.get_cookie('jwt');
  //console.log("ych_gui_on_init, jwt:", jwt);
  let jwt_parts = jwt.split('.');
  if (jwt_parts.length == 3) {
    let b64 = jwt_parts[1].replace('-', '+').replace('_', '/');
    let jwt_info = JSON.parse(window.atob(b64));
    if ('uid' in jwt_info) {
      uid = jwt_info.uid;
      upub = jwt_info.pub;
    }
  }
  ych.data = data;
  ych.nnum = data.nnum;
  /*
  ych.gui.parts.account.balances.init_table();
  for (let coin in ych.data.coininfos) {
    ych.gui.update_coininfo(ych.data.coininfos[coin]);
  }
  ych.data_update("coininfos", data.coininfos);

  for (let path in ych.gui.pages) {
    let page = ych.gui.pages[path];
    if ("on_init" in page) {
      page.on_init(data);
    }
    if (path in ych.gui.parts) {
      for (let part_name in ych.gui.parts[path]) {
        let part = ych.gui.parts[path][part_name];
        if ("on_init" in part) {
          part.on_init(data);
        }
      }
    }
  }
  */


  // check login
  if (data.profile != null) {
    ych.user = data.profile.user;
    window.ych_uidx = data.profile.uidx;
    ych.pubkey1 = data.profile.pubk1;
    ych.pubkey2 = data.profile.pubk2;
    ych.pubkey3 = data.profile.pubk3;
    console.log('data.profile: ', data.profile);
    
    window.ych_gui_on_login(uid, data.profile);
  } else {
    window.ych_gui_on_logout()
  }

  window.ych_ws_init();
};


});
