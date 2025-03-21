$( function() {
//init the bot
const dexyBot = new tradingbot();
let buftextBot = '';


/*
//https://masteringjs.io/tutorials/fundamentals/this

  @ A Promise handler
  @ simplified implementation of `util.promisify()`

testar = xybot.promisify( myOwnFunc );
testar('3aa').then((data) => {
    console.log('then yeah', data);
  }).catch((error) => {
    console.log('then catch', error);
  });
*/

xybot.promisify_call =  function(fn) {
  console.log('===xybot.promisify_call===');
  return (...args) => {
    console.log('=return function() {=', fn);
    //console.log('arguments: ', arguments);
    //const args = Array.prototype.slice.call(arguments);
    //console.log('args: ', args);
    return new Promise((resolve, reject) => {

      //setTimeout(() => reject('hello'), 2000);

      //console.log('resolve: ', resolve);
      //console.log('reject: ', reject);
      console.log('return new Promise((resolve, reject) => {');
      //var res = fn.call(this, ...args);
      var res = fn.call(this, ...args);

      console.log('res: ', res);
      //console.log('res.responseJSON: ', res.responseJSON);
      if (res)
        resolve(res);

      reject(res);
          
    });
  }
}

  xybot.navigate = function () {
    console.log('=xybot.navigate=');

    try {
      if (Router.urlParams.page == "about") {
        $('[data-user="guest"]').fadeOut(0).addClass('hidden');
        $('[data-user="auth"]').fadeOut(0).addClass('hidden');
        $('[data-page="login"]').fadeOut(0).addClass('hidden');

        $('[data-user="all"]').fadeIn().removeClass('hidden'); 
        $('[data-page="' + Router.urlParams.page + '"]').fadeIn().removeClass('hidden');
        return;
      }
      
      if (ych.user == '') {
        //show page and activatee its menu
        $('[data-user="guest"]').fadeIn().removeClass('hidden');
        $('[data-page="login"]').fadeIn().removeClass('hidden');
        //throw ('Not Authenticated!');
        return;
      } 

      console.log('Router.urlParams.page: '+ Router.urlParams.page);


      //if any other page param is set other then supported pages, throw error
      /*
      if (!wally_fn.navigationPages.hasOwnProperty(Router.urlParams.page) )
        if (Router.urlParams.page != '')
          throw ('...')
      

      */
      $('[data-user="auth"]').fadeIn().removeClass('hidden');

      //remove all auth pages and show the navigated one
      $('[data-page]').fadeOut(0).addClass('hidden');
      $('[data-menu="card"] .list-group list-group-item').fadeOut(0).removeClass('active');

      //show page and activatee its menu
      $('[data-page="' + Router.urlParams.page + '"]').fadeIn().removeClass('hidden');
      
        //active menu
      $('[data-menu="card"] a.list-group-item').removeClass('active');
      $( '[data-menu="card"] a.list-group-item' ).each(function( index ) {
        if ('#'+Router.urlParams.page == $(this).attr('href')) {
          $(this).addClass('active');
        }
      });




    } catch (e) {
      //document.getElementById('error_404').classList.add("active");
      console.log('xybot.navigate ERROR: ', e);

      //Router.navigate('error-404');
      Router.navigate('');
    }



  }



  /*
  @ Wallet Router settings
  */
  
  xybot.initRouter = async function () {
    console.log('===initRouter===');




  /*<<< Start Router*/
    var show_about = function () {
        alert('This is the application "About".\n\nCopyright ©2020-2023 xybot.id');
    }

    var show_number = function (num) {
        alert('Number: ' + num);
        console.log('num: ', num)
    }

    var setVerifyScript = function () {
        document.getElementById('verifyScript').value = Router.urlParams.decode;
    }
    var loginWalletInteraction = function () {

    }


    
    Router
        .add(/^$/, function(data){
          console.log('**first-empty string page**');
          Router.urlParams.page = 'start';
        })
        .add(/start(.*)/, function(data){
          console.log('**start page**');
          console.log('data: ', data);
        })
        .add(/balance/, function(data){
          console.log('**balance page**');
          console.log('data: ', data);
        })
        .add(/orders$/, function(data){
        //.add(/(order\/?[\w-/].*)/, function(data){
          console.log('**order page**');
          console.log('data: ', data);
        })
        .add(/bot/, function(data){
          console.log('**bot page**');
          console.log('data: ', data);
        })
        
        .add(/error-404/, function(data){
          console.log('**error-404 page**');
          console.log('data: ', data);
        })
        .add(/login/, function(data){
          console.log('**login page**');
          //console.log('data: ', data);
        })
        .add(/logout/, function(data){
          console.log('**logout page**');
          //console.log('data: ', data);
        })
        .add(/settings(.*)/, function(data){})
        .add(/about(.*)/, function(data){
          console.log('**about page**');
        })
        .add(/auth/, function(data){
          console.log('**auth page**');
        })
        

        
        /*.add(/(number)=([0-9]+)&(n)=([0-9]+)/i, function(params) {
            console.log('number=page, data:', params);
            
        })
        */
        //.add(/number=([0-9]+)/i, show_number)

        //default page (when routes above isn't matched)
        .add(/(.*)/, function(data) {
          console.log('**last-empty page**');
          console.log('===EMPTY_PAGE_HASH===');
          console.log('__REDIRECT_TO_STARTPAGE_PERHAPS__');


          Router.navigate('');
          
        })
        .beforeAll( function() {
            console.log('==Run Before All Routes!')

            //if not page is set, default to start
            if (Router.urlParams.page == '')
              Router.urlParams.page = 'start';

            xybot.navigate();

        })
        .afterAll( function() {
            console.log('==Run After All Routes!')
        })
        .apply()
        .start();

    //Router.navigate();

    /*<<< End Router*/

    };



  //https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
  
  //use websocket to connect to NightTrader exchange
  const exchangeUrl = 'testnet.nighttrader.exchange';
  //const xy_webSocket = new WebSocket('wss://'+exchangeUrl+'/ws');
  //console.log('xy_webSocket: ', xy_webSocket);

  //login url, already declared in ./assets/js/nighttrader/exchange.js
  //ych_login_path = '/u/init';

  





xybot.init = function() {

  /*
  var jqxhr = $.getJSON( 'https://'+exchangeUrl +window.ych_login_path, 
  function(data) {
    console.log( "getJSON - success" );

     //console.log('datastr: ', datastr);
      //const data = JSON.parse(datastr, jsonBNparse);
      if (data.ok) {
        console.log(data);
        console.log('ych.data merge with exchange data: ', data);
        ych.data = data;
        ych.nnum = data.nnum;

        return;
      } else {
        $( '#page-login-box-status' ).show();
        $( '#page-login-box-status' ).text(data.error);
      }


  })
  .done(function(data) {
    console.log( "getJSON - second success" );
    $( '#page-login-button-login' ).prop("disabled", false); 
  })
  .fail(function(data) {
    console.log( "getJSON - error" );

    console.log('status: ', status);
    console.log('error: ', error);

    $( '#page-login-box-status' ).show();
    $( '#page-login-box-status' ).text(status+": "+error);
   $( '#page-login-button-login' ).prop("disabled", false); 

  })
  .always(function(data) {
    console.log( "getJSON - complete" );
  });
  */



/*
  fetch('https://'+exchangeUrl +window.ych_login_path, {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    Authorization: 'Bearer ' + (document.cookie).replace(/jwt=/g,'') )

  },
})
  .then(function(data) {
    console.log( "getJSON - success" );

     //console.log('datastr: ', datastr);
      //const data = JSON.parse(datastr, jsonBNparse);
      if (data.ok) {
        console.log(data);
        console.log('ych.data merge with exchange data: ', data);
        ych.data = data;
        ych.nnum = data.nnum;

        return;
      } else {
        $( '#page-login-box-status' ).show();
        $( '#page-login-box-status' ).text(data.error);
      }


  })
  .then((json) => {
    console.log('Gotcha');
  }).catch((err) => {
    console.log(err);
});
*/

}
xybot.login_call = function() {
  $( '#page-login-box-status' ).addClass('hidden');
  $( '#page-login-box-status .alert' ).text("");
  $( '#page-login-button-login' ).prop("disabled", true);
  let user = ych.gui.cleanup_email( $( '#page-login-text-user' ).val() );
  let pass = $( '#page-login-text-pass' ).val();
  let code = $( '#page-login-text-totp' ).val();
  let uprvkey = "";
  let upubkey = "";
  [uprvkey, upubkey] = ych.user_keys_v1(user, pass)
  // sig with our key
  let sig = "";
  {
    let buffer = ych.str2bytes(user+upubkey+code+ych.nnum);
    let hash1 = Crypto.SHA256(buffer, {asBytes: true});
    let hash2 = Crypto.SHA256(hash1, {asBytes: true});
    ych.init_coinjs();
    let tx = coinjs.transaction();
    let wif = coinjs.privkey2wif(uprvkey);
    sig = tx.transactionSig(0, wif, 1, hash2);
  }

  console.log('ych.nnum: ' + ych.nnum);
/*
  $.getJSON( 'https://'+exchangeUrl +window.ych_login_path, JSON.stringify({
      user: user,
      upub: upubkey,
      usig: sig,
      code: code
    })).done(function( data ) {
      console.log('getjson data: ', data);
      
    })
    */;

console.log('body: ', JSON.stringify({
      user: user,
      upub: upubkey,
      usig: sig,
      code: code
    }));




  $.ajax({
    method: "PUT",
    url: 'https://'+exchangeUrl +window.ych_login_path,
    data: JSON.stringify({
      user: user,
      upub: upubkey,
      usig: sig,
      code: code
    }),
    //crossDomain: true,
    contentType: "application/json",
    dataType: "text",
    //crossDomain: true,

    //dataType: 'jsonp',
    //jsonp: '$callback',
    //jsonpCallback: 'processJSONPResponse', // add this property
    success: function(datastr) {

      //console.log('datastr: ', datastr);
      const data = JSON.parse(datastr, jsonBNparse);

      if (data.ok) {
        console.log(data);
        console.log('ych.data merge with exchange data: ', data);
        $.extend(ych.data, data);
        

        if (data.access == "unconfirmed") {
          
          $( '#page-login-box-status' ).removeClass('hidden');
          $( '#page-login-box-status .alert' ).removeClass('alert-success').addClass('alert-danger').html('Account is not confirmed!');
          return;
        }

        //document.cookie = 'jwt='+data.access;
        document.cookie = 'jwt='+data.access+';SameSite=Strict';
        

        let uid = "";
        let jwt = ych.get_cookie('jwt');
        let jwt_parts = jwt.split('.');
        if (jwt_parts.length == 3) {
          let b64 = jwt_parts[1].replace('-', '+').replace('_', '/');
          let jwt_info = JSON.parse(window.atob(b64));
          if ('uid' in jwt_info) {
            uid = jwt_info.uid;
          }
        }
        if (uid=="") {
          $( '#page-login-box-status' ).removeClass('hidden');
          $( '#page-login-box-status .alert' ).removeClass('alert-success').addClass('alert-danger').html('Login token not recognized');
          console.log(jwt);
          return;
        }
        

        // keys are ready
        ych.user = user;
        ych.pubkey1 = upubkey;
        ych.prvkey1 = uprvkey;
        
        window.ych_gui_on_init(data);

        console.log('login_call: logged in');
        $( '#page-login-box-status' ).removeClass('hidden');
        $( '#page-login-box-status .alert' ).removeClass('alert-danger').addClass('alert-success').html('Connected to NightTrader! <br> user: '+ych.user);
        return;
      } else {
        $( '#page-login-box-status' ).removeClass('hidden');
        $( '#page-login-box-status .alert' ).removeClass('alert-success').addClass('alert-danger').html(data.error);
      }
    },
    error: function(xhr, status, error) {

      console.log('status: ', status);
      console.log('error: ', error);

      $( '#page-login-box-status' ).removeClass('hidden');
      $( '#page-login-box-status .alert' ).removeClass('alert-success').addClass('alert-danger').html(status+": "+error);
     
     
    },
     complete: function(jqXHR, textStatus){
             console.log(JSON.stringify(jqXHR));
             console.log('textStatus: ', textStatus);
             $( '#page-login-button-login' ).prop("disabled", false); 
        }
  });
  


}


//
//init Router
xybot.initRouter();


//Login Button
$( '#page-login-button-login, .page-login-button-login' ).on('click', function (e) {
  xybot.login_call();
});

//Logout Button
$( '#page-account-profile-button-logout, .page-account-profile-button-logout' ).click( function(e) {
  event.preventDefault();
  window.ych_gui_on_logout();
  
});


//Theme Handler
var themeStorageKey = "tablerTheme";
var defaultTheme = "light";
$( '[data-set-theme]' ).on('click', function (e) {


  var selectedTheme = $(this).attr('data-set-theme');



  console.log('selectedTheme: '+ selectedTheme);

  if (selectedTheme == "dark") {
    document.body.setAttribute("data-bs-theme", 'dark');
    localStorage.setItem(themeStorageKey, 'dark');
  } else {
    localStorage.removeItem(themeStorageKey);
    document.body.removeAttribute("data-bs-theme");
  }

});


  var storedTheme = localStorage.getItem(themeStorageKey);
  console.log('storedTheme: ', storedTheme)


  if (storedTheme === 'dark') {
    document.body.setAttribute("data-bs-theme", storedTheme);
    $( '[data-set-theme]' ).attr(themeStorageKey, 'light')
  } else {
    document.body.removeAttribute("data-bs-theme");
    $( '[data-set-theme]' ).attr(themeStorageKey, 'dark')
  }


//Sort Tables
//https://stackoverflow.com/a/3160718
//https://github.com/padolsey-archive/jquery.fn/blob/master/sortElements/jquery.sortElements.js
    var table = $('#table-balance');
    
    $('[data-sort]')
    //$('[data-sort="sort-name"], [data-sort="sort-type"]')
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            th.click(function(){
                
                table.find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                    console.log('sort a: ', a);
                    console.log('sort b: ', b);

                    return $(a).attr('data-sort') > $(b).attr('data-sort') ?
                    //return $.text([a]) > $.text([b]) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                
                inverse = !inverse;
                    
            });
                
        });

//Balance
  xybot.balance.init = async function () {
    console.log('===xybot.balance.init===')
  let usdtotal = 0.;
    for (let coin in ych.data.profile.balances) {
      let usdrate = 0.;
      if (coin in ych.data.coininfos) {
        let coininfo = ych.data.coininfos[coin];
        usdrate = coininfo.ext.priceext;
        //console.log('coin: ' + coin, ', coininfo: ',coininfo);

        var usd = Number(ych.data.profile.balances[coin].sum)/1.e8*usdrate;
        var sum = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].sum);
        var free = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].free);
        var inorders = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].orders);

        var coinToAdd = `<tr data-balance="${coin}">
                        <td data-sort="${coin}">${coin}</td>
                        <td data-sort="${parseFloat(ych.data.profile.balances[coin].sum).toFixed(8)}" data-balance="sum">${sum}</td>
                        <td data-sort="${parseFloat(usd).toFixed(8)}" data-balance="usd">${ych.gui.format_usd_or_empty(usd)}</td>
                        <td data-sort="${parseFloat(ych.data.profile.balances[coin].free).toFixed(8)}" data-balance="free">${free}</td>
                        <td data-sort="${parseFloat(ych.data.profile.balances[coin].orders).toFixed(8)}" data-balance="orders">${inorders}</td>
                      </tr>`;
        $('#table-balance tbody').append(coinToAdd);
        usdtotal += usd;
/*
                        <td data-sort="${parseFloat(ych.data.profile.balances[coin].sum).toFixed(8)}" data-balance="sum">${sum}</td>
                        <td data-sort="${parseFloat(usd).toFixed(8)}" data-balance="usd">${ych.gui.format_usd_or_empty(usd)}</td>
                        <td data-sort="${parseFloat(ych.data.profile.balances[coin].free).toFixed(8)}" data-balance="free">${free}</td>
                        <td data-sort="${parseFloat(ych.data.profile.balances[coin].orders).toFixed(8)}" data-balance="orders">${inorders}</td>
*/

      }
    }

    $('#table-balance-total').html(ych.gui.format_usd_or_empty(usdtotal)).fadeOut(50).fadeIn(50);


  }

  /*
  @ Update Orderbook of selected/current TradingPair
  */
xybot.part.orderbook.update = function(orderType = 'both') {
      
      marketPair = ych.gui.current_market;

      //update buy side of orderbook
      if (orderType == 'both' || orderType == 'buy') {
        let xyOrderBookBuy = '';
        var buyOrders = '';
        var buyOrdersTotal = 0;
        var tmp = ych.data.buys[marketPair];
        
        if (tmp === undefined)
          return ;

        var tmpLength = tmp.length;
        let price = '', amounta = '';
        for (i=0; i < tmpLength; i++) {
          buyOrdersTotal += (tmp[i].amounta / 1.e8);
          price = (tmp[i].price / 1.e8).toFixed(8);
          //amount = (tmp[i].amounta / 1.e8).toFixed(8);
          buyOrders += `<tr><td>${price}</td>
                          <td class="text-muted yright">${(tmp[i].amounta / 1.e8).toFixed(8)}</td>
                          <td class="text-muted yright">${buyOrdersTotal.toFixed(8)}</td></tr>`;
          xyOrderBookBuy += `<div class="entryContainer">
                              <div class="marketSizeBar" style="width: 0%;"></div>
                              <div class="leftLabelCol">
                                <span class="entryText">${(tmp[i].amounta / 1.e8).toFixed(4)}</span>
                              </div>
                              <div class="centerLabelCol">
                                <span class="entryBuyText text-lime">${price}</span>
                              </div>
                              <div class="rightLabelCol">
                                <span class="entryText">${buyOrdersTotal.toFixed(4)}</span>
                              </div>
                            </div>`;

        }
        $('[data-market="buy_orders_total"]').text(buyOrdersTotal.toFixed(8));
        $('[data-orders="buy"] table tbody').html(buyOrders);
        $('#xyOrderBookTable .entriesContainer[data-orders="buy"]').html(xyOrderBookBuy);
        //set tr background color relative to total in percent
        var leftPercent;
        $('[data-orders="buy"] table tbody tr').each(function(i, tr) {
          leftPercent = Math.ceil(parseFloat((tmp[i].amounta / 1.e8) / buyOrdersTotal * 100));
          $(this).css('background', 'linear-gradient(to right, rgba(0,170,64,0.25) '+leftPercent+'%, transparent 0%)');
        });

        //xyOrderBook
        var buyTotal = 0;
        console.log('buyOrdersTotal: ', buyOrdersTotal);
        $('#xyOrderBookTable .entriesContainer[data-orders="buy"] .entryContainer .marketSizeBar').each(function(i, el) {
          reverseI = tmpLength - i-1;
          
          buyTotal += (tmp[i].amounta / 1.e8);

          leftPercent = Math.ceil(parseFloat(buyTotal / buyOrdersTotal * 100));
          $(this).css('width', leftPercent+'%');
        });

        //get and set balance in orders page (from balance page)
        $('[data-balance="coina"]').html( $('[data-balance="'+selected_market_pair[0]+'"]  [data-balance="free"]').html());
    }

    //update sell side of orderbook
      if (orderType == 'both' || orderType == 'sell') {
        var sellOrders = '';
        let xyOrderBookSell = '';
        var sellOrdersTotal = 0;
        var rSellOrdersTotal = 0;
        

        var tmp = ych.data.sells[marketPair];
        if (tmp === undefined)
          return ;
        var tmpLength = tmp.length;
        var reverseI = tmpLength;
        for (i=0; i < tmp.length; i++) {
          reverseI = tmpLength - i-1;
          sellOrdersTotal += (tmp[i].amounta / 1.e8);
          rSellOrdersTotal -= (tmp[reverseI].amounta / 1.e8);


          xyOrderBookSell += `<div class="entryContainer">
                              <div class="marketSizeBar marketSizeBarSell" style="width: 0%;"></div>
                              <div class="leftLabelCol">
                                <span class="entryText">${(tmp[reverseI].amounta / 1.e8).toFixed(4)}</span>
                              </div>
                              <div class="centerLabelCol">
                                <span class="entrySellText text-red" data-book-row-price="${tmp[reverseI].price}" data-book-row-amounta="${tmp[reverseI].amounta}" data-book-row-amountb="${tmp[reverseI].amountb}" >${(tmp[reverseI].price / 1.e8).toFixed(8)}</span>
                              </div>
                              <div class="rightLabelCol">
                                <span class="entryText">${rSellOrdersTotal.toFixed(8)}</span>
                              </div>
                            </div>`;

        }
        $('[data-market="sell_orders_total"]').text(sellOrdersTotal.toFixed(8));

        //set tr background color relative to total in percent
        var leftPercent;
        $('[data-orders="sell"] table  tbody  tr').each(function(i, tr) {
          leftPercent = Math.ceil(parseFloat((tmp[i].amounta / 1.e8) / sellOrdersTotal * 100));
          $(this).css('background', 'linear-gradient(to right, rgba(234,13,63,0.25) '+leftPercent+'%, transparent 0%)');
        });


var sellEntryContainer = $('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer');
var sellEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="sell"]');
if ((sellEntryContainer.text()).trim() == "") {
  $('#xyOrderBookTable .entriesContainer[data-orders="sell"]').html(xyOrderBookSell);  
        console.log('xyOrderBookTable sellOrdersData is empty, init!')
      }else {
        
        


        // 1. Retrieve updated order book data from the server
          var updatedSellOrdersData = tmp; // Fetch or receive the updated data from the server

          console.log('sellOrdersData: ', updatedSellOrdersData);

          // 2. Loop through the server data and compare it to the existing client-side data
          updatedSellOrdersData.forEach(function(order) {
            // Check if the order exists in the client-side order book
            var existingOrder = sellEntryContainer.find('.entrySellText[data-book-row-price="' + order.price + '"]');
            
            if (existingOrder.length > 0) {
              // Order exists, update or modify it if necessary
              // You can update the existing order's properties here
              var row = existingOrder.closest('.entryContainer');
              var rowAmounta = parseFloat(row.find('.entrySellText').attr('data-book-row-amounta'));

              //update amounta,amountb if changed
              if (rowAmounta != order.amounta) {
                row.find('.entrySellText').attr('data-book-row-amounta', order.amounta);
                row.find('.entrySellText').attr('data-book-row-amountb', order.amountb);
                console.log('sellOrdersData - updated price amounta: ', order.price)
                row.find('.leftLabelCol .entryText').html( (order.amounta/1e8).toFixed(4));

                
                // Calculate and update the market size bar width
                var sellOrdersTotal = updatedSellOrdersData.reduce(function(sum, order) {
                  return sum + order.amounta;
                }, 0);
                var leftPercent = Math.ceil((order.amounta / sellOrdersTotal) * 100);
                row.find('.marketSizeBar').css('width', leftPercent + '%');
              }
            } else {
              // Order doesn't exist, it's a new entry, create and append it to the client-side DOM order book

                var entryContainers = sellEntryContainerUpdated.find('.entryContainer');
                var insertIndex = entryContainers.toArray().findIndex(function(element) {
                  var existingPrice = parseFloat($(element).find('.entrySellText').attr('data-book-row-price'));
                  return order.price > existingPrice;
                });

                // Create a new entryContainer element with the order data
                var newEntryContainer = '<div class="entryContainer">' +
                  '<div class="marketSizeBar marketSizeBarSell" style="width: ' + Math.ceil((order.amounta / sellOrdersTotal) * 100) + '%;"></div>' +
                  '<div class="leftLabelCol"><span class="entryText">' + (order.amounta / 1e8).toFixed(4) + '</span></div>' +
                  '<div class="centerLabelCol"><span class="entrySellText text-red" data-book-row-price="' + order.price + '" data-book-row-amounta="' + order.amounta + '" data-book-row-amountb="' + order.amountb + '">' + (order.price / 1e8).toFixed(8) + '</span></div>' +
                  '<div class="rightLabelCol"><span class="entryText">' + (order.amountb / 1e8).toFixed(4) + '</span></div>' +
                '</div>';

                if (insertIndex !== -1) {
                  $(entryContainers[insertIndex]).before(newEntryContainer);
                } else {
                  sellEntryContainerUpdated.append(newEntryContainer);
                }

            }
          });

          // 3. Check for any entries in the client-side order book that are not present in the server data
          sellEntryContainerUpdated.find('.entryContainer').each(function() {
            var orderPrice = parseFloat($(this).find('.entrySellText').attr('data-book-row-price'));
            
            // Check if the order exists in the server data
            var isOrderPresentInServerData = updatedSellOrdersData.some(function(order) {
              return order.price === orderPrice;
            });
            
              console.log('sellOrdersData update isOrderPresentInServerData - price: ', isOrderPresentInServerData, $(this));
              

            // Order doesn't exist in the server data, remove it from the client-side order book
            if (!isOrderPresentInServerData)
              $(this).remove();
            
          });



  

      }
      


        //xyOrderBook
        var sellTotal = sellOrdersTotal;
        $('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer').each(function(i, el) {
          reverseI = tmpLength - i-1;
          var entryContainerLength = $('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer').length;
          
          
          leftPercent = Math.ceil(parseFloat(sellTotal / sellOrdersTotal * 100));
          $(this).find('.marketSizeBar').css('width', leftPercent+'%');

          $(this).find('.rightLabelCol .entryText').html(sellTotal.toFixed(4));
          //console.log('sellTotal: ', sellTotal);
          if(tmp[reverseI])
            sellTotal -= (tmp[reverseI].amounta / 1.e8);
        });

        //get and set balance in orders page (from balance page)
        $('[data-balance="coinb"]').html( $('[data-balance="'+selected_market_pair[1]+'"] [data-balance="free"]').html());
    }


      //Calculate and set spread between bid & ask
      if (ych.data.buys[marketPair][0] && ych.data.sells[marketPair][0]) {
        var spread = (1 - (ych.data.buys[marketPair][0].price / ych.data.sells[marketPair][0].price)).toFixed(2);
        console.log('spread: ' + spread);
        if(spread >0)
          $('[data-market="spread"]').text(spread + '%');
      }

      //Set Market Volume 
      let volusd = ych.data.markets[ych.gui.current_market].volusd;
      if (ych.data.markets[ych.gui.current_market].volusd ) {
        $('[data-market="volumeusd"]').text('≈ $' +volusd.toFixed(0) );
      }

      

      //TRADINGBOT DOM INJECTIONS
      const percentageBalanceToUse = 0.05; //5% of balance to use for tradingbot
      const buyBalance = (Number(ych.data.profile.balances[selected_market_pair[1]].free) / 1e8 * percentageBalanceToUse).toFixed(8);
      const sellBalance = ( Number(ych.data.profile.balances[selected_market_pair[0]].free) / 1e8 * percentageBalanceToUse).toFixed(8);
      $('#tradingbot [data-bot="buyBalance"]').val( buyBalance );
      $('#tradingbot [data-bot="sellBalance"]').val( sellBalance );
}

xybot.balance.update_total = function() {
  console.log('===xybot.balance_update_total===');
  let usdtotal = 0.;
  for (let coin in ych.data.profile.balances) {
    let usdrate = 0.;
    if (coin in ych.data.coininfos) {
      let coininfo = ych.data.coininfos[coin];
      usdrate = coininfo.ext.priceext;
    }
    let usd = (Number(ych.data.profile.balances[coin].sum)/1.e8*usdrate);
    usdtotal += usd;
  }
  $( '#table-balance-total').html("<b>"+ych.gui.format_usd_or_empty(usdtotal)+"</b>").fadeOut(50).fadeIn(50);
};

  xybot.balance.update = function (balance) {
    console.log('===xybot.balance_update_total===');
    console.log('balance: ', balance);


    let usdrate = 0.;
    let coininfo = ych.data.coininfos[balance.coin];
    usdrate = coininfo.ext.priceext;

    var usd = Number(balance.sum)/1.e8*usdrate;
    var sum = ych.gui.format_amount_or_empty(balance.sum);
    var free = ych.gui.format_amount_or_empty(balance.free);
    var inorders = ych.gui.format_amount_or_empty(balance.orders);

    var coinElement = $('#table-balance [data-balance="'+balance.coin+'"]').fadeOut(50).fadeIn(50);
    coinElement.find('[data-balance="sum"]').html(sum);
    coinElement.find('[data-balance="usd"]').html(ych.gui.format_usd_or_empty(usd));
    coinElement.find('[data-balance="free"]').html(free);
    coinElement.find('[data-balance="orders"]').html(inorders);

    xybot.balance.update_total();
  }

  //initiate auth pages elements and their values
  xybot.page.init = function() {

    //Page: Orders
    //**Select Market data
    var selectMarketEl = $('#select-market');
    var all_coins = [];
    var base_markets = {};

    for (let coin in ych.data.markets) {
      all_coins.push(ych.data.markets[coin].coinb);

        //base markets exists, add the coin to its list
      if (base_markets.hasOwnProperty(ych.data.markets[coin].coinb)) {
        base_markets[ych.data.markets[coin].coinb].push(ych.data.markets[coin].name);
      } else {
        //base market doesnt exist, add it as a base and the the market pair as well
        base_markets[ych.data.markets[coin].coinb] = [];
        base_markets[ych.data.markets[coin].coinb].push(ych.data.markets[coin].name);
      }
    }

    //sort object by key
    base_markets = Object.keys(base_markets)
      .sort()
      .reduce((accumulator, key) => {
        accumulator[key] = base_markets[key];

        return accumulator;
      }, {});

    // markets and pair to the dropdown menu!
    var market_add = '';
    var market_maintenance = '';

    for (var [market, pairs] of Object.entries(base_markets)) {

      market_add = '<optgroup label="' + market + ' Markets">';

      for (i=0; i < pairs.length; i++) {
        if (ych.data.markets[pairs[i]].service == true) //maintenance mode
          market_maintenance = ' (maintenance)';
        market_add += '<option value="' + pairs[i] + '">' + pairs[i]  + market_maintenance + '</option>';
        market_maintenance = '';
      }
      market_add += '</optgroup >';
      selectMarketEl.append(market_add);
      market_add = '';
    }
    
    //$('data-market="coina"').text(selected_market_pair[0]);
    //console.log('base_markets: ', base_markets);

    ych.gui.current_market = selectMarketEl[0].value;
    selected_market_pair = (selectMarketEl[0].value).split('-');

    //console.log('selected_market_pair[0]: ' + selected_market_pair[0])
    //console.log('selected_market_pair[1]: ' + selected_market_pair[1])

    //buy and sell side data
    $('[data-market="coina"]').text(selected_market_pair[0]);
    $('[data-market="coinb"]').text(selected_market_pair[1]);
    

    var usdrate = ych.data.coininfos[selected_market_pair[0]].ext.priceext;
    $('[data-market="price"]').val(parseFloat(usdrate).toFixed(8));


    
    //Buy/Sell Orders Table
    selectMarketEl.on('change', function(e) {
    console.log('===selectMarketEl Change===');

    selected_market_pair = (selectMarketEl[0].value).split('-');
    //buy and sell side data
    $('[data-market="coina"]').text(selected_market_pair[0]);
    $('[data-market="coinb"]').text(selected_market_pair[1]);

      var marketPair = this.options[this.selectedIndex].value;
      console.log('Market Pair: '+ marketPair);
      ych.gui.current_market = marketPair;

      xybot.part.orderbook.update();



    });

    selectMarketEl.trigger('change');

  
  }

  //PART market-buy
  xybot.part.buy_call = function(price, amounta, botmarket="") {

  //const coina = ych.data.markets[ych.gui.current_market].coina;
  //const coinb = ych.data.markets[ych.gui.current_market].coinb;
  const coina = botmarket ? ych.data.markets[botmarket].coina : ych.data.markets[ych.gui.current_market].coina;
  const coinb = botmarket ? ych.data.markets[botmarket].coinb : ych.data.markets[ych.gui.current_market].coinb;

  const change_addr = ych.address[coinb];
  if (change_addr == "") {
    //page.show_error("buy: not available the change address");
    console.log("buy: not available the change address");
    return;
  }

  const coininfob = ych.data.coininfos[coinb];
  const feeb_mul = coininfob.fee.buyfee;
  const coinb_min = coininfob.fee.minamount;
  //const price = ych.gui.get_input_amount('makebuy-price-text');
  //const amounta = ych.gui.get_input_amount('makebuy-quantity-text');

  price = ych.gui.get_bigIntValue(price);
  amounta = ych.gui.get_bigIntValue(amounta);

  const amountb = amounta * price / BigInt(1e8);
  const feeb = BigInt(Math.floor(0.5 + Number(amountb) * feeb_mul));
  const totalb = amountb + feeb;

  const balance = ych.data.profile.balances[coinb];

  let totalb_via_debit = 0n;
  let totalb_via_txouts = totalb;

  if (balance.debit >0) {
    let can_use_from_debit = balance.debit - balance.ordersindebit;
    if (can_use_from_debit <0) {
      //page.show_error("buy: error debt usage is negative");
      console.log("buy: error debt usage is negative");
      return;
    }
    if (can_use_from_debit >= totalb) {
      totalb_via_debit = totalb;
      totalb_via_txouts = 0;
    } else if (can_use_from_debit > 0) {
      totalb_via_debit = can_use_from_debit;
      totalb_via_txouts = totalb - can_use_from_debit;
    }
  }

  let signed_txinps = [];

  if (totalb_via_txouts > 0) {

    // client side to use txouts and make signatures
    let txouts = JSON.parse(
      JSON.stringify(ych.data.profile.txouts[coinb], (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value
      ),
      jsonBNparse
    ); // deep copy

    ych.init_coinjs(coinb);

    // expanded to include past=800,usable=400,futures=350(?)
    const txouts_evm = txouts.filter(txout => (
      txout.state == 350 || txout.state == 400 || txout.state == 800)
    );
    // only usable=400
    // sort input from min-to-max available amount, ready for select
    txouts = txouts.filter(txout => (txout.state == 400));
    txouts.sort(function(a, b) { return Number(a.free - b.free); });
    console.log("input txouts:", txouts);

    if (coininfob.type == "txout_t1") {

      const [txouts_selected,
        txouts_selected_freeb,
        txouts_selected_ordersb,
        txouts_selected_filledb] = ych.txout_select_inps(txouts, totalb_via_txouts);

      if (txouts_selected_freeb <0 || txouts_selected_freeb < totalb_via_txouts) {
        //page.show_error("buy: not enough available coins in txouts to trade "+totalb_via_txouts);
        console.log("buy: not enough available coins in txouts to trade "+totalb_via_txouts);
        return;
      }

      console.log("selected txouts:",
        txouts_selected,
        txouts_selected_freeb,
        txouts_selected_ordersb,
        txouts_selected_filledb);

      for (let i=0; i<txouts_selected.length; i++) {
        const txout = txouts_selected[i];
        const [signed_txinp,err] = ych.sign_txout(txout);
        if (err != null) {
          //page.show_error(err);
          console.log('buy error err: ', err);
          return;
        }
        signed_txinps.push(signed_txinp);
      }
    }

    if (coininfob.type == "evm_t1" || coininfob.type == "erc20_t1") {

      const sat = 10000000000n;
      let amount = totalb_via_txouts;

      for (let i=0; i<txouts_evm.length; i++) {

        const txout = txouts_evm[i];
        const state1 = "0x"+txout.txid;
        const txout_sign = txout.orders +txout.filled +amount;
        const txout_sigv = txout.amount -txout_sign;
        const txout_sign_wei = txout_sign *sat;

        const sig = ych.evm_sign1(
          ych.address[coinb],
          state1,
          txout_sign_wei,
          ych.evm_zeroaddr,
          0/*tw*/);
        const sigs = [sig];

        let signed_txinp = {};
        signed_txinp.txid = txout.txid;
        signed_txinp.nout = txout.nout;
        signed_txinp.amnt = txout.amount;
        signed_txinp.fill = txout.filled;
        signed_txinp.usea = amount;
        signed_txinp.sigf = "";
        signed_txinp.sigv = txout_sigv;
        signed_txinp.sigs = sigs;
        signed_txinps.push(signed_txinp);
      }
    }
  }

  // usig
  let buftext_usetxouts = "";
  signed_txinps.forEach(function(txout, idx) {
    buftext_usetxouts += txout.txid+":"+txout.nout;
    buftext_usetxouts += txout.fill.toString();
    buftext_usetxouts += txout.usea.toString();
  });
  ych.init_coinjs();
  let buftext =
    coina+
    coinb+
    price.toString()+
    amounta.toString()+
    amountb.toString()+
    "0"+
    feeb.toString()+
    totalb_via_debit.toString()+
    buftext_usetxouts+
    ych.pubkey1+
    ych.nnum;

  //console.log("buftext:", buftext);

  let buffer = ych.str2bytes(buftext);
  let hash1 = Crypto.SHA256(buffer, {asBytes: true});
  let hash2 = Crypto.SHA256(hash1, {asBytes: true});
  let tx = coinjs.transaction();
  let wif = coinjs.privkey2wif(ych.prvkey1);
  let sig = tx.transactionSig(0, wif, 1, hash2);

  // server side
  return $.ajax({
    type: "PUT",
    url: 'https://'+exchangeUrl +window.ych_buy_path,
    data: JSON.stringify(
        {
          coina: coina,
          coinb: coinb,
          price: price,
          amounta: amounta,
          amountb: amountb,
          feea: 0n,
          feeb: feeb,
          usedebit: totalb_via_debit,
          usetxouts: signed_txinps,
          usig: sig
        }, (key, value) =>
          typeof value === "bigint" ? value.toString() + "n" : value),
    dataType: 'json',
    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 
    success: function(data) {
      console.log(data);
      if (data.ok) {
        //page.clear_error();
        //page.show_error('buy: success: trade success');
        console.log('buy success: trade success - ', data.index);
      } else {
        //page.show_error("buy failed: "+data.error);
        console.log("buy failed: "+data.error);
        if (dexyBot.isRunning()) {
          //$('#data_bot_log tbody tr:first-child td[data-label="Message"] div').append(`<br>buftext: ${buftext}`);
          buftextBot = buftext;
        }
      }
    },
    error: function(xhr, status, error) {
      //page.show_error("buy error: "+status+": "+error);
      console.log("buy error: "+status+": "+error);
    }
  }).done( function(json) {
      console.log('buy done json:', json);
      return json;
  }).then( function(json) {
      console.log('buy then json:', json);
      return json;
  });
  
};


$( '#makebuy-button' ).click( function( event ) {
  event.preventDefault();
  //ych.gui.call_with_pass1().then((res) => {
    //if (!res.ok) {
    //  page.show_error(res.msg);
    //  return;
    //}
    /*const price = ych.gui.get_input_amount('makebuy-price-text');
    const amounta = ych.gui.get_input_amount('makebuy-quantity-text');
    */
    const price = $('#makebuy-price-text').val();
    const amount = $('#makebuy-quantity-text').val()
    xybot.part.buy_call(price , amount);
  //});
});


//PART market-sell

xybot.part.sell_call = function(price, amounta, botmarket="") {

  //const coina = ych.data.markets[ych.gui.current_market].coina;
  //const coinb = ych.data.markets[ych.gui.current_market].coinb;
  const coina = botmarket ? ych.data.markets[botmarket].coina : ych.data.markets[ych.gui.current_market].coina;
  const coinb = botmarket ? ych.data.markets[botmarket].coinb : ych.data.markets[ych.gui.current_market].coinb;

  const change_addr = ych.address[coina];
  if (change_addr == "") {
    //page.show_error("sell: not available the change address");
    console.log("sell: not available the change address");
    return;
  }

  const coininfoa = ych.data.coininfos[coina];
  const feea_mul = coininfoa.fee.sellfee;
  const coina_min = coininfoa.fee.minamount;
  //const price = ych.gui.get_input_amount('makesell-price-text');
  //const amounta = ych.gui.get_input_amount('makesell-quantity-text');

  price = ych.gui.get_bigIntValue(price);
  amounta = ych.gui.get_bigIntValue(amounta);
  const amountb = amounta * price / BigInt(1e8);
  const feea = BigInt(Math.floor(0.5 + Number(amounta) * feea_mul));
  const totala = amounta + feea;


  const balance = ych.data.profile.balances[coina];

  let totala_via_debit = 0n;
  let totala_via_txouts = totala;

  if (balance.debit >0) {
    let can_use_from_debit = balance.debit - balance.ordersindebit;
    if (can_use_from_debit <0) {
      //page.show_error("sell: error debt usage is negative");
      console.log("sell: error debt usage is negative");
      return;
    }
    if (can_use_from_debit >= totala) {
      totala_via_debit = totala;
      totala_via_txouts = 0n;
    } else if (can_use_from_debit > 0) {
      totala_via_debit = can_use_from_debit;
      totala_via_txouts = totala - can_use_from_debit;
    }
  }

  let signed_txinps = [];

  if (totala_via_txouts > 0) {

    // client side to use txouts and make signatures
    let txouts = JSON.parse(
      JSON.stringify(ych.data.profile.txouts[coina], (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value
      ),
      jsonBNparse
    ); // deep copy

    ych.init_coinjs(coina);

    // expanded to include past=800,usable=400,futures=350(?)
    const txouts_evm = txouts.filter(txout => (
      txout.state == 350 || txout.state == 400 || txout.state == 800)
    );
    // only usable=400
    // sort input from min-to-max available amount, ready for select
    txouts = txouts.filter(txout => (txout.state == 400));
    txouts.sort(function(a, b) { return Number(a.free - b.free); });
    console.log("input txouts:", txouts);

    if (coininfoa.type == "txout_t1") {

      const [txouts_selected,
        txouts_selected_freea,
        txouts_selected_ordersa,
        txouts_selected_filleda] = ych.txout_select_inps(txouts, totala_via_txouts);

      if (txouts_selected_freea <0 || txouts_selected_freea < totala_via_txouts) {
        //page.show_error("sell: not enough available coins in txouts to trade "+totala_via_txouts);
        console.log("sell: not enough available coins in txouts to trade "+totala_via_txouts);
        return;
      }

      console.log("selected txouts:",
        txouts_selected,
        txouts_selected_freea,
        txouts_selected_ordersa,
        txouts_selected_filleda);

      for (let i=0; i<txouts_selected.length; i++) {
        const txout = txouts_selected[i];
        const [signed_txinp,err] = ych.sign_txout(txout);
        if (err != null) {
          //page.show_error(err);
          console.log('sell error err: ', err);
          return;
        }
        signed_txinps.push(signed_txinp);
      }
    }

    if (coininfoa.type == "evm_t1" || coininfoa.type == "erc20_t1") {

      const sat = 10000000000n;
      let amount = totala_via_txouts;

      for (let i=0; i<txouts_evm.length; i++) {

        const txout = txouts_evm[i];
        const state1 = "0x"+txout.txid;
        const txout_sign = txout.orders +txout.filled +amount;
        const txout_sigv = txout.amount -txout_sign;
        const txout_sign_wei = txout_sign *sat;

        const sig = ych.evm_sign1(
          ych.address[coina],
          state1,
          txout_sign_wei,
          ych.evm_zeroaddr,
          0/*tw*/);
        const sigs = [sig];

        let signed_txinp = {};
        signed_txinp.txid = txout.txid;
        signed_txinp.nout = txout.nout;
        signed_txinp.amnt = txout.amount;
        signed_txinp.fill = txout.filled;
        signed_txinp.usea = amount;
        signed_txinp.sigf = "";
        signed_txinp.sigv = txout_sigv;
        signed_txinp.sigs = sigs;
        signed_txinps.push(signed_txinp);
      }
    }
  }

  // usig
  let buftext_usetxouts = "";
  signed_txinps.forEach(function(txout, idx) {
    buftext_usetxouts += txout.txid+":"+txout.nout;
    buftext_usetxouts += txout.fill.toString();
    buftext_usetxouts += txout.usea.toString();
  });
  ych.init_coinjs();
  let buftext =
    coina+
    coinb+
    price.toString()+
    amounta.toString()+
    amountb.toString()+
    feea.toString()+
    "0"+
    totala_via_debit.toString()+
    buftext_usetxouts+
    ych.pubkey1+
    ych.nnum;
  console.log("buftext:", buftext);
  let buffer = ych.str2bytes(buftext);
  let hash1 = Crypto.SHA256(buffer, {asBytes: true});
  let hash2 = Crypto.SHA256(hash1, {asBytes: true});
  let tx = coinjs.transaction();
  let wif = coinjs.privkey2wif(ych.prvkey1);
  let sig = tx.transactionSig(0, wif, 1, hash2);

  // server side
  return $.ajax({
    type: "PUT",
    url: 'https://'+exchangeUrl +window.ych_sell_path,
    async: true,
    data: JSON.stringify(
      {
        coina: coina,
        coinb: coinb,
        price: price,
        amounta: amounta,
        amountb: amountb,
        feea: feea,
        feeb: 0n,
        usedebit: totala_via_debit,
        usetxouts: signed_txinps,
        usig: sig
      }, (key, value) =>
        typeof value === "bigint" ? value.toString() + "n" : value),
    dataType: 'json',
    beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 
    success: function(data) {
      console.log(data);
      if (data.ok) {
        //page.clear_error();
        console.log('sell success: trade success - ', data.index);
      } else {
        //page.show_error("sell: "+data.error);
        console.log("sell failed: "+data.error);
        if (dexyBot.isRunning()) {
          //$('#data_bot_log tbody tr:first-child td[data-label="Message"] div').append(`<br>buftext: ${buftext}`);
          buftextBot = buftext;
        }
      }
    },
    error: function(xhr, status, error) {
      //page.show_error("sell error: "+status+": "+error);
      console.log("sell error: "+status+": "+error);
    }
  }).done( function(json) {
      console.log('sell done json:', json);
      return json;
  }).then( function(json) {
      console.log('sell then json:', json);
      return json;
  });

};

$( '#makesell-button' ).click( function( event ) {
  event.preventDefault();
  //ych.gui.call_with_pass1().then((res) => {
    //if (!res.ok) {
    //  page.show_error(res.msg);
    //  return;
    //}
  /*
  const price = ych.gui.get_input_amount('makesell-price-text');
  const amounta = ych.gui.get_input_amount('makesell-quantity-text');
  */
    const price = $('#makesell-price-text').val();
    const amount = $('#makesell-quantity-text').val()

    xybot.part.sell_call(price, amount);
  //});
});

//PART market NO BUY - Cancel Buy
  xybot.part.nobuy_call = function(orderid, coinaa='', coinbb='') {

    //coina = ych.data.markets[ych.gui.current_market].coina;
    //coinb = ych.data.markets[ych.gui.current_market].coinb;
    coina = coinaa ? coinaa : ych.data.markets[ych.gui.current_market].coina;
    coinb = coinbb ? coinbb : ych.data.markets[ych.gui.current_market].coinb;


    return $.ajax({
        type: "PUT",
        url: 'https://'+exchangeUrl +window.ych_nobuy_path,
        data: JSON.stringify({
          coina: coina,
          coinb: coinb,
          index: orderid,
        }),
        dataType: 'json',
        beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 
        success: function(data) {
          console.log(data);
          if (data.ok) {
            //page.clear_error();
            console.log('nobuy success: order cancelled!');
          } else {
            //page.show_error("nobuy: "+data.error);
            console.log("nobuy failed: "+data.error);
          }
        },
        error: function(xhr, status, error) {
          //page.show_error("nobuy: "+status+": "+error);
          console.log("nobuy error: "+status+": "+error);
        }
      }).done( function(json) {
          console.log('nobuy done json:', json);
          return json;
      }).then( function(json) {
          console.log('nobuy then json:', json);
          return json;
      });
  }

$( '[data-order-buy="cancel"]' ).click(function(e) {
      e.preventDefault();
      var orderid = $(e).attr('data-order-id');
      var coina = $(e).attr('data-order-coina');
      var coinb = $(e).attr('data-order-coinb');

      xybot.part.nosell_call(orderid, coina, coinb);

    });


  xybot.part.nosell_call = function(orderid, coinaa='', coinbb='') {
      
      //coina = ych.data.markets[ych.gui.current_market].coina;
      //coinb = ych.data.markets[ych.gui.current_market].coinb;

      coina = coinaa ? coinaa : ych.data.markets[ych.gui.current_market].coina;
      coinb = coinbb ? coinbb : ych.data.markets[ych.gui.current_market].coinb;

      //ych.data.markets[ych.gui.current_market].coina
      return $.ajax({
        type: "PUT",
        url: 'https://'+exchangeUrl +window.ych_nosell_path,
        data: JSON.stringify({
          coina: coina,
          coinb: coinb,
          index: orderid,
        }),
        dataType: 'json',
        beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + (document.cookie).replace(/jwt=/g,'') ); }, 
        success: function(data) {
          console.log(data);
          if (data.ok) {
            //page.clear_error();
            console.log('nosell success: order cancelled!');
          } else {
            //page.show_error("nosell failed: "+data.error);
            console.log("nosell failed: "+data.error);
          }
        },
        error: function(xhr, status, error) {
          //page.show_error("nosell: "+status+": "+error);
          console.log("nosell error: "+status+": "+error);
        }
      }).done( function(json) {
          console.log('nosell done json:', json);
          return json;
      }).then( function(json) {
          console.log('nosell then json:', json);
          return json;
      });
    }

$( '[data-order-sell="cancel"]' ).click(function(e) {
      e.preventDefault();
      var orderid = $(e).attr('data-order-id');
      var coina = $(e).attr('data-order-coina');
      var coinb = $(e).attr('data-order-coinb');

      xybot.part.nosell_call(orderid, coina, coinb);

    });




//DEXYBOT


//https://github.com/jonthornton/jquery-timepicker
//https://www.jonthornton.com/jquery-timepicker/




$('#botButton').on('click', function() {
  let botStatus = $(this).attr('data-bot');

  if (botStatus == 'start') {
    

    

    
    

    
    
    //$('#tradingbot [data-bot="options"]').velocity('slideUp', { duration: 300 });


    //show tradingbot active elements
    $('#tradingbot [data-bot="active"]').velocity('slideDown', { duration: 300 });

    //get form configuration for bot
    const OrderType = $('#tradingbot input:radio[name="botOrderType-radio"]:checked').val();
    
    const tradingPair = $('#tradingbot select#select-market').val();
    const maxOpenBidOrders = $('#tradingbot input[data-bot="maxOpenBidOrders"]').val();
    const maxOpenAskOrders = $('#tradingbot input[data-bot="maxOpenAskOrders"]').val();
    const minOrderCost = $('#tradingbot input[data-bot="minOrderCost"]').val();
    const maxOrderCost = $('#tradingbot input[data-bot="maxOrderCost"]').val();
    const buyBalance = $('#tradingbot input[data-bot="buyBalance"]').val();
    const sellBalance = $('#tradingbot input[data-bot="sellBalance"]').val();
    const minRandomTradeTime = $('#tradingbot input[data-bot="minRandomTradeTime"]').val();
    const maxRandomTradeTime = $('#tradingbot input[data-bot="maxRandomTradeTime"]').val();
    
    const useLiqudity =$('#tradingbot input[data-bot="useLiquidity"]').prop('checked');

    // Define the mapping for the checked values of cancelOrdersonStop
    const cancelOrdersonStopMapping = {
      'both': { cancelBuyOrders: true, cancelSellOrders: true },
      'sell': { cancelBuyOrders: false, cancelSellOrders: true },
      'buy': { cancelBuyOrders: true, cancelSellOrders: false },
      'none': { cancelBuyOrders: false, cancelSellOrders: false },
    };
    const cancelOrdersonStopValue =$('#tradingbot input:radio[name="botcancelOrdersonStop-radio"]:checked').val();
    // Create the cancelOrdersOnStop object using the mapping
    const cancelOrdersOnStop = cancelOrdersonStopMapping[cancelOrdersonStopValue];


    let intervalPeriods = [];
    $('#tradingbot #intervalPeriod .row').each(function() {
      var start = $(this).find('input[data-bot="intervalStart"]').val();
      var end = $(this).find('input[data-bot="intervalEnd"]').val();

      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
      var currentDay = String(currentDate.getDate()).padStart(2, '0');

      var startDate = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + start;
      var endDate = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + end;

      intervalPeriods.push({ 'start': startDate, 'end': endDate });
    });

    console.log('intervalPeriods: ', intervalPeriods)

    //configure tradingbot
    dexyBot.config({
      'botId': "Bot_"+tradingPair,  //botId 
      'tradingPair':  tradingPair,
      'buyBalance': buyBalance,
      'sellBalance': sellBalance,      //coina
      'minimalSpread': 0.00000100,
      'minOrderCost': minOrderCost,
      'maxOrderCost': maxOrderCost,
      'maxOpenOrders': { 'bid': maxOpenBidOrders, 'ask': maxOpenAskOrders },
      'intervalPeriod': intervalPeriods,
      'useLiquidity': useLiqudity,
      'waitTimeRange': {'min': minRandomTradeTime, 'max': maxRandomTradeTime}, 
      'cancelOrdersOnStop': cancelOrdersOnStop,
      'orderType': OrderType,
    });

    //start dexyBot!
    dexyBot.start();

  } else {
    
    //$('#tradingbot [data-bot="options"]').velocity('slideDown', { duration: 300 });

    //show tradingbot active elements
    $('#tradingbot [data-bot="active"]').velocity('fadeIn', { duration: 300 });

    //stop dexyBot
    dexyBot.stop();

  }

  console.log('dexyBot: ', dexyBot);
});
/*
start: [],
      : [],
      : [],
      orderCancel: [],
      : [],
      orderMatch: [],
      emptyBalance: [],

*/
dexyBot.on('start', function (data) {
  //"start bot" - Elements related
  $('#botButton').attr('data-bot', 'stop').removeClass('btn-lime').addClass('btn-red').html('Stop Bot');

  
  $('#data_bot_log [data-bot="tradingPair"]').text(dexyBot.botId);
  $('#tradingbot [data-bot="status"]').removeClass('bg-red-lt').addClass('bg-green-lt').html('Bot is active');
  $('#tradingbot .overlay_message').removeClass('d-none');
  //hide tradingbot options
    $('#tradingbot [data-bot="options"] input').prop('disabled', true);
    $('#intervalPeriod button').prop('disabled', true);
  
  //empty bot log
  $("#data_bot_log tbody").text('');

  let newRow = `<tr>
      <td colspan="5" class="text-muted"><div><span class="badge bg-lime-lt">Bot Started ...</span></div></td>
    </tr>`;
    //$('#data_bot_log tbody').prepend(newRow).hide().first().velocity('fadeIn', { duration: 300 });
    //$(newRow).hide().prependTo("#data_bot_log tbody").first().velocity('fadeIn', { duration: 300 });
    $("#data_bot_log tbody").prepend(newRow).find('tr:first-child div').velocity('slideDown', { duration: 300 });

    console.log('dexyBot.on(start', data);
});
dexyBot.on('stop', function (data) {
  //"stop bot" - Elements related
  $('#botButton').attr('data-bot', 'start').removeClass('btn-red').addClass('btn-lime').html('Start Bot');

  $('#tradingbot [data-bot="status"]').removeClass('bg-green-lt').addClass('bg-red-lt').html('Not running');
  $('#tradingbot .overlay_message').addClass('d-none');
  //hide tradingbot options
    $('#tradingbot [data-bot="options"] input').prop('disabled', false);
    $('#intervalPeriod button').prop('disabled', false);

  let newRow = `<tr>
      <td colspan="5" class="text-muted"><div><span class="badge bg-red-lt">Bot Stopped ...</span></div></td>
    </tr>`;
    //$(newRow).hide().prependTo("#data_bot_log tbody").first().velocity('fadeIn', { duration: 300 });
    $("#data_bot_log tbody").prepend(newRow).find('tr:first-child div').velocity('slideDown', { duration: 300 });
    console.log('dexyBot.on(stop', data);
});
dexyBot.on('error', function (data) {
  $('#tradingbot [data-bot="status"]').removeClass('bg-green-lt').addClass('bg-red-lt').html('Not running');

  let newRow = `<tr>
      <td colspan="5" class="text-muted"><div><span class="badge bg-red-lt">Bot Start Failed</span> ${data.message}</div></td>
    </tr>`;
    //$('#data_bot_log tbody').prepend(newRow).hide().first().velocity('fadeIn', { duration: 300 });
    //$(newRow).hide().prependTo("#data_bot_log tbody").first().velocity('fadeIn', { duration: 300 });
    $("#data_bot_log tbody").prepend(newRow).find('tr:first-child div').velocity('slideDown', { duration: 300 });

    console.log('dexyBot.on(error', data);
});

dexyBot.on('intervalChange', function (data) {
  let newRow = `<tr>
      <td colspan="3" class="text-muted"><div><span class="badge bg-orange-lt">Waiting for next interval ...</span></div></td>
      <td colspan="2" class=""><div class="d-flex flex-column text-muted small"><span >Start-time: ${data.interval.start}, </span> <span>End-time: ${data.interval.end}</span></div</td>
    </tr>`;
    //$(newRow).hide().prependTo("#data_bot_log tbody").first().velocity('fadeIn', { duration: 300 });
    $("#data_bot_log tbody").prepend(newRow).find('tr:first-child div').velocity('slideDown', { duration: 300 });
    console.log('dexyBot.on(intervalChange',data);
});
dexyBot.on('orderPlace', function (data) {
  
  let orderClass = ""
  if (data.orderType == "buy")
    orderClass = "bg-lime-lt";
  else
    orderClass = "bg-red-lt";

  let newRow = "";
  let status = "";
  if (data.success)
    newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType}</span></div></td>
                    <td data-label="Price" class="text-muted yright"><div>${(data.order.price).toFixed(8)}</div></td>
                    <td data-label="Amount" class="text-muted yright"><div>${(data.order.amount).toFixed(8)}</div></td>
                    <td data-label="Cost" class="text-muted yright"><div>${(data.order.cost).toFixed(8)}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
                </tr>`;
  else {
    newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType}</span></div></td>
                    <td data-label="Message" colspan="3" class="text-muted small "><div>${data.error}, <br>ych.nnum: ${ych.nnum}, <br><span class="buftext">buftextBot: ${buftextBot}</span></div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
                </tr>`;
  }

    $("#data_bot_log tbody").prepend(newRow).find('tr:first-child div').velocity('slideDown', { duration: 300 });
    //$(newRow).hide().prependTo("#data_bot_log tbody").first().velocity('fadeIn', { duration: 300 });
    console.log('dexyBot.on(orderPlace',data);
});

dexyBot.on('orderCancel', function (data) {
  
  let orderClass = ""
  if (data.orderType == "buy")
    orderClass = "bg-lime-lt";
  else
    orderClass = "bg-red-lt";

  let newRow = "";
  let status = "";
  if (data.success)
    newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType} cancel</span></div></td>
                    <td data-label="Price" class="text-muted yright"><div>${(data.order.price).toFixed(8)}</div></td>
                    <td data-label="Amount" class="text-muted yright"><div>${(data.order.amount).toFixed(8)}</div></td>
                    <td data-label="Cost" class="text-muted yright"><div>${(data.order.cost).toFixed(8)}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
                </tr>`;
  else {
    newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType} cancel</span></div></td>
                    <td data-label="Message" colspan="3" class="text-muted small "><div>${data.error}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
                </tr>`;
  }

    $("#data_bot_log tbody").prepend(newRow).find('tr:first-child div').velocity('slideDown', { duration: 300 });
    //$(newRow).hide().prependTo("#data_bot_log tbody").first().velocity('fadeIn', { duration: 300 });
    console.log('dexyBot.on(orderCancel',data);
});



$(document).on('focus', '[data-bot="intervalPeriod"] .datetime', function() {
  var timePicker = $(this);
  
  /*
  if (!timePicker.hasClass('ui-timepicker-input')) {
    //date time picker settings
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

    timePicker.timepicker({
      'minTime': h+':'+m,
      //'maxTime': '00:00',
      'showDuration': true,
      'show2400': true,
      'timeFormat': 'H:i',
      'step': 15,
    });

  timePicker.addClass('analyzed');
  }
  */
  if (!timePicker.hasClass('bs-timepicker')) {
    $('.datetime').timepicker();
  }

});

  // Add extra Interval
  $('#intervalPeriod [data-bot="interval-add"]').on('click', function() {
    var intervalPeriod = $('#intervalPeriod'); // Get the interval period container

    // Clone the first interval and append it to the interval period container
    //var newInterval = intervalPeriod.find('[data-bot="intervals"]').first().html();
    var newInterval = intervalPeriod.find('.row:first-child').clone();

    console.log('newInterval: ', newInterval);
    intervalPeriod.append(newInterval);

    // Reset the values of the cloned interval
    newInterval.find('input').removeClass('ui-timepicker-input');
    newInterval.find('[data-bot="intervalStart"]').val('');
    newInterval.find('[data-bot="intervalEnd"]').val('');

    newInterval.find('[data-bot="interval-add"]').attr('data-bot', 'interval-remove').html('-').removeClass('btn-outline-info').addClass('btn-outline-secondary');


  });

  //Remove extra Interval
$("body").on("click", '#intervalPeriod [data-bot="interval-remove"]', function(e){
  $(this).parent().parent().remove();
});


$("body").on("change", "#intervalPeriod .datetime", function(e){

  //console.log('changeTime triggered ');

  var startOrEndTime = $(this).attr('data-bot'); // Get the selected time element attribute
  var inputValue = $(this).val(); // Get the selected input value
  var inputTime = new Date('1970-01-01T' + inputValue + ':00'); // Convert input value to a Date object

  if (startOrEndTime === 'intervalStart') {
    var startTime = inputTime;
    var endTimeElement = $(this).parent().parent().parent().find('[data-bot="intervalEnd"]');
    var endTimeValue = endTimeElement.val(); // Get the end-time value

    var endTime = new Date('1970-01-01T' + endTimeValue + ':00'); // Convert end-time value to a Date object

    //console.log('changeTime startTime: ', startTime);
    //console.log('changeTime endTimeValue: ', endTimeValue);
    
    if (endTimeValue == '')
      endTime = startTime ;

    if (endTime <= startTime ) {
      // Add 1 hour to the end-time
      endTime.setHours(startTime.getHours() + 1);
      endTime.setMinutes(startTime.getMinutes());

      // Format the updated time as "HH:mm"
      var updatedTime = ('0' + endTime.getHours()).slice(-2) + ':' + ('0' + endTime.getMinutes()).slice(-2);

      // Update the end-time input value
      endTimeElement.val(updatedTime);
      /*
      console.log('========changeTime if==========');
      console.log('changeTime startTime is: ', startTime);
      console.log('changeTime endTime is: ', endTime);
      console.log('changeTime update endTime: ', updatedTime);
      */
    }
  } else {
    var endTime = inputTime;
    var startTimeElement = $(this).parent().parent().parent().find('[data-bot="intervalStart"]');
    var startTimeValue = startTimeElement.val(); // Get the start-time value

    var startTime = new Date('1970-01-01T' + startTimeValue + ':00'); // Convert start-time value to a Date object

    if (startTimeValue == '')
      startTime = endTime ;

    if (startTime >= endTime) {
      // Subtract 1 hour from the start-time
      startTime.setHours(endTime.getHours() - 1);
      startTime.setMinutes(endTime.getMinutes());

      // Format the updated time as "HH:mm"
      var updatedTime = ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

      // Update the start-time input value
      startTimeElement.val(updatedTime);
      /*
      console.log('=========changeTime else=========');
      console.log('changeTime startTime is: ', startTime);
      console.log('changeTime endTime is: ', endTime);

      console.log('changeTime update startTime: ', updatedTime);
      */
    }
  }
});




});


$(window).on('load', function(){
            setTimeout(function(){
                $('#preloader').velocity({
                    opacity : 0.1,
                    translateY: "-80px"
                }, {
                    duration: 400,
                    complete: function(){
                    $('#hola').velocity({
                    translateY : "-100%"
                }, {
                    duration: 1000,
                    easing: [0.7,0,0.3,1],
                    complete: function(){
                        $('.page-wrapper').addClass('animate-border divide');
                    }
                })  
                    }
                })
            },1000)
        })