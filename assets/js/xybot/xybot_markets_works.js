$(function() {
  'use strict';

  //init the bot
  const dexyBot = new tradingbot();
  let buftextBot = '';
  $('.dexybot_version').text('v' + xybot.version);
  

  //init vars
  //list of crypto icons
  xybot.vars.assetInfo = [
    { name: "Bitcoin", ticker: "BTC", icon: "bitcoin-btc-logo.svg", slug: ["btc", "tbtc"] },
    { name: "BitBay", ticker: "BAY", icon: "bitbay-bay-logo.svg", slug: ["bay", "tbay"] },
    { name: "BitBayR", ticker: "BAYR", icon: "bitbay-bay-logo.svg", slug: ["bayr"] },
    { name: "BitBayF", ticker: "BAYF", icon: "bitbay-bay-logo.svg", slug: ["bayf"] },
    { name: "Litecoin", ticker: "LTC", icon: "litecoin-ltc-logo.svg", slug: ["ltc", "tltc"] },
    { name: "Ethereum", ticker: "ETH", icon: "ethereum-eth-logo.svg", slug: ["eth", "teth", "teth1", "teth2", "goerli", "rinkeby"] },
    { name: "BlackCoin", ticker: "BLK", icon: "blackcoin-blk-logo.svg", slug: ["blk", "tblk"] },
    { name: "Dai", ticker: "DAI", icon: "dai-dai-logo.svg", slug: ["dai", "tdai2"] },
  ];

  // Function to search for a slug match
  xybot.getAssetData = function(slug) {
  for (let i = 0; i < xybot.vars.assetInfo.length; i++) {
    const asset = xybot.vars.assetInfo[i];
    if (asset.slug.includes(slug.toLowerCase())) {
      return asset;
    }
  }
  return null; // No match found
};

  


  /* Mikado Templates */
  //Mikado Markets Table Template




const tplMarkets = `<div for="data.markets">
  <div>
<h2 style="position: absolute;margin-top: 5px;"><div class="badge bg-purple-lt d-flex"><img src="./assets/images/crypto/{{= data.icon }}" class="icon icon32 me-1"> {{= data.name }} </div> </h2>
<div id="markets-{{= data.name }}" class="mb-3">
  <div class="table-responsive" >
    <div data-marketss="">
    <table class="table table-theme table-row v-middle">
      <thead>
        <tr>
          <th class="text-muted" style="min-width: 100px; max-width: 160px"></th>
          <th class="text-muted yright" style="width:60px">Price</th>
          <th class="text-muted yright" data-market="ext_price" style="width:50px"><span title="Coinmarketcap Price" data-bs-toggle="tooltip" data-bs-placement="top">CMC Price</span></th>
          <th class="text-muted yright" style="width:30px">Volume</th>
        </tr>
      </thead>
      <tbody for="data.market">
        <tr class="v-middle" >
          <td class="d-flex">
            <div>
              <a href="#" class="d-flex align-items-center" >
                <span class="text-uppercase me-2"><img src="./assets/images/crypto/{{= data.xy.icon }}" class="icon icon28"></span> {{= data.name  }}
              </a>
            </div>
            <div>
              {{#= data.xy.open }}
            </div>
          </td>
          <td class="yright">{{#= data.xy.price }}</td>
          <td class="yright" data-market="ext_price">
            <span class="badge bg-info-lt">{{#= data.xy.extprice}}</span>
          </td>
          <td class="yright">
            {{#= data.xy.volusd }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</div>
</div>
</div>`;

                        /*`
    {{@ console.log('muuu', data) }}
    <div >
                          <div >
                            <h1>{{ data["TBTC-MARKETS"][0].name }}</h1>
                            <p>Price: {{ data["TBTC-MARKETS"][0].price }}</p>
                            <p>Volume (A): {{ data["TBTC-MARKETS"][0].volumea }}</p>
                            <p>Volume (B): {{ data["TBTC-MARKETS"][0].volumeb }}</p>
                            <p>Volume (USD): {{ data["TBTC-MARKETS"][0].volusd }}</p>
                          </div>
                        </div>`;
                        */
/*

`{{
                        console.log('data: ', mikadata)
                        }}<div for="Object.keys(data)">
                          <div for="data[key]">
                            <h1>{{ data[key].name }}</h1>
                            <p>Price: {{ data[key].price }}</p>
                            <p>Volume (A): {{ data[key].volumea }}</p>
                            <p>Volume (B): {{ data[key].volumeb }}</p>
                            <p>Volume (USD): {{ data[key].volusd }}</p>
                          </div>
                        </div>`;

  
        xybot.vars.mikado.groupedMarketPairs2 = {
  "markets": [
    {
      "name": "TBTC-MARKETS",
      "market": [
        {
          "index": 1,
          "group": false,
          "name": "TETH2-TBTC",
          "coina": "TETH2",
          "coinb": "TBTC",
          "price": 40000000,
          "digits": 0,
          "volumea": 0,
          "volumeb": 0,
          "volusd": 0,
          "open": true,
          "service": false
        },
        {
          "index": 3,
          "group": false,
          "name": "TLTC-TBTC",
          "coina": "TLTC",
          "coinb": "TBTC",
          "price": 2100000,
          "digits": 0,
          "volumea": 0,
          "volumeb": 0,
          "volusd": 0,
          "open": true,
          "service": false
        }
      ]
    },
    {
      "name": "TDAI2-MARKETS",
      "market": [
        {
          "index": 9,
          "group": false,
          "name": "TBTC-TDAI2",
          "coina": "TBTC",
          "coinb": "TDAI2",
          "price": 3005268316846,
          "digits": 0,
          "volumea": 0,
          "volumeb": 0,
          "volusd": 0,
          "open": true,
          "service": false
        },
        {
          "index": 10,
          "group": false,
          "name": "TETH2-TDAI2",
          "coina": "TETH2",
          "coinb": "TDAI2",
          "price": 160000000000,
          "digits": 0,
          "volumea": 0,
          "volumeb": 0,
          "volusd": 0,
          "open": true,
          "service": false
        },
        {
          "index": 12,
          "group": false,
          "name": "TLTC-TDAI2",
          "coina": "TLTC",
          "coinb": "TDAI2",
          "price": 0,
          "digits": 0,
          "volumea": 0,
          "volumeb": 0,
          "volusd": 0,
          "open": true,
          "service": false
        }
      ]
    }
  ]
}; 
*/

        const containerTplMarkets = document.getElementById("groupedMarkets");
        const tplMarketsC = Mikado.compile(tplMarkets);
        xybot.view.viewMarketsTable = Mikado(containerTplMarkets, tplMarketsC, {
          on: {
            create: function(node) {
              console.log("viewMarketsTable - created:", node);
            },
            insert: function(node) {
              console.log("viewMarketsTable - inserted:", node);
            },
            update: function(node) {
              console.log("viewMarketsTable - updated:", node);
            },
            change: function(node) {
              console.log("viewMarketsTable - changed:", node);
            },
            remove: function(node) {
              console.log("viewMarketsTable - removed:", node);
            },
            cache: false,
            store: true, 
            loose: true
          }
        });
        /*
        store - use "view.refresh()" after updating the data for the template!

        Enable internal store bypassing the options during initialization:

var view = new Mikado(template, { store: true });

Whenever you call the .render() function along with passed data, this data will be updated (add/remove/change) to the internal store.

view.render(data);

You can re-render/refresh the last/current state at any time without passing data again:

view.refresh();

Or force an update to a specific index:

view.refresh(index);

Or force an update to a specific node:

view.refresh(node);

Access to the store:

var store = view.store;
        */

//xybot.view.viewMarketsTable.render(xybot.vars.mikado.groupedMarketPairs);


        /*
        const data = 
        {
  "TBTC-MARKETS": [
    {
      "index": 1,
      "group": false,
      "name": "TETH2-TBTC",
      "coina": "TETH2",
      "coinb": "TBTC",
      "price": 40000000,
      "digits": 0,
      "volumea": 0,
      "volumeb": 0,
      "volusd": 0,
      "open": true,
      "service": false
    },
    {
      "index": 3,
      "group": false,
      "name": "TLTC-TBTC",
      "coina": "TLTC",
      "coinb": "TBTC",
      "price": 2100000,
      "digits": 0,
      "volumea": 0,
      "volumeb": 0,
      "volusd": 0,
      "open": true,
      "service": false
    }
  ],
  "TDAI2-MARKETS": [
    {
      "index": 9,
      "group": false,
      "name": "TBTC-TDAI2",
      "coina": "TBTC",
      "coinb": "TDAI2",
      "price": 3005268316846,
      "digits": 0,
      "volumea": 0,
      "volumeb": 0,
      "volusd": 0,
      "open": true,
      "service": false
    },
    {
      "index": 10,
      "group": false,
      "name": "TETH2-TDAI2",
      "coina": "TETH2",
      "coinb": "TDAI2",
      "price": 160000000000,
      "digits": 0,
      "volumea": 0,
      "volumeb": 0,
      "volusd": 0,
      "open": true,
      "service": false
    },
    {
      "index": 12,
      "group": false,
      "name": "TLTC-TDAI2",
      "coina": "TLTC",
      "coinb": "TDAI2",
      "price": 0,
      "digits": 0,
      "volumea": 0,
      "volumeb": 0,
      "volusd": 0,
      "open": true,
      "service": false
    }
  ]
};
*/

/*

{
  "tweets": [
    {
      "title": "Title 1",
      "comments": [
        {
          "content": "Comment 1",
          "replies": [
            {
              "content": "Reply 1"
            },
            {
              "content": "Reply 2"
            }
          ]
        },
        {
          "content": "Comment 2",
          "replies": [
            {
              "content": "Reply 3"
            }
          ]
        }
      ]
    },
    {
      "title": "Title 2",
      "comments": [
        {
          "content": "Comment 3",
          "replies": []
        }
      ]
    }
  ]
}


*/

        


/*  const tplMarketsTable = `

<tr data-balance="{{= data.coin}}">
        <td data-sort="{{= data.coin}}" data-balance="asset_name">{{= data.coin}}</td>
        <td data-sort="{{= data.sum}}" data-balance="sum">{{#= data.sum_format}}</td>
        <td data-sort="{{= data.usd}}" data-balance="usd">{{#= data.usd_format}}</td>
        <td data-sort="{{= data.free}}" data-balance="free">{{#= data.free_format}}</td>
        <td data-sort="{{= data.inorders}}" data-balance="orders">{{#= data.inorders_format}}</td>
      </tr>`;

const tplMarketsTableC = Mikado.compile(tplMarketsTable);
  const containerMarkets = document.getElementById('markets');
  xybot.view.viewMarketsTable = new Mikado(containerMarkets, tplMarketsTableC, {
    on: {
      create: function(node) {
        console.log("viewMarketsTable - created:", node);
      },
      insert: function(node) {
        console.log("viewMarketsTable - inserted:", node);
      },
      update: function(node) {
        console.log("viewMarketsTable - updated:", node);
      },
      change: function(node) {
        console.log("viewMarketsTable - changed:", node);
      },
      remove: function(node) {
        console.log("viewMarketsTable - removed:", node);
      },
      cache: false,
    }
  });
*/
/*Coingecko API */
// CoinGecko API endpoint for BTC
  const btcApiUrl = "https://api.coingecko.com/api/v3/coins/bitcoin";
  const globalApiUrl = "https://api.coingecko.com/api/v3/global";

  // Function to format market cap values in billions or trillions
  function formatMarketCapValue(value, decimals=2) {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(decimals) + "T";
    } else if (value >= 1e9) {
      return (value / 1e9).toFixed(decimals) + "B";
    } else {
      return value.toFixed(decimals);
    }
  }

function setBadgeColor(element, value) {
    if (value > 0) {
      element.addClass("bg-success-lt").text("+" + value.toFixed(2) + "%");
    } else if (value < 0) {
      element.addClass("bg-danger-lt").text(value.toFixed(2) + "%");
    } else {
      element.text("0.00%");
    }
  }

  // Function to fetch data from CoinGecko API
  function fetchCryptoApiData() {
    $.ajax({
      url: btcApiUrl,
      method: "GET",
      success: function(response) {
        const btcMarketCap = response.market_data.market_cap.usd;
        const dailyChange = response.market_data.price_change_percentage_24h;
        const weeklyChange = response.market_data.price_change_percentage_7d;
        const monthlyChange = response.market_data.price_change_percentage_30d;
        const yearlyChange = response.market_data.price_change_percentage_1y;
        const btcDailyMarketCapChange = response.market_data.market_cap_change_percentage_24h;
        const btcDominanceChange = response.market_data.market_cap_change_percentage_24h_in_currency.btc;

        // Update BTC price
        $("#btc-price").text("$" + response.market_data.current_price.usd.toFixed(2));

        // Update BTC changes
        setBadgeColor($("#btc-daily-change"), dailyChange);
        setBadgeColor($("#btc-weekly-change"), weeklyChange);
        setBadgeColor($("#btc-monthly-change"), monthlyChange);
        setBadgeColor($("#btc-yearly-change"), yearlyChange);

        // Update market cap info
        $("#btc-market-cap-info").text("$" + formatMarketCapValue(btcMarketCap, 0));

        // Update BTC market cap daily change
        setBadgeColor($("#btc-cap-daily-change"), btcDailyMarketCapChange);


        // Fetch total crypto market cap
        $.ajax({
          url: globalApiUrl,
          method: "GET",
          success: function(response) {
            const totalMarketCap = response.data.total_market_cap.usd;
            const dailyMarketCapChange = response.data.market_cap_change_percentage_24h_usd;
            const btcDominance = response.data.market_cap_percentage.btc;
            

            // Update total crypto market cap and btc dominance
            $("#total-market-cap").text("$" + formatMarketCapValue(totalMarketCap));
            $("#btc-dominance-info").text(btcDominance.toFixed(2) + "%");



            // Update total crypto market cap changes
            setBadgeColor($("#total-cap-daily-change"), dailyMarketCapChange);
            setBadgeColor($("#btc-dominance-daily-change"), btcDominanceChange);

          },
          error: function() {
            console.log("Error fetching total crypto market cap from CoinGecko API.");
          }
        });
      },
      error: function() {
        console.log("Error fetching data from CoinGecko API.");
      }
    });
  }

  // Fetch data initially
  fetchCryptoApiData();

  // Refresh data every 5 minutes
  setInterval(fetchCryptoApiData, 5 * 60 * 1000); // 5 minutes interval



  //Mikado Balance Table Template
  const tplBalancesTable = `

<tr data-balance="{{= data.coin}}">
        <td data-sort="{{= data.coin}}" data-balance="asset_name">{{= data.coin}}</td>
        <td data-sort="{{= data.sum}}" data-balance="sum">{{#= data.sum_format}}</td>
        <td data-sort="{{= data.usd}}" data-balance="usd">{{#= data.usd_format}}</td>
        <td data-sort="{{= data.free}}" data-balance="free">{{#= data.free_format}}</td>
        <td data-sort="{{= data.inorders}}" data-balance="orders">{{#= data.inorders_format}}</td>
      </tr>`;
  /*
  const tplBalancesTable = `
  <tr data-balance="{{= data.coin}}">
          <td data-sort="{{= data.coin}}" data-balance="asset_name">{{= ( data.coin)}}</td>
          <td data-sort="{{= data.sum}}" data-balance="sum">{{= ( data.sum_format)}}</td>
          <td data-sort="{{= data.usd}}" data-balance="usd">{{= ( data.usd_format)}}</td>
          <td data-sort="{{= data.free}}" data-balance="free">{{= (data.free_format)}}</td>
          <td data-sort="{{= data.inorders}}" data-balance="orders">{{= (data.inorders_format)}}</td>
        </tr>`;
        */
  const tplBalancesTableC = Mikado.compile(tplBalancesTable);
  const containerBalances = document.getElementById('table-balance-tbody');
  xybot.view.viewBalancesTable = new Mikado(containerBalances, tplBalancesTableC, {
    on: {
      create: function(node) {
        //console.log("viewBalanceTable - created:", node);
      },
      insert: function(node) {
        //console.log("viewBalanceTable - inserted:", node);
      },
      update: function(node) {
        //console.log("viewBalanceTable - updated:", node);
      },
      change: function(node) {
        //console.log("viewBalanceTable - changed:", node);
      },
      remove: function(node) {
        //console.log("viewBalanceTable - removed:", node);
      },
      cache: false,
    }
  });

  /*
  @ Update Orderbook of selected/current TradingPair
  */
  //Mikado Bid Orderbook template
  const tplOrderbookBid = `
  <div class="entryContainer">
    <div class="marketSizeBar" style="width: {{data.marketSizeBarWidth}}%;"></div>
    <div class="leftLabelCol">
      <span class="entryText">{{(data.amount).toFixed(4)}}</span>
    </div>
    <div class="centerLabelCol">
      <span class="entryBuyText text-lime">{{(data.price).toFixed(8)}}</span>
    </div>
    <div class="rightLabelCol">
      <span class="entryText">{{(data.total).toFixed(4)}}</span>
    </div>
  </div>
`;

  //Mikado Bid OrderBook compile template
  var tplOBookBid = Mikado.compile(tplOrderbookBid);

  //set the container for the view
  // Mount a DOM element to Mikado and render the template with data, set the options as well
  const containerBidOrders = document.getElementById('orderbook_bid');
  const viewBidBook = new Mikado(containerBidOrders, tplOBookBid, {
    on: {
      create: function(node) {
        //console.log("tplOBookBid - created:", node);
      },
      insert: function(node) {
        //console.log("tplOBookBid - inserted:", node);
      },
      update: function(node) {
        //console.log("tplOBookBid - updated:", node);
      },
      change: function(node) {
        //console.log("tplOBookBid - changed:", node);
      },
      remove: function(node) {
        //console.log("tplOBookBid - removed:", node);
      },
      cache: false,
    }
  });


  //Mikado Ask Orderbook template
  const tplOrderBookAsk = `
  <div class="entryContainer">
    <div class="marketSizeBar marketSizeBarSell" style="width: {{data.marketSizeBarWidth}}%;"></div>
    <div class="leftLabelCol">
      <span class="entryText">{{(data.amount).toFixed(4)}}</span>
    </div>
    <div class="centerLabelCol">
      <span class="entrySellText text-red">{{(data.price).toFixed(8)}}</span>
    </div>
    <div class="rightLabelCol">
      <span class="entryText">{{(data.total).toFixed(4)}}</span>
    </div>
  </div>
`;

  //Mikado Ask OrderBook compile template
  var tplOBookAsk = Mikado.compile(tplOrderBookAsk);

  //set the container for the view
  // Mount a DOM element to Mikado and render the template with data, set the options as well
  const containerAskOrders = document.getElementById('orderbook_ask');
  const viewAskBook = new Mikado(containerAskOrders, tplOBookAsk, {
    on: {
      create: function(node) {
        //console.log("tplOBookAsk - created:", node);
      },
      insert: function(node) {
        //console.log("tplOBookAsk - inserted:", node);
      },
      update: function(node) {
        //console.log("tplOBookAsk - updated:", node);
      },
      change: function(node) {
        //console.log("tplOBookAsk - changed:", node);
      },
      remove: function(node) {
        //console.log("tplOBookAsk - removed:", node);
      },
      cache: false,
    }
  });

//Manually Buy Orders
//Mikado BuyCallback Message
const tplBidMessage = `<div class="alert {{=data.alert}} alert-dismissible" role="alert">
                        <div class="d-flex" data-message="">
                          {{=data.success}}: <strong>{{=data.message}}</strong>
                        </div>
                        <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
                      </div>`;

  var tplBidCallback = Mikado.compile(tplBidMessage);
  const containerBidCallback = document.getElementById('buy_callback');
  const viewBidCallback = new Mikado(containerBidCallback, tplBidCallback, {
      on: {
        create: function(node) {
          console.log("viewBidCallback - created:", node);
        },
        insert: function(node) {
          console.log("viewBidCallback - inserted:", node);
        },
        update: function(node) {
          console.log("viewBidCallback - updated:", node);
        },
        change: function(node) {
          console.log("viewBidCallback - changed:", node);
        },
        remove: function(node) {
          console.log("viewBidCallback - removed:", node);
        },
        cache: false,
      }
    });

  //Manually Sell Orders
//Mikado SellCallback Message
const tplAskMessage = `<div class="alert {{=data.alert}} alert-dismissible" role="alert">
                        <div class="d-flex" data-message="">
                          {{=data.success}}: <strong>{{=data.message}}</strong>
                        </div>
                        <a class="btn-close" data-bs-dismiss="alert" aria-label="close"></a>
                      </div>`;

  var tplAskCallback = Mikado.compile(tplAskMessage);
  const containerAskCallback = document.getElementById('sell_callback');
  const viewAskCallback = new Mikado(containerAskCallback, tplAskCallback, {
      on: {
        create: function(node) {
          console.log("viewAskCallback - created:", node);
        },
        insert: function(node) {
          console.log("viewAskCallback - inserted:", node);
        },
        update: function(node) {
          console.log("viewAskCallback - updated:", node);
        },
        change: function(node) {
          console.log("viewAskCallback - changed:", node);
        },
        remove: function(node) {
          console.log("viewAskCallback - removed:", node);
        },
        cache: false,
      }
    });

  /* //Mikado Templates */

/*Init xybot vars */
//init xybot view/template vars
xybot.init = function() {

  console.log('xybot.init');

  //prepare vars for view/templates
  //group markets pairs
  /*const groupedMarketPairs = {};

  ych.data.groups.forEach(group => {
    const groupName = `${group.name}-MARKETS`;
    groupedMarketPairs[groupName] = [];

    Object.entries(ych.data.markets).forEach(([marketName, market]) => {
      if (
        (group.coina === '*' && ((market.coina === group.name || market.coinb === group.name)) ||
        (market.coina === group.coinb && market.coinb === group.name)) && group.name !== market.coina
      ) {

        market.xyopen = "Closed";
        if (market.service)
          market.xyopen = "Open";

        groupedMarketPairs[groupName].push(market);
      }
    });
  });
  */

  // Create an object to store grouped market pairs
  const groupedMarketPairs = {
    markets: []
  };

  // Iterate over each group
  ych.data.groups.forEach(group => {
    // Create a market group object for the current group
    const marketGroup = {
      name: `${group.name} Markets`,
      icon : "",
      market: []
    };

    // Iterate over each market
    Object.entries(ych.data.markets).forEach(([marketName, market]) => {

      const asset = xybot.getAssetData(group.name);
        if (asset) 
          marketGroup.icon = asset.icon;

      // Check the conditions for grouping the market
      if (
        (group.coina === '*' && ((market.coina === group.name || market.coinb === group.name)) ||
        (market.coina === group.coinb && market.coinb === group.name)) && group.name !== market.coina
      ) {
        // Assign the xyopen property based on the maintenance service value
        market.xy = {};
        market.xy.open = market.service ? '<div class="badge bg-danger-lt" title="Market is Closed" data-bs-toggle="tooltip" data-bs-placement="top">Closed</div>' : '<div class="badge bg-success-lt" title="Market is Open" data-bs-toggle="tooltip" data-bs-placement="top">Open</div>';
        //get asset icon
        const asset = xybot.getAssetData(market.coina);
        if (asset) 
          market.xy.icon = asset.icon;

        market.xy.volusd = ych.gui.format_usd_or_empty(market.volusd);

        //format price depending on group digits 
        let digits = 8;
        if (group.digits != 0) digits = group.digits;
        if (digits == 8) {
          market.xy.price = ych.gui.format_amount(BigInt(Math.floor(0.5+market.price)));
        } else {
          if (digits == 2) {
            market.xy.price = ych.gui.format_usd_like('',market.price/1.e8);
          } else {
            market.xy.price = market.price.toFixed(digits);
          }
        }

        //format external price
        if (ych.data.coininfos[market.coinb].ext.priceext) {
          let price_base = ych.data.coininfos[market.coina].ext.priceext / ych.data.coininfos[market.coinb].ext.priceext;
          if (digits == 8) {
            market.xy.extprice = ych.gui.format_amount(BigInt(Math.floor(0.5+price_base* 1e8)));
          } else {
            if (digits == 2) {
              market.xy.extprice =  ych.gui.format_usd_like('',price_base);
            } else {
              market.xy.extprice = price_base.toFixed(digits);
            }
          }
        }



        // Add the market to the market group
        marketGroup.market.push(market);
      }
    });

    // Add the market group to the groupedMarketPairs
    groupedMarketPairs.markets.push(marketGroup);
  });

  // Store the groupedMarketPairs in xybot.vars.mikado
  xybot.vars.mikado.groupedMarketPairs = groupedMarketPairs;

  // Render the markets table using the groupedMarketPairs
  xybot.view.viewMarketsTable.render(xybot.vars.mikado.groupedMarketPairs);

}




  /* Mikado/JQuery Event Handler */

  const loginButton = $('#page-login-button-login');

  const buyPriceInput = $('#makebuy-price-text');
  const sellPriceInput = $('#makesell-price-text');
  const buyAmountInput = $('#makebuy-quantity-text');
  const sellAmountInput = $('#makesell-quantity-text');
  const sellCostInput = $('#makesell-cost-text');
  const buyCostInput = $('#makebuy-cost-text');
  
  const buyCostFee = $('#makebuy-fee');
  const sellCostFee = $('#makesell-fee');

  

  $("body").on("click", '#orderbook_bid .entryBuyText, #orderbook_ask .entrySellText', function(e) {
    buyPriceInput.val($(this).text());
    sellPriceInput.val($(this).text());
  });

  $("body").on("click", '#orderbook_bid .entryText, #orderbook_ask .entryText', function(e) {
    buyAmountInput.val($(this).text());
    sellAmountInput.val($(this).text());
  });


  $('#login').keypress(function(e) {
    if (e.which === 13) { // Check if the Enter key was pressed (key code 13)
      e.preventDefault(); // Prevent the form from being submitted
      // Your code to handle the Enter key press goes here
      // For example, you can call a login function
      loginButton.click();
    }
  });


  $('#sell_form').on('change, keyup', 'input', function (e) {
      const price = parseFloat(sellPriceInput.val());
      const amount = parseFloat(sellAmountInput.val());
      const cost = (price * amount);

      const marketFee = ych.data.coininfos[xybot.current_market.coina ].fee.sellfee;
      const fee = amount * marketFee;

      sellCostFee.text(fee.toFixed(8));
      sellCostInput.val((cost).toFixed(8));
  });


  

  $('#buy_form').on('change, keyup', 'input', function (e) {
      const price = parseFloat(buyPriceInput.val());
      const amount = parseFloat(buyAmountInput.val());
      const cost = (price * amount);

      const marketFee = ych.data.coininfos[xybot.current_market.coinb ].fee.buyfee;
      const fee = cost * marketFee;

      buyCostFee.text(fee.toFixed(8));
      buyCostInput.val((cost + fee).toFixed(8));
  });


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

  xybot.promisify = function(fn) {
    console.log('===xybot.promisify===');
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

  xybot.navigate = function() {
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

      console.log('Router.urlParams.page: ' + Router.urlParams.page);


      //if any other page param is set other then supported pages, throw error
      /*
      if (!wally_fn.navigationPages.hasOwnProperty(Router.urlParams.page) )
        if (Router.urlParams.page != '')
          throw ('...')
      

      */
      $('[data-user="auth"]').removeClass('hidden');

      //remove all auth pages and show the navigated one
      $('[data-page]').fadeOut(0).addClass('hidden');
      $('[data-menu="card"] .list-group list-group-item').fadeOut(0).removeClass('active');

      //show page and activatee its menu
      $('[data-page="' + Router.urlParams.page + '"]').fadeIn().removeClass('hidden');

      //active menu
      $('[data-menu="card"] a.list-group-item').removeClass('active');
      $('[data-menu="card"] a.list-group-item').each(function(index) {
        if ('#' + Router.urlParams.page == $(this).attr('href')) {
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

  xybot.initRouter = async function() {
    console.log('===initRouter===');




    /*<<< Start Router*/
    var show_about = function() {
      alert('This is the application "About".\n\nCopyright ©2020-2023 xybot.id');
    }

    var show_number = function(num) {
      alert('Number: ' + num);
      console.log('num: ', num)
    }

    var setVerifyScript = function() {
      document.getElementById('verifyScript').value = Router.urlParams.decode;
    }
    var loginWalletInteraction = function() {

    }



    Router
      .add(/^$/, function(data) {
        console.log('**first-empty string page**');
        Router.urlParams.page = 'start';
      })
      .add(/start(.*)/, function(data) {
        console.log('**start page**');
        console.log('data: ', data);
      })
      .add(/balance/, function(data) {
        console.log('**balance page**');
        console.log('data: ', data);
      })
      .add(/orders$/, function(data) {
        //.add(/(order\/?[\w-/].*)/, function(data){
        console.log('**order page**');
        console.log('data: ', data);
      })
      .add(/bot/, function(data) {
        console.log('**bot page**');
        console.log('data: ', data);
      })

      .add(/error-404/, function(data) {
        console.log('**error-404 page**');
        console.log('data: ', data);
      })
      .add(/login/, function(data) {
        console.log('**login page**');
        //console.log('data: ', data);
        /*
const url = "attans/wallet/subpage?asset=btc&do=what&och=sendå&asas/asas";
const regex = /^([^?#\/]+)\/([^?#]+)\?(.*)$/;
const [,page, path, paramString] = url.match(regex) || [];

console.log("page:", page);                 //page: attans
console.log("path:", path);                 //path: wallet/subpage
console.log("paramString:", paramString);   //paramString: asset=btc&do=what&och=sendå&asas/asas

// Extract params as objects
const params = {};
paramString.split("&").forEach(pair => {
  const [key, value] = pair.split("=");
  params[key] = decodeURIComponent(value);
});

console.log("params:", params);

          */
      })
      .add(/logout/, function(data) {
        console.log('**logout page**');
        //console.log('data: ', data);
        window.ych_gui_on_logout();
      })
      .add(/settings(.*)/, function(data) {})
      .add(/about(.*)/, function(data) {
        console.log('**about page**');
      })
      .add(/auth/, function(data) {
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
      .beforeAll(function() {
        console.log('==Run Before All Routes!')

        //if not page is set, default to start
        if (Router.urlParams.page == '')
          Router.urlParams.page = 'start';

        xybot.navigate();

      })
      .afterAll(function() {
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




  xybot.init2 = function() {

    console.log('xybot.init');
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
      loginButton.prop("disabled", false); 
    })
    .fail(function(data) {
      console.log( "getJSON - error" );

      console.log('status: ', status);
      console.log('error: ', error);

      $( '#page-login-box-status' ).show();
      $( '#page-login-box-status' ).text(status+": "+error);
     loginButton.prop("disabled", false); 

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
  xybot.login_call = async function() {
    $('#page-login-box-status').addClass('hidden');
    $('#page-login-box-status .alert').text("");
    
    let user = ych.gui.cleanup_email($('#page-login-text-user').val());
    let pass = $('#page-login-text-pass').val();
    let code = $('#page-login-text-totp').val();
    let uprvkey = "";
    let upubkey = "";
    [uprvkey, upubkey] = ych.user_keys_v1(user, pass)
    // sig with our key
    let sig = "";
    {
      let buffer = ych.str2bytes(user + upubkey + code + ych.nnum);
      let hash1 = Crypto.SHA256(buffer, {
        asBytes: true
      });
      let hash2 = Crypto.SHA256(hash1, {
        asBytes: true
      });
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
        */
    ;

    console.log('body: ', JSON.stringify({
      user: user,
      upub: upubkey,
      usig: sig,
      code: code
    }));




    $.ajax({
      method: "PUT",
      url: 'https://' + exchangeUrl + window.ych_login_path,
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

            $('#page-login-box-status').removeClass('hidden');
            $('#page-login-box-status .alert').removeClass('alert-success').addClass('alert-danger').html('Account is not confirmed!');
            return;
          }

          //document.cookie = 'jwt='+data.access;
          document.cookie = 'jwt=' + data.access + ';SameSite=Strict';


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
          if (uid == "") {
            $('#page-login-box-status').removeClass('hidden');
            $('#page-login-box-status .alert').removeClass('alert-success').addClass('alert-danger').html('Login token not recognized');
            console.log(jwt);
            return;
          }


          // keys are ready
          ych.user = user;
          ych.pubkey1 = upubkey;
          ych.prvkey1 = uprvkey;

          window.ych_gui_on_init(data);

          console.log('login_call: logged in');
          $('#page-login-box-status').removeClass('hidden');
          $('#page-login-box-status .alert').removeClass('alert-danger').addClass('alert-success').html('Connected to NightTrader! <br> user: ' + ych.user);
          return;
        } else {
          $('#page-login-box-status').removeClass('hidden');
          $('#page-login-box-status .alert').removeClass('alert-success').addClass('alert-danger').html(data.error);
        }
      },
      error: function(xhr, status, error) {

        console.log('status: ', status);
        console.log('error: ', error);

        $('#page-login-box-status').removeClass('hidden');
        $('#page-login-box-status .alert').removeClass('alert-success').addClass('alert-danger').html(status + ": " + error);


      },
      complete: function(jqXHR, textStatus) {
        console.log(JSON.stringify(jqXHR));
        console.log('textStatus: ', textStatus);
        
      }
    });



  }


  //
  //init Router
  xybot.initRouter();


  //Login Button
  loginButton.on('click', function(e) {
    e.preventDefault();
    loginButton.children('.spinner').removeClass('hidden');
    loginButton.prop("disabled", true);

    const loginCall = xybot.promisify( xybot.login_call );
    loginCall().then((data) => {
      console.log('===loginCall: ', data);
    }).catch((error) => {
      console.log('===loginCall Catch: ', error);
    }).then(() => {
      loginButton.children('.spinner').addClass('hidden');
      loginButton.prop("disabled", false);
      console.log('===loginCall Done: ');
    });

  });

  //Logout Button
  $('#page-account-profile-button-logout, .page-account-profile-button-logout').click(function(e) {
    e.preventDefault();
    window.ych_gui_on_logout();

  });


  //Theme Handler
  var themeStorageKey = "tablerTheme";
  var defaultTheme = "light";
  $('[data-set-theme]').on('click', function(e) {


    var selectedTheme = $(this).attr('data-set-theme');



    console.log('selectedTheme: ' + selectedTheme);

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
    $('[data-set-theme]').attr(themeStorageKey, 'light')
  } else {
    document.body.removeAttribute("data-bs-theme");
    $('[data-set-theme]').attr(themeStorageKey, 'dark')
  }


  //Sort Tables
  //https://stackoverflow.com/a/3160718
  //https://github.com/padolsey-archive/jquery.fn/blob/master/sortElements/jquery.sortElements.js
  var table = $('#table-balance');

  $('[data-sort]')
    //$('[data-sort="sort-name"], [data-sort="sort-type"]')
    .wrapInner('<span title="sort this column"/>')
    .each(function() {

      var th = $(this),
        thIndex = th.index(),
        inverse = false;

      th.click(function() {

        table.find('td').filter(function() {

          return $(this).index() === thIndex;

        }).sortElements(function(a, b) {
          console.log('sort a: ', a);
          console.log('sort b: ', b);

          //compare alphabetic order
          const compareNumber = (($(a).attr('data-balance') == 'asset_name') && ($(b).attr('data-balance') == 'asset_name')) ? false : true;

          if (compareNumber) {
            return parseFloat($(a).attr('data-sort')) > parseFloat($(b).attr('data-sort')) ?
              inverse ? -1 : 1 :
              inverse ? 1 : -1;
          } else {
            return ($(a).attr('data-sort')) > ($(b).attr('data-sort')) ?
              inverse ? -1 : 1 :
              inverse ? 1 : -1;
          }

        }, function() {

          // parentNode is the element we want to move
          return this.parentNode;

        });

        inverse = !inverse;

      });

    });

  //Balance
  xybot.balance.init = async function() {
    console.log('===xybot.balance.init===')
    let usdtotal = 0.;
    let userBalances = [];
    for (let coin in ych.data.profile.balances) {
      let usdrate = 0.;
      if (coin in ych.data.coininfos) {
        let coininfo = ych.data.coininfos[coin];
        usdrate = coininfo.ext.priceext;
        //console.log('coin: ' + coin, ', coininfo: ',coininfo);

        var usd = Number(ych.data.profile.balances[coin].sum) / 1.e8 * usdrate;
        var sum = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].sum);
        var free = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].free);
        var inorders = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].orders);

        userBalances.push({
          'coin': coin,
          'sum_format': sum,
          //'sum_format': Number(ych.data.profile.balances[coin].sum)/1.e8,
          'sum': (ych.data.profile.balances[coin].sum),

          'usd_format': ych.gui.format_usd_or_empty(usd),
          //'usd_format': usd,
          'usd': usd,

          'free_format': free,
          //'free_format': Number(ych.data.profile.balances[coin].free)/1.e8,
          'free': (ych.data.profile.balances[coin].free),

          'inorders_format': inorders,
          //'inorders_format': Number(ych.data.profile.balances[coin].orders)/1.e8,
          'inorders': (ych.data.profile.balances[coin].orders),
        });

        /*var coinToAdd = `<tr data-balance="${coin}">
                        <td data-sort="${coin}" data-balance="asset_name">${coin}</td>
                        <td data-sort="${(ych.data.profile.balances[coin].sum)}" data-balance="sum">${sum}</td>
                        <td data-sort="${(usd)}" data-balance="usd">${ych.gui.format_usd_or_empty(usd)}</td>
                        <td data-sort="${(ych.data.profile.balances[coin].free)}" data-balance="free">${free}</td>
                        <td data-sort="${(ych.data.profile.balances[coin].orders)}" data-balance="orders">${inorders}</td>
                      </tr>`;
        $('#table-balance tbody').append(coinToAdd);
        */


        usdtotal += usd;

      }
    }
    //render user Balances table
    xybot.view.viewBalancesTable.render(userBalances);

    $('#table-balance-total').html(ych.gui.format_usd_or_empty(usdtotal));


  }




  xybot.part.orderbook.update = function(orderType = 'both') {

    const marketPair = ych.gui.current_market;
    const selected_market_pair = (marketPair).split('-');

    //Mikado update buy side of orderbook


    if (orderType === 'both' || orderType === 'buy') {
      const buyEntryContainer = $('#xyOrderBookTable .entriesContainer[data-orders="buy"] .entryContainer');
      const buyEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="buy"]');
      const bidOrderBook = ych.data.buys[marketPair];

      if (bidOrderBook === undefined) {
        return;
      }

      // Sort the orders in descending price order
      bidOrderBook.sort((a, b) => b.price - a.price);

      // Calculate total buy amount
      const totalBuyAmount = bidOrderBook.reduce((total, order) => total + order.amounta, 0) / 1e8;

      // Create an array with a fixed length to hold the updated orders
      const updatedOrders = new Array(bidOrderBook.length);

      // Calculate cumulative buy amount and update marketSizeBarWidth
      let cumulativeBuyAmount = 0;
      for (let i = 0; i < bidOrderBook.length; i++) {
        const order = bidOrderBook[i];
        cumulativeBuyAmount += order.amounta / 1e8;

        const marketSizeBarWidth = Math.ceil((cumulativeBuyAmount / totalBuyAmount) * 100);
        const amount = parseFloat((order.amounta / 1e8).toFixed(4));
        const price = parseFloat((order.price / 1e8).toFixed(8));
        const total = parseFloat(cumulativeBuyAmount.toFixed(4));

        updatedOrders[i] = {
          //coina: order.coina,
          //coinb: order.coinb,
          amount,
          price,
          marketSizeBarWidth,
          total,
        };
      }


      $('[data-market="buy_orders_total"]').text(totalBuyAmount.toFixed(8));
      $('[data-balance="coina"]').html($(`[data-balance="${selected_market_pair[0]}"] [data-balance="free"]`).html());

      //console.log('viewBidBook updatedOrders: ', updatedOrders);
      // Render the entire buy/bid order book
      viewBidBook.render(updatedOrders);



    }


    if (orderType === 'both' || orderType === 'sell') {
      const sellEntryContainer = $('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer');
      const sellEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="sell"]');
      const askOrderBook = ych.data.sells[marketPair];

      if (askOrderBook === undefined) {
        return;
      }

      // Sort the orders in ascending price order
      askOrderBook.sort((a, b) => b.price - a.price);

      // Calculate total sell amount
      const totalSellAmount = askOrderBook.reduce((total, order) => total + order.amounta, 0) / 1e8;

      // Calculate cumulative sell amount and update marketSizeBarWidth
      let cumulativeSellAmount = totalSellAmount;
      let cumulativeAmountTmp = cumulativeSellAmount;
      const updatedOrders = askOrderBook.map((order) => {


        const marketSizeBarWidth = Math.ceil((cumulativeAmountTmp / totalSellAmount) * 100);
        cumulativeSellAmount = cumulativeAmountTmp;
        cumulativeAmountTmp -= order.amounta / 1e8;

        return {
          coina: order.coina,
          coinb: order.coinb,
          amount: parseFloat(order.amounta / 1e8.toFixed(4)),
          price: parseFloat(order.price / 1e8.toFixed(8)),
          marketSizeBarWidth,
          total: parseFloat(cumulativeSellAmount.toFixed(4)),
        };


      });

      //console.log('viewAskBook updatedOrders: ', updatedOrders);
      // Render the entire buy/bid order book
      viewAskBook.render(updatedOrders);

      $('[data-market="sell_orders_total"]').text(totalSellAmount.toFixed(8));
      $('[data-balance="coinb"]').html($(`[data-balance="${selected_market_pair[1]}"] [data-balance="free"]`).html());
    }




    //Calculate and set spread between bid & ask
    if (ych.data.buys[marketPair][0] && ych.data.sells[marketPair][0]) {
      var spread = (1 - (ych.data.buys[marketPair][0].price / ych.data.sells[marketPair][0].price)).toFixed(2);
      //console.log('spread: ' + spread);
      if (spread > 0)
        $('[data-market="spread"]').text(spread + '%');
    }

    //Set Market Volume 
    let volusd = ych.data.markets[ych.gui.current_market].volusd;
    if (ych.data.markets[ych.gui.current_market].volusd) {
      $('[data-market="volumeusd"]').text('≈ $' + volusd.toFixed(0));
    }



    //TRADINGBOT DOM - user balance data
    if (ych.user) {
      const percentageBalanceToUse = 0.05; //5% of balance to use for tradingbot
      const buyBalance = (Number(ych.data.profile.balances[selected_market_pair[1]].free) / 1e8 * percentageBalanceToUse).toFixed(8);
      const sellBalance = (Number(ych.data.profile.balances[selected_market_pair[0]].free) / 1e8 * percentageBalanceToUse).toFixed(8);
      $('#tradingbot [data-bot="buyBalance"]').val(buyBalance);
      $('#tradingbot [data-bot="sellBalance"]').val(sellBalance);
    }
  }

  /*Event Handler after Single Balance Update - update the total*/
  xybot.balance.update_total = function() {
    console.log('===xybot.balance.update_total===');
    let usdtotal = 0.;
    for (let coin in ych.data.profile.balances) {
      let usdrate = 0.;
      if (coin in ych.data.coininfos) {
        let coininfo = ych.data.coininfos[coin];
        usdrate = coininfo.ext.priceext;
      }
      let usd = (Number(ych.data.profile.balances[coin].sum) / 1.e8 * usdrate);
      usdtotal += usd;
    }
    $('#table-balance-total').html("<b>" + ych.gui.format_usd_or_empty(usdtotal) + "</b>");
  };

  /*Event Handler on Single Balance Update*/
  xybot.balance.update = function(balance) {
    //console.log('===xybot.balance.pdate===');
    console.log('xybot.balance.update: ', balance);

    const node = xybot.view.viewBalancesTable.where({
      'coin': balance.coin,
      //error: 'Order failed',
    });
    //console.log('xybot.balance.update node: ', node)

    var data2 = xybot.view.viewBalancesTable.data(node[0]);
    //console.log('xybot.balance.update data2: ', data2);

    var index = xybot.view.viewBalancesTable.index(node[0]);
    //console.log('xybot.balance.update index: ', index);

    //update single balance    
    let usdrate = 0.;
    let coininfo = ych.data.coininfos[balance.coin];
    usdrate = coininfo.ext.priceext;
    //console.log('coin: ' + coin, ', coininfo: ',coininfo);

    var usd = Number(balance.sum) / 1.e8 * usdrate;
    var sum = ych.gui.format_amount_or_empty(balance.sum);
    var free = ych.gui.format_amount_or_empty(balance.free);
    var inorders = ych.gui.format_amount_or_empty(balance.orders);

    const data = {
      'coin': balance.coin,
      'sum_format': sum,
      //'sum_format': Number(balance.sum)/1.e8,
      'sum': balance.sum,

      'usd_format': ych.gui.format_usd_or_empty(usd),
      //'usd_format': usd,
      'usd': usd,

      'free_format': free,
      //'free_format': Number(balance.free)/1.e8,
      'free': balance.free,

      'inorders_format': inorders,
      //'inorders_format': Number(balance.orders)/1.e8,
      'inorders': balance.orders,
    };
    xybot.view.viewBalancesTable.update(node[0], data);
    $(node[0]).fadeOut(10).fadeIn(10);


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

      for (let i = 0; i < pairs.length; i++) {
        if (ych.data.markets[pairs[i]].service == true) //maintenance mode
          market_maintenance = ' (maintenance)';
        market_add += '<option value="' + pairs[i] + '">' + pairs[i] + market_maintenance + '</option>';
        market_maintenance = '';
      }
      market_add += '</optgroup >';
      selectMarketEl.append(market_add);
      market_add = '';
    }

    //$('data-market="coina"').text(selected_market_pair[0]);
    //console.log('base_markets: ', base_markets);

    //ych.gui.current_market = selectMarketEl[0].value;
    const selected_market_pair = (selectMarketEl[0].value).split('-');

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

      const selected_market_pair = (selectMarketEl[0].value).split('-');
      //buy and sell side data
      $('[data-market="coina"]').text(selected_market_pair[0]);
      $('[data-market="coinb"]').text(selected_market_pair[1]);

      var marketPair = this.options[this.selectedIndex].value;
      console.log('Market Pair: ' + marketPair);
      ych.gui.current_market = marketPair;

      xybot.current_market.market = selectMarketEl[0].value;

      xybot.current_market.coina = selected_market_pair[0];
      xybot.current_market.coinb = selected_market_pair[1];

      xybot.part.orderbook.update();

      const buyFee = ych.data.coininfos[selected_market_pair[1]].fee.buyfee*100;
      const sellFee = ych.data.coininfos[selected_market_pair[0]].fee.sellfee*100;
      
      $('[data-market-fee="coinb"]').text((buyFee).toFixed(2));
      $('[data-market-fee="coina"]').text((sellFee).toFixed(2));

      $('[data-market="name"]').text(xybot.current_market.coina+'/'+xybot.current_market.coinb);
    });

    selectMarketEl.trigger('change');


  }

  //PART market-buy
  xybot.part.buy_call = async function(price, amounta, botmarket = "") {

    //const coina = ych.data.markets[ych.gui.current_market].coina;
    //const coinb = ych.data.markets[ych.gui.current_market].coinb;
    const coina = botmarket ? ych.data.markets[botmarket].coina : ych.data.markets[ych.gui.current_market].coina;
    const coinb = botmarket ? ych.data.markets[botmarket].coinb : ych.data.markets[ych.gui.current_market].coinb;

    const change_addr = ych.address[coinb];
    if (change_addr == "") {
      //page.show_error("buy: not available the change address");
      console.log("buy: not available the change address");
      throw("buy: not available the change address");
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

    if (balance.debit > 0) {
      let can_use_from_debit = balance.debit - balance.ordersindebit;
      if (can_use_from_debit < 0) {
        //page.show_error("buy: error debt usage is negative");
        console.log("buy: error debt usage is negative");
        throw("buy: error debt usage is negative");
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
        txout.state == 350 || txout.state == 400 || txout.state == 800));
      // only usable=400
      // sort input from min-to-max available amount, ready for select
      txouts = txouts.filter(txout => (txout.state == 400));
      txouts.sort(function(a, b) {
        return Number(a.free - b.free);
      });
      console.log("input txouts:", txouts);

      if (coininfob.type == "txout_t1") {

        const [txouts_selected,
          txouts_selected_freeb,
          txouts_selected_ordersb,
          txouts_selected_filledb
        ] = ych.txout_select_inps(txouts, totalb_via_txouts);

        if (txouts_selected_freeb < 0 || txouts_selected_freeb < totalb_via_txouts) {
          //page.show_error("buy: not enough available coins in txouts to trade "+totalb_via_txouts);
          console.log("buy: not enough available coins in txouts to trade " + totalb_via_txouts);
          throw("buy: not enough available coins in txouts to trade " + Number(totalb_via_txouts)/1e8);
          return;
        }

        console.log("selected txouts:",
          txouts_selected,
          txouts_selected_freeb,
          txouts_selected_ordersb,
          txouts_selected_filledb);

        /*for (let i=0; i<txouts_selected.length; i++) {
          const txout = txouts_selected[i];
          const [signed_txinp,err] = ych.sign_txout(txout);
          await nonBlockTick(10);
          if (err != null) {
            //page.show_error(err);
            console.log('buy error err: ', err);
            return;
          }
          signed_txinps.push(signed_txinp);
        }
        */


        signed_txinps = await Promise.all(txouts_selected.map(async (txout) => {
          const [signed_txinp, err] = await ych.sign_txout(txout);
          if (err != null) {
            console.log('buy error err: ', err);
            return null; // Return null or an appropriate value to indicate failure
          }

          return signed_txinp;
        }));

        /*signed_txinps = await (async (txouts_selected) => {
          const result = [];

          for (let i = 0; i < txouts_selected.length; i++) {
            const txout = txouts_selected[i];
            const [signed_txinp, err] = await ych.sign_txout(txout);

            if (err != null) {
              console.log('buy error err: ', err);
              return null; // Return null or an appropriate value to indicate failure
            }

            result.push(signed_txinp);
          }

          return result;
        })(txouts_selected);
        */


        console.log('signed_txinps: ', signed_txinps);

      }

      if (coininfob.type == "evm_t1" || coininfob.type == "erc20_t1") {

        const sat = 10000000000n;
        let amount = totalb_via_txouts;

        for (let i = 0; i < txouts_evm.length; i++) {

          const txout = txouts_evm[i];
          const state1 = "0x" + txout.txid;
          const txout_sign = txout.orders + txout.filled + amount;
          const txout_sigv = txout.amount - txout_sign;
          const txout_sign_wei = txout_sign * sat;

          const sig = ych.evm_sign1(
            ych.address[coinb],
            state1,
            txout_sign_wei,
            ych.evm_zeroaddr,
            0 /*tw*/ );
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
      buftext_usetxouts += txout.txid + ":" + txout.nout;
      buftext_usetxouts += txout.fill.toString();
      buftext_usetxouts += txout.usea.toString();
    });
    ych.init_coinjs();
    let buftext =
      coina +
      coinb +
      price.toString() +
      amounta.toString() +
      amountb.toString() +
      "0" +
      feeb.toString() +
      totalb_via_debit.toString() +
      buftext_usetxouts +
      ych.pubkey1 +
      ych.nnum;

    //console.log("buftext:", buftext);

    let buffer = ych.str2bytes(buftext);
    let hash1 = Crypto.SHA256(buffer, {
      asBytes: true
    });
    let hash2 = Crypto.SHA256(hash1, {
      asBytes: true
    });
    let tx = coinjs.transaction();
    let wif = coinjs.privkey2wif(ych.prvkey1);
    let sig = tx.transactionSig(0, wif, 1, hash2);

    // server side
    return $.ajax({
      type: "PUT",
      url: 'https://' + exchangeUrl + window.ych_buy_path,
      data: JSON.stringify({
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
      headers: {
        'Authorization': 'Bearer ' + window.getJWT()
      },

      success: function(data) {
        console.log(data);
        if (data.ok) {
          //page.clear_error();
          //page.show_error('buy: success: trade success');
          console.log('buy success: trade success - ', data.index);
        } else {
          //page.show_error("buy failed: "+data.error);
          console.log("buy failed: " + data.error);
          if (dexyBot.isRunning()) {
            //$('#data_bot_log tbody tr:first-child td[data-label="Message"] div').append(`<br>buftext: ${buftext}`);
            buftextBot = buftext;
          }
        }
      },
      error: function(xhr, status, error) {
        //page.show_error("buy error: "+status+": "+error);
        console.log("buy error: " + status + ": " + error);
      }
    }).then(function(json) {
      //console.log('buy then json:', json);
      return json;
    });

  };


  $('#makebuy-button').click(async function(event) {
    event.preventDefault();
    $(this).children('.spinner').removeClass('hidden');
    $(containerBidCallback).addClass('hidden');
    const price = buyPriceInput.val();
    const amount = buyAmountInput.val()
    let order = {success: 'Success', alert: 'alert-success', message: 'Order Placed!'};

    /*let buyCall = xybot.promisify( xybot.part.buy_call  );
    buyCall(1871.74978924, 0.1).then((data) => {
      console.log('===buyCall: ', data);
    }).catch((error) => {
      console.log('===buyCall Catch: ', error);
    }).then(() => {
      
      console.log('===buyCall Done: ');
    });
    */

    try {
      const placeOrderCall = await xybot.part.buy_call(price, amount);
      console.log('placeOrderCall: ', placeOrderCall);
      const isSuccess = placeOrderCall.ok;

      if (!isSuccess) {
        order = {success: 'Failed', alert: 'alert-danger', message: placeOrderCall.error};
        console.log(`Buy Call - Failed: `);
      }
    } catch (error) {
      order = {success: 'Error', alert: 'alert-danger', message: error.toString()};
      console.log(`Buy Call - Catch: `, error);
    }
    $(this).children('.spinner').addClass('hidden');
    viewBidCallback.sync();
    viewBidCallback.render(order);


    $(containerBidCallback).removeClass('hidden');
    setTimeout(function() {
      $(containerBidCallback).addClass('hidden');
    }, 30000); // 30 seconds delay until hidden


  });

  //for using in heavy loops, chunking it for  non-blocking rendering
  //nonBlockTick = (fn) => new Promise((resolve) => setTimeout(() => resolve(fn), 5));
  //const nonBlockTick = function(ms=10) { return new Promise(resolve => window.setTimeout(resolve, ms)) };

  //PART market-sell

  xybot.part.sell_call = async function(price, amounta, botmarket = "") {

    //const coina = ych.data.markets[ych.gui.current_market].coina;
    //const coinb = ych.data.markets[ych.gui.current_market].coinb;
    const coina = botmarket ? ych.data.markets[botmarket].coina : ych.data.markets[ych.gui.current_market].coina;
    const coinb = botmarket ? ych.data.markets[botmarket].coinb : ych.data.markets[ych.gui.current_market].coinb;

    const change_addr = ych.address[coina];
    if (change_addr == "") {
      //page.show_error("sell: not available the change address");
      console.log("sell: not available the change address");
      throw("sell: not available the change address");
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

    if (balance.debit > 0) {
      let can_use_from_debit = balance.debit - balance.ordersindebit;
      if (can_use_from_debit < 0) {
        //page.show_error("sell: error debt usage is negative");
        console.log("sell: error debt usage is negative");
        throw("sell: error debt usage is negative");
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
        txout.state == 350 || txout.state == 400 || txout.state == 800));
      // only usable=400
      // sort input from min-to-max available amount, ready for select
      txouts = txouts.filter(txout => (txout.state == 400));
      txouts.sort(function(a, b) {
        return Number(a.free - b.free);
      });
      console.log("input txouts:", txouts);

      if (coininfoa.type == "txout_t1") {

        const [txouts_selected,
          txouts_selected_freea,
          txouts_selected_ordersa,
          txouts_selected_filleda
        ] = ych.txout_select_inps(txouts, totala_via_txouts);

        if (txouts_selected_freea < 0 || txouts_selected_freea < totala_via_txouts) {
          //page.show_error("sell: not enough available coins in txouts to trade "+totala_via_txouts);
          console.log("sell: not enough available coins in txouts to trade " + totala_via_txouts);
          throw("sell: not enough available coins in txouts to trade " + Number(totala_via_txouts)/1e8);

          return;
        }

        console.log("selected txouts:",
          txouts_selected,
          txouts_selected_freea,
          txouts_selected_ordersa,
          txouts_selected_filleda);

        /*for (let i=0; i<txouts_selected.length; i++) {
          const txout = txouts_selected[i];
          const [signed_txinp,err] = ych.sign_txout(txout);
          if (err != null) {
            //page.show_error(err);
            console.log('sell error err: ', err);
            return;
          }
          signed_txinps.push(signed_txinp);
        }
        */
        signed_txinps = await Promise.all(txouts_selected.map(async (txout) => {
          const [signed_txinp, err] = await ych.sign_txout(txout);

          if (err != null) {
            console.log('sell error err: ', err);
            return null; // Return null or an appropriate value to indicate failure
          }

          return signed_txinp;
        }));
      }

      if (coininfoa.type == "evm_t1" || coininfoa.type == "erc20_t1") {

        const sat = 10000000000n;
        let amount = totala_via_txouts;

        for (let i = 0; i < txouts_evm.length; i++) {

          const txout = txouts_evm[i];
          const state1 = "0x" + txout.txid;
          const txout_sign = txout.orders + txout.filled + amount;
          const txout_sigv = txout.amount - txout_sign;
          const txout_sign_wei = txout_sign * sat;

          const sig = ych.evm_sign1(
            ych.address[coina],
            state1,
            txout_sign_wei,
            ych.evm_zeroaddr,
            0 /*tw*/ );
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
      buftext_usetxouts += txout.txid + ":" + txout.nout;
      buftext_usetxouts += txout.fill.toString();
      buftext_usetxouts += txout.usea.toString();
    });
    ych.init_coinjs();
    let buftext =
      coina +
      coinb +
      price.toString() +
      amounta.toString() +
      amountb.toString() +
      feea.toString() +
      "0" +
      totala_via_debit.toString() +
      buftext_usetxouts +
      ych.pubkey1 +
      ych.nnum;
    //console.log("buftext:", buftext);
    let buffer = ych.str2bytes(buftext);
    let hash1 = Crypto.SHA256(buffer, {
      asBytes: true
    });
    let hash2 = Crypto.SHA256(hash1, {
      asBytes: true
    });
    let tx = coinjs.transaction();
    let wif = coinjs.privkey2wif(ych.prvkey1);
    let sig = tx.transactionSig(0, wif, 1, hash2);

    // server side
    return $.ajax({
      type: "PUT",
      url: 'https://' + exchangeUrl + window.ych_sell_path,
      async: true,
      data: JSON.stringify({
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
      headers: {
        'Authorization': 'Bearer ' + window.getJWT()
      },
      success: function(data) {
        console.log(data);
        if (data.ok) {
          //page.clear_error();
          console.log('sell success: trade success - ', data.index);
        } else {
          //page.show_error("sell: "+data.error);
          console.log("sell failed: " + data.error);
          if (dexyBot.isRunning()) {
            //$('#data_bot_log tbody tr:first-child td[data-label="Message"] div').append(`<br>buftext: ${buftext}`);
            buftextBot = buftext;
          }
        }
      },
      error: function(xhr, status, error) {
        //page.show_error("sell error: "+status+": "+error);
        console.log("sell error: " + status + ": " + error);
      }
    }).then(function(json) {
      //console.log('sell then json:', json);
      return json;
    });

  };

  $('#makesell-button').click(async function(event) {
    event.preventDefault();
    $(this).children('.spinner').removeClass('hidden');
    $(containerAskCallback).addClass('hidden');
    const price = sellPriceInput.val();
    const amount = sellAmountInput.val()
    let order = {success: 'Success', alert: 'alert-success', message: 'Order Placed!'};

    try {
      const placeOrderCall = await xybot.part.sell_call(price, amount);
      const isSuccess = placeOrderCall.ok;

      if (!isSuccess) {
        order = {success: 'Failed', alert: 'alert-danger', message: placeOrderCall.error};
        console.log(`Sell Call - Failed: `);
      }
    } catch (error) {
      console.log(`Sell Call - Catch: `, error);
      order = {success: 'Error', alert: 'alert-danger', message: error.toString()};
    }
    $(this).children('.spinner').addClass('hidden');
    viewAskCallback.sync();
    viewAskCallback.render(order);
    

    $(containerAskCallback).removeClass('hidden');
    setTimeout(function() {
      $(containerAskCallback).addClass('hidden');
    }, 30000); // 30 seconds delay until hidden



  });


  //PART market NO BUY - Cancel Buy
  xybot.part.nobuy_call = function(orderid, coinaa = '', coinbb = '') {

    //coina = ych.data.markets[ych.gui.current_market].coina;
    //coinb = ych.data.markets[ych.gui.current_market].coinb;
    coina = coinaa ? coinaa : ych.data.markets[ych.gui.current_market].coina;
    coinb = coinbb ? coinbb : ych.data.markets[ych.gui.current_market].coinb;


    return $.ajax({
      type: "PUT",
      url: 'https://' + exchangeUrl + window.ych_nobuy_path,
      data: JSON.stringify({
        coina: coina,
        coinb: coinb,
        index: orderid,
      }),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + window.getJWT()
      },
      success: function(data) {
        console.log(data);
        if (data.ok) {
          //page.clear_error();
          console.log('nobuy success: order cancelled!');
        } else {
          //page.show_error("nobuy: "+data.error);
          console.log("nobuy failed: " + data.error);
        }
      },
      error: function(xhr, status, error) {
        //page.show_error("nobuy: "+status+": "+error);
        console.log("nobuy error: " + status + ": " + error);
      }
    }).then(function(json) {
      //console.log('nobuy then json:', json);
      return json;
    });
  }

  $('[data-order-buy="cancel"]').click(function(e) {
    e.preventDefault();
    var orderid = $(e).attr('data-order-id');
    var coina = $(e).attr('data-order-coina');
    var coinb = $(e).attr('data-order-coinb');

    xybot.part.nosell_call(orderid, coina, coinb);

  });


  xybot.part.nosell_call = function(orderid, coinaa = '', coinbb = '') {

    //coina = ych.data.markets[ych.gui.current_market].coina;
    //coinb = ych.data.markets[ych.gui.current_market].coinb;

    coina = coinaa ? coinaa : ych.data.markets[ych.gui.current_market].coina;
    coinb = coinbb ? coinbb : ych.data.markets[ych.gui.current_market].coinb;

    //ych.data.markets[ych.gui.current_market].coina
    return $.ajax({
      type: "PUT",
      url: 'https://' + exchangeUrl + window.ych_nosell_path,
      data: JSON.stringify({
        coina: coina,
        coinb: coinb,
        index: orderid,
      }),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + window.getJWT()
      },
      success: function(data) {
        console.log(data);
        if (data.ok) {
          //page.clear_error();
          console.log('nosell success: order cancelled!');
        } else {
          //page.show_error("nosell failed: "+data.error);
          console.log("nosell failed: " + data.error);
        }
      },
      error: function(xhr, status, error) {
        //page.show_error("nosell: "+status+": "+error);
        console.log("nosell error: " + status + ": " + error);
      }
    }).then(function(json) {
      //console.log('nosell then json:', json);
      return json;
    });
  }

  $('[data-order-sell="cancel"]').click(function(e) {
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

    let startBot = true;
    // Remove existing red borders
    //$("#intervalPeriod .datetime").removeClass("border border-danger border-success");

    // Iterate through each interval
    $('#intervalPeriod .row').each(function() {
      var startInput = $(this).find("input[data-bot='intervalStart']");
      var endInput = $(this).find("input[data-bot='intervalEnd']");

      if (!compareTime(startInput, endInput))
        startBot = false;
    });

    if (!startBot)
      return;

    let botStatus = $(this).attr('data-bot');

    if (botStatus == 'start') {



      //$('#tradingbot [data-bot="options"]').velocity('slideUp', { duration: 300 });
      //$('#tradingbot [data-bot="options"]').velocity('slideUp').velocity("scroll", { duration: 500, easing: "spring" })
      //show tradingbot active elements
      //$('#tradingbot [data-bot="active"]').velocity('slideDown', { duration: 300 });

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

      const useLiqudity = $('#tradingbot input[data-bot="useLiquidity"]').prop('checked');

      // Define the mapping for the checked values of cancelOrdersonStop
      const cancelOrdersonStopMapping = {
        'both': {
          cancelBuyOrders: true,
          cancelSellOrders: true
        },
        'sell': {
          cancelBuyOrders: false,
          cancelSellOrders: true
        },
        'buy': {
          cancelBuyOrders: true,
          cancelSellOrders: false
        },
        'none': {
          cancelBuyOrders: false,
          cancelSellOrders: false
        },
      };
      const cancelOrdersonStopValue = $('#tradingbot input:radio[name="botcancelOrdersonStop-radio"]:checked').val();
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

        intervalPeriods.push({
          'start': startDate,
          'end': endDate
        });
      });

      //console.log('intervalPeriods: ', intervalPeriods)

      //configure tradingbot
      dexyBot.config({
        'botId': "Bot_" + tradingPair, //botId 
        'tradingPair': tradingPair,
        'buyBalance': buyBalance,
        'sellBalance': sellBalance, //coina
        'minimalSpread': 0.00000100,
        'minOrderCost': minOrderCost,
        'maxOrderCost': maxOrderCost,
        'maxOpenOrders': {
          'bid': maxOpenBidOrders,
          'ask': maxOpenAskOrders
        },
        'intervalPeriod': intervalPeriods,
        'useLiquidity': useLiqudity,
        'waitTimeRange': {
          'min': minRandomTradeTime,
          'max': maxRandomTradeTime
        },
        'cancelOrdersOnStop': cancelOrdersOnStop,
        'orderType': OrderType,
      });

      //start dexyBot!
      dexyBot.start();

    } else {

      //$('#tradingbot [data-bot="options"]').velocity('slideDown', { duration: 300 });

      //show tradingbot active elements
      $('#tradingbot [data-bot="active"]').velocity('fadeIn', {
        duration: 300
      });

      //stop dexyBot
      dexyBot.stop();

    }

  });
  
  /*
    DexyBot Log
    
  remaining trigger events to add : emptyBalance, orderMatch, orderCancel..
    
  */
  // Cache frequently accessed elements
  const botButton = $('#botButton');
  const botButtonText = botButton.children(':last');
  const botButtonSpinner = botButton.children(':first');
  const botLog = $("#data_bot_log tbody"); // Bot log container element
  const botLogInterval = $('#data_bot_log [data-bot="interval"]');

  const botTradingPair = $('#data_bot_log [data-bot="tradingPair"]');
  const botStatus = $('#tradingbot [data-bot="status"]');
  const botTradingOptions = $('#tradingbot [data-bot="options"] input');
  const botIntervalPeriodButtons = $('#intervalPeriod button');
  const botOverlay = $('#tradingbot .overlay_message');

  // Initialize predefined rows for bot logs
  const botLogRows = []; // Array of bot log rows
  const maxBotLogRows = 18; // Maximum number of rows in the bot log
  let currentBotLogRowIndex = 0; // Index to keep track of the current row position

  // Init/Create 18 predefined bot log rows
  for (let i = 0; i < maxBotLogRows; i++) {
    const row = document.createElement('tr');
    botLogRows.push(row);
  }

  function addBotLogRow(newRow) {
    const targetRow = botLogRows[currentBotLogRowIndex];
    targetRow.innerHTML = newRow;

    // Move the target row to the first row position
    botLog.prepend(targetRow, botLog.firstChild);

    // Slide down the newly added row
    $(targetRow).find('div').velocity('slideDown', {
      duration: 300
    });

    // Batch the DOM updates for better performance
    /*requestAnimationFrame(function () {
      // Slide down the newly added row
      const rowDiv = targetRow.querySelector('div');
      rowDiv.style.display = 'none';
      rowDiv.style.opacity = '0';
      rowDiv.style.transition = 'opacity 300ms';
      setTimeout(function () {
        rowDiv.style.display = '';
        requestAnimationFrame(function () {
          rowDiv.style.opacity = '1';
        });
      }, 0);
    });
    */

    // Update currentBotLogRowIndex for the next event
    currentBotLogRowIndex = (currentBotLogRowIndex + 1) % maxBotLogRows;
  }

  dexyBot.on('start', function(data) {

    //hide the trading options and scroll to top of the edge of element
    $('#tradingbot [data-bot="options"]').velocity('slideUp').velocity("scroll", {
      duration: 500,
      easing: "spring"
    })

    // Update elements related to "start bot"
    botButton.attr('data-bot', 'stop').removeClass('btn-lime').addClass('btn-red');
    botButtonText.text('Stop Bot');
    botButtonSpinner.removeClass('hidden');
    botTradingPair.text(dexyBot.botId);
    botStatus.removeClass('bg-red-lt').addClass('bg-green-lt').text('Bot is active');
    botOverlay.removeClass('d-none');

    // Disable trading bot options and interval period buttons
    botTradingOptions.prop('disabled', true);
    botIntervalPeriodButtons.prop('disabled', true);

    // Empty bot log
    botLog.empty();

    let newRow = `<tr>
    <td colspan="5" class="text-muted">
      <div><span class="badge bg-lime-lt">Bot Started ...</span></div>
    </td>
  </tr>`;

    // Empty bot log header about current interval
    botLogInterval.text('-');

    addBotLogRow(newRow);
  });

  dexyBot.on('stop', function(data) {

    //show the trading options and scroll to top of the edge of element
    $('#tradingbot [data-bot="options"]').velocity('slideDown').velocity("scroll", {
      duration: 500,
      easing: "spring"
    })

    // Update elements related to "stop bot"
    botButton.attr('data-bot', 'start').removeClass('btn-red').addClass('btn-lime');
    botButtonText.text('Start Bot');
    botButtonSpinner.addClass('hidden');
    botStatus.removeClass('bg-green-lt').addClass('bg-red-lt').text('Not running');
    botOverlay.addClass('d-none');

    // Enable trading bot options and interval period buttons
    botTradingOptions.prop('disabled', false);
    botIntervalPeriodButtons.prop('disabled', false);

    let newRow = `
    <tr>
      <td colspan="5" class="text-muted">
        <div><span class="badge bg-red-lt">Bot Stopped ...</span></div>
      </td>
    </tr>
  `;

    // Empty bot log header about current interval
    botLogInterval.text('-');

    addBotLogRow(newRow);
  });

  dexyBot.on('error', function(data) {
    botStatus.removeClass('bg-green-lt').addClass('bg-red-lt').text('Not running');

    let newRow = `
    <tr><td colspan="5" class="text-muted">
      <div><span class="badge bg-red-lt">Bot Start Failed</span> ${data.message}</div>
    </td>
  </tr>`;

    addBotLogRow(newRow);
  });

  dexyBot.on('intervalChange', function(data) {

    const startTime = new Date(data.interval.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const endTime = new Date(data.interval.end).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    let newRow = `<tr>
    <td colspan="3" class="text-muted">
      <div><span class="badge bg-orange-lt">Started new interval ...</span></div>
    </td>
    <td colspan="2" class="">
      <div class="d-flex flex-column text-muted small">
        <span>Start-time: ${startTime}</span>
        <span>End-time: ${endTime}</span>
      </div>
    </td>
  </tr>`;

    // Update BOTLOG header about current interval
    botLogInterval.text(startTime + ' - ' + endTime)

    addBotLogRow(newRow);

  });

  dexyBot.on('intervalDelay', function(data) {

    const startTime = new Date(data.interval.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const endTime = new Date(data.interval.end).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    let newRow = `<tr>
    <td colspan="3" class="text-muted">
      <div><span class="badge bg-orange-lt">Scheduling for interval start ...</span></div>
    </td>
    <td colspan="2" class="">
      <div class="d-flex flex-column text-muted small">
        <span>Start-time: ${startTime}</span>
        <span>End-time: ${endTime}</span>
      </div>
    </td>
  </tr>`;

    // Update BOTLOG header about current interval
    botLogInterval.html('<span class="text-orange">Scheduling ' + startTime + ' - ' + endTime + '</span>')

    addBotLogRow(newRow);
  });




  dexyBot.on('orderPlace', function(data) {

    let orderClass = "";
    if (data.orderType == "buy")
      orderClass = "bg-lime-lt";
    else
      orderClass = "bg-red-lt";

    let newRow = "";
    let status = "";
    let orderTime = new Date(data.order.timestamp).toLocaleTimeString([], {
      hour12: false
    });

    if (data.success) {
      newRow = `<tr>
      <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType}</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
      <td data-label="Price" class="text-muted yright"><div>${(data.order.price).toFixed(8)}</div></td>
      <td data-label="Amount" class="text-muted yright"><div>${(data.order.amount).toFixed(8)}</div></td>
      <td data-label="Cost" class="text-muted yright"><div>${(data.order.cost).toFixed(8)}</div></td>
      <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
    </tr>`;
    } else {
      newRow = `<tr>
      <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType}</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
      <td data-label="Message" colspan="3" class="text-muted small "><div>${data.error}, <br>ych.nnum: ${ych.nnum}, <br><span class="buftext"><b>Bot buftext:</b> ${buftextBot}</span></div></td>
      <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
    </tr>`;
    }

    addBotLogRow(newRow);
  });


  dexyBot.on('orderCancel', function(data) {


    let orderClass = ""
    if (data.orderType == "buy")
      orderClass = "bg-lime-lt";
    else
      orderClass = "bg-red-lt";

    let newRow = "";
    let status = "";
    let orderTime = new Date(data.order.timestamp).toLocaleTimeString([], {
      hour12: false
    });
    if (data.success)
      newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType} cancel</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
                    <td data-label="Price" class="text-muted yright"><div>${(data.order.price).toFixed(8)}</div></td>
                    <td data-label="Amount" class="text-muted yright"><div>${(data.order.amount).toFixed(8)}</div></td>
                    <td data-label="Cost" class="text-muted yright"><div>${(data.order.cost).toFixed(8)}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
                </tr>`;
    else {
      newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType} cancel</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
                    <td data-label="Message" colspan="3" class="text-muted small "><div>${data.error}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
                </tr>`;
    }

    addBotLogRow(newRow);

  });


  // Function to compare start time and end time for Interval Periods
  function compareTime2(startInput, endInput) {
    var startTimeValue = $(startInput).val();
    var endTimeValue = $(endInput).val();
    var startTime = new Date("2000-01-01 " + startTimeValue);
    var endTime = new Date("2000-01-01 " + endTimeValue);

    var isInRange = startTimeValue && endTimeValue && startTime < endTime;
    var $inputs = $(startInput).add(endInput);
    var $tooltip = $inputs.next('.invalid-tooltip');

    //console.log('isInRange: ', isInRange, ' | startTime: ', startTime, ' | endTime: ', endTime);
    $inputs.removeClass('border-danger border-success');
    $inputs.addClass(isInRange ? 'border-success' : 'border-danger');
    $tooltip.css('display', isInRange ? 'none' : 'block');

    return isInRange;
  }
  function compareTime3(startInput, endInput) {
  const startTimeValue = $(startInput).val();
  const endTimeValue = $(endInput).val();

  const currentTime = new Date();
  const startTime = new Date(`2000-01-01 ${startTimeValue}`);
  const endTime = new Date(`2000-01-01 ${endTimeValue}`);

  const isStartTimeValid = startTimeValue && !isNaN(startTime.getTime());
  const isEndTimeValid = endTimeValue && !isNaN(endTime.getTime());
  const isInRange = isStartTimeValid && isEndTimeValid && startTime < endTime &&
    (startTime.getHours() >= currentTime.getHours()  && startTime.getMinutes() >= currentTime.getMinutes());

  const $inputs = $(startInput).add(endInput);
  const $tooltip = $inputs.next('.invalid-tooltip');

  $inputs.removeClass('border-danger border-success')
    .addClass(isInRange ? 'border-success' : 'border-danger');
  $tooltip.css('display', isInRange ? 'none' : 'block');

  return isInRange;
}
function compareTime(startInput, endInput) {
  const startTimeValue = $(startInput).val();
  const endTimeValue = $(endInput).val();

  const startTime = new Date(`2000-01-01 ${startTimeValue}`);
  const endTime = new Date(`2000-01-01 ${endTimeValue}`);

  const isInRange = startTimeValue && endTimeValue &&
    startTime < endTime &&
    startTime.getHours() * 60 + startTime.getMinutes() >= new Date().getHours() * 60 + new Date().getMinutes();

  const $inputs = $(startInput).add(endInput);
  const $tooltip = $inputs.next('.invalid-tooltip');

  $inputs.removeClass('border-danger border-success')
    .addClass(isInRange ? 'border-success' : 'border-danger');
  $tooltip.css('display', isInRange ? 'none' : 'block');

  return isInRange;
}





  $(document).on('focus click', '[data-bot="intervalPeriod"] .datetime', function() {
    var timePicker = $(this);

    console.log('timePicker: ', timePicker);
    if (!timePicker.data('timepicker')) {

      //if (!timePicker.hasClass('easy-timepicker')) {
      //date time picker settings
      var today = new Date();
      var h = today.getHours().toString();
      h = h.padStart(2, '0');
      var m = today.getMinutes().toString();
      m = m.padStart(2, '0');

      $(this).timepicker({
        //minTime: h + ':' + m,
        defaultTime: 'now',   // Set the default time to 'now' (current time), or HH:mm
        //minuteIncrement: 5, // Increment minutes by 5
        //hourIncrement: 1 // Increment hours by 2
      });
      console.log('add timepicker, minTime: - ' + h + ':' + m);

      // Set the custom data attribute to mark the attachment
      timePicker.data('timepicker', true);
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
    newInterval.find('[data-bot="intervalStart"]').val('').removeClass('border-danger border-success').next('.invalid-tooltip').css('display', 'none');
    newInterval.find('[data-bot="intervalEnd"]').val('').removeClass('border-danger border-success').next('.invalid-tooltip').css('display', 'none');


    newInterval.find('[data-bot="interval-add"]').attr('data-bot', 'interval-remove').html('-').removeClass('btn-outline-info').addClass('btn-outline-secondary');


  });

  //Remove extra Interval
  $("body").on("click", '#intervalPeriod [data-bot="interval-remove"]', function(e) {
    $(this).parent().parent().remove();
  });

/*
  $('body').on('change', '#intervalPeriod .datetime', function(e) {

    //console.log('changeTime triggered ');

    const startOrEndTime = $(this).attr('data-bot'); // Get the selected time element attribute
    const inputValue = $(this).val(); // Get the selected input value
    const inputTime = new Date('1970-01-01T' + inputValue + ':00'); // Convert input value to a Date object

    //input elements for start- and endtime
    const startTimeElement = $(this).parent().parent().parent().find('[data-bot="intervalStart"]');
    const endTimeElement = $(this).parent().parent().parent().find('[data-bot="intervalEnd"]');
    let startTime, endTime, updatedTime;

    if (startOrEndTime === 'intervalStart') {
      startTime = inputTime;

      var endTimeValue = endTimeElement.val(); // Get the end-time value

      endTime = new Date('1970-01-01T' + endTimeValue + ':00'); // Convert end-time value to a Date object

      if (endTimeValue == '')
        endTime = startTime;

      if (endTime <= startTime) {
        // Add 1 hour to the end-time
        endTime.setHours(startTime.getHours() + 1);
        endTime.setMinutes(startTime.getMinutes());

        // Format the updated time as "HH:mm"
        updatedTime = ('0' + endTime.getHours()).slice(-2) + ':' + ('0' + endTime.getMinutes()).slice(-2);

        // Update the end-time input value
        //endTimeElement.val(updatedTime);

      }
    } else {
      endTime = inputTime;

      var startTimeValue = startTimeElement.val(); // Get the start-time value

      startTime = new Date('1970-01-01T' + startTimeValue + ':00'); // Convert start-time value to a Date object

      if (startTimeValue == '')
        startTime = endTime;

      if (startTime >= endTime) {
        // Subtract 1 hour from the start-time
        startTime.setHours(endTime.getHours() - 1);
        startTime.setMinutes(endTime.getMinutes());

        // Format the updated time as "HH:mm"
        updatedTime = ('0' + startTime.getHours()).slice(-2) + ':' + ('0' + startTime.getMinutes()).slice(-2);

        // Update the start-time input value
        // startTimeElement.val(updatedTime);
      }
    }

    // Extract the time portion of the current datetime for comparison
    var currentDateTime = new Date();
    var currentHour = currentDateTime.getHours();
    var currentMinute = currentDateTime.getMinutes();

    // Check if startTime is lower than current time + 1 minute
    if (startTime.getHours() < currentHour || (startTime.getHours() === currentHour && startTime.getMinutes() < currentMinute + 1)) {
      console.log("Interval Period - Error: Start time cannot be lower than the Current time plus 1 minute.");

      // Format the current time as "HH:mm"+1min
      updatedTime = currentHour + ':' + (currentMinute + 1);
      // Update the start-time input value
      //startTimeElement.val(updatedTime);

    }

    // Check if endTime is lower than startTime, if so add 1 hour to endTime
    if (endTime.getHours() < startTime.getHours() || (endTime.getHours() === startTime.getHours() && endTime.getMinutes() < startTime.getMinutes() + 1)) {
      console.log("Interval Period - Error: End time cannot be lower than the Start time or Current time plus 5 minute.");

      // Format the current time as "HH:mm"+5min
      updatedTime = currentHour + ':' + (currentMinute + 6);
      // Update the start-time input value
      // endTimeElement.val(updatedTime);

    }

  });
  */


  // Hide dropdown after item click
  $('.dropdown-menu .dropdown-item').on('click', function() {
    $(this).parent().removeClass('show');
  });

  //Close a Bootstrap modal when a specific element within the modal, such as an <a> tag with the class nav-link, is clicked
  $(document).on('click', '.modal a.nav-link', function() {
    $('.modal').modal('hide');
  });



}); //<<JQuery ?



/*loader/spinner*/
$(window).on('load', function() {
  setTimeout(function() {
    $('#preloader').velocity({
      opacity: 0.1,
      translateY: "-80px"
    }, {
      duration: 400,
      complete: function() {
        $('#hola').velocity({
          translateY: "-100%"
        }, {
          duration: 1000,
          easing: [0.7, 0, 0.3, 1],
          complete: function() {
            $('.page-wrapper').addClass('animate-border divide');
          }
        })
      }
    })
  }, 1000)
});