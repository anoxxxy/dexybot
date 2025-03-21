$(function() {
  'use strict';


  //init dexyspa router
  xybot.dexySPA = {};
  
  $('.dexybot_version').text('v' + xybot.version);


  

  //init vars
  //list of crypto icons
  xybot.vars.assetInfo = [
    { name: "Bitcoin", ticker: "BTC", icon: "bitcoin-btc-logo.svg", slug: ["btc", "tbtc"] },
    { name: "Bitcoin Cash", ticker: "BCH", icon: "bitcoin-cash-bch-logo.svg", slug: ["bch", "tbch", "tbch2"] },
    { name: "BitBay", ticker: "BAY", icon: "bitbay-bay-logo.svg", slug: ["bay", "tbay"] },
    { name: "BitBayR", ticker: "BAYR", icon: "bitbay-bay-logo.svg", slug: ["bayr"] },
    { name: "BitBayF", ticker: "BAYF", icon: "bitbay-bay-logo.svg", slug: ["bayf"] },
    { name: "Blackcoin", ticker: "BLK", icon: "blackcoin-blk-logo.svg", slug: ["blk", "tblk", "tblk2"] },
    { name: "Litecoin", ticker: "LTC", icon: "litecoin-ltc-logo.svg", slug: ["ltc", "tltc"] },
    { name: "Ethereum", ticker: "ETH", icon: "ethereum-eth-logo.svg", slug: ["eth", "teth", "teth1", "teth2", "teth3", "teth4", "goerli", "rinkeby"] },
    { name: "BlackCoin", ticker: "BLK", icon: "blackcoin-blk-logo.svg", slug: ["blk", "tblk"] },
    { name: "Dai", ticker: "DAI", icon: "dai-dai-logo.svg", slug: ["dai", "tdai2", "tdai3", "tdai4"] },
    { name: "Matic", ticker: "MATIC", icon: "polygon-matic-logo.svg", slug: ["polygon", "matic", "pol", "mat"] },
    { name: "", ticker: "", icon: "empty.svg", slug: ["", "", ""] },  //only for assets where no slug is found...
  ];



  // Function to search for a slug match
  xybot.getAssetData = function(slug) {

    if (!slug || slug.trim() === "") {
      return null; // Return null if the slug is empty or only whitespace
    }

    for (let i = 0; i < xybot.vars.assetInfo.length; i++) {
      const asset = xybot.vars.assetInfo[i];
      if (asset.slug.includes(slug.toLowerCase())) {
        return asset;
      }
    }

    // If no match found, add a new asset with provided slug
    const newAsset = {
      name: slug,
      ticker: slug,
      icon: "empty.svg",
      slug: [slug] // Add the provided slug to the new asset's slug array
    };

    xybot.vars.assetInfo.push(newAsset); // Add the new asset to xybot.vars.assetInfo array
    return newAsset;
  };

  


  /* Mikado Templates */

  //observable Mikado array
  xybot.vars.mikado.marketOverall = Mikado.array();   //[0] contains = ({highestVolumeMarketOverall, lowestVolumeMarketOverall});

  const containerTplMarketOverall = document.getElementById("marketOverall");
  const marketOverallTpl = `<div class="row g-3 mt-2 mb-3 d-flex justify-content-center">
  

  <div>{{ console.log('datastate marketOverall:', data) }}</div>
  
    <div class="col-xl-4 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h5 font-semibold text-muted text-sm d-block mb-2">Highest Volume - {{= data.highestVolumeMarketOverall.coina  + '/' +  data.highestVolumeMarketOverall.coinb}}</span>
              
              <a class="stretched-link nav-link" href="#trade/{{= data.highestVolumeMarketOverall.name}}" data-page-link="trade/{{= data.highestVolumeMarketOverall.name}}">
                <div class="h3 font-bold mb-0 d-flex flex-row">{{#= data.highestVolumeMarketOverall.xy.volusd }} </div>
              </a>
            </div>
            <div class="col-auto">
              <img class="icon icon32" src="./assets/images/crypto/{{=data.highestVolumeMarketOverall.xy.icon}}">
            </div>
          </div>
          <div class="mt-1 mb-0 text-sm d-flex justify-content-end">
            <span class="text-nowrap fs-4 text-muted">Price</span>
            <div class="badge bg-info-lt ms-2 fs-4 font-bold ">
              <span>{{#= data.highestVolumeMarketOverall.xy.price }}</span> <span class="text-muted ms-1">{{= data.highestVolumeMarketOverall.coinb  }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-4 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h5 font-semibold text-muted text-sm d-block mb-2">Lowest Volume - {{ data.lowestVolumeMarketOverall.coina + '/' +  data.lowestVolumeMarketOverall.coinb}} </span>
              

              <a class="stretched-link nav-link" href="#trade/{{= data.lowestVolumeMarketOverall.name}}" data-page-link="trade/{{= data.lowestVolumeMarketOverall.name}}">
                <div class="h3 font-bold mb-0 d-flex flex-row">{{#= data.lowestVolumeMarketOverall.xy.volusd }} </div>
              </a>


            </div>
            <div class="col-auto">
              <img class="icon icon32" src="./assets/images/crypto/{{=data.lowestVolumeMarketOverall.xy.icon}}">
            </div>
          </div>
          <div class="mt-1 mb-0 text-sm d-flex justify-content-end">
            <span class="text-nowrap fs-4 text-muted">Price</span>
            <div class="badge bg-info-lt ms-2 fs-4 font-bold ">
              <span>{{#= data.lowestVolumeMarketOverall.xy.price }}</span> <span class="text-muted ms-1">{{= data.lowestVolumeMarketOverall.coinb  }}</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <div class="col-xl-4 col-sm-6 col-12">
      <div class="card shadow border-0">
        <div class="card-body">
          <div class="row">
            <div class="col">
              <span class="h5 font-semibold text-muted text-sm d-block mb-2">Newly Listed - {{= data.lastAddedMarkets.coina  + '/' +  data.lastAddedMarkets.coinb}}</span>
              
              <a class="stretched-link nav-link" href="#trade/{{= data.lastAddedMarkets.name}}" data-page-link="trade/{{= data.lastAddedMarkets.name}}">
                <div class="h3 font-bold mb-0 d-flex flex-row">{{#= data.lastAddedMarkets.xy.price }} 
                  <span class="text-muted ms-1">{{= data.lastAddedMarkets.coinb  }}</span>
                </div>
              </a>
            </div>
            <div class="col-auto">
              <img class="icon icon32" src="./assets/images/crypto/{{=data.lastAddedMarkets.xy.icon}}">
            </div>
          </div>
          <div class="mt-1 mb-0 text-sm d-flex justify-content-end">
            <span class="text-nowrap fs-4 text-muted">Volume 7D</span>
            <div class="badge bg-warning-lt ms-2 fs-4 font-bold ">
              <span>{{#= data.lastAddedMarkets.xy.volusd }}</span> <span class="text-muted ms-1">{{= data.lastAddedMarkets.coinb  }}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

  </div>`;
  const marketOverallTplC = Mikado.compile(marketOverallTpl);
  //xybot.vars.mikado.marketOverallView = Mikado(containerTplMarketOverall, marketOverallTplC, { store: xybot.vars.mikado.marketOverall });
  xybot.vars.mikado.marketOverallView = Mikado(containerTplMarketOverall, marketOverallTplC, { 
    on: {
            create: function(node) {
              console.log("marketOverallView - created:", node);
            },
            insert: function(node) {
              console.log("marketOverallView - inserted:", node);
            },
            update: function(node) {
              console.log("marketOverallView - updated:", node);
            },
            change: function(node) {
              console.log("marketOverallView - changed:", node);
            },
            remove: function(node) {
              console.log("marketOverallView - removed:", node);
            },
            cache: true,
            //store: xybot.vars.mikado.marketOverall
          }
           });
           

/*
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

        -------------------------
        */
var ice = [{ name: 'Jane Doe' },{ name: 'Kalle Doe' },{ name: 'Balle Doe' },{ name: 'Jane Miauu' }];

xybot.vars.mikado.arrayMikado = Mikado.array(ice);


const target22 = document.getElementById('template22');
const template22 = `
<ul>
    <li>{{ data.name }}</li>
</ul>
`;

const template22C = Mikado.compile(template22);
const view22 = Mikado(target22, template22C, { store: xybot.vars.mikado.arrayMikado });


xybot.vars.mikado.arrayMikado.push({ name: 'Jane Doe 111' });
xybot.vars.mikado.arrayMikado.push({ name: 'Jane Doe222' });
xybot.vars.mikado.arrayMikado[0] = {name: "kalle aaaaaaaaaaaaaaa3333"}


/* Mikado State Template demo*/

let minState = 'anoxxxy';
const containerState = document.getElementById('template22state');
const tplState = `
<ul>
    <li>{{ data.name }}</li>
    <li>{{ console.log('datastate:', data) }}</li>
    <li>{{ console.log('state:', this.state) }}</li>
    <li>state: {{ this.state.user }}</li>
</ul>
`;

const tplStateC = Mikado.compile(tplState);
xybot.view.tmpState = Mikado(containerState, tplStateC, {
          on: {
            create: function(node) {
              console.log("tmpState - created:", node);
            },
            insert: function(node) {
              console.log("tmpState - inserted:", node);
            },
            update: function(node) {
              console.log("tmpState - updated:", node);
            },
            change: function(node) {
              console.log("tmpState - changed:", node);
            },
            remove: function(node) {
              console.log("tmpState - removed:", node);
            },
            cache: true,
            state: minState
          }
        });

xybot.view.tmpState.state.user = 'anoxxxxxy1';
xybot.view.tmpState.render({ name: 'Jane Doe222' });
/*
xybot.view.tmpState.state.user = 'anoxxxxxy2';
xybot.view.tmpState.refresh();
xybot.view.tmpState.render({ name: 'Jane MineName' });
xybot.view.tmpState.state.user = 'aaaaa9';
xybot.view.tmpState.refresh();
*/
  //Mikado Markets Table Template




const tplMarkets = `<div for="data.markets">
  <div>
<h2 style="position: absolute;margin-top: 5px;"><div class="badge bg-purple-lt d-flex"><img src="./assets/images/crypto/{{=data.icon}}" class="icon icon28 me-1"> {{= data.title }} </div> </h2>
<div id="markets-{{= data.name }}" class="mb-3">
  <div class="table-responsive" >
    <div data-marketss="">
    <table class="table table-theme table-row v-middle">
      <thead>
        <tr>
          <th class="text-muted" ></th>
          <th class="text-muted text-end" data-market="volume" >Volume 7D</th>
          <th class="text-muted yright" data-market="ext_price" style="width:130px"><span title="Coinmarketcap Price" data-bs-toggle="tooltip" data-bs-placement="top">CMC Price</span></th>
          <th class="text-muted yright pe-3" data-market="price" style="width:130px">Price</th>
        </tr>
      </thead>
      <tbody for="data.market">
        <tr class="position-relative" >
          <td>
            <div class="d-flex" >
              <div>
                <a href="#trade/{{= data.name}}" class="d-flex align-items-center stretched-link nav-link" data-page-link="trade/{{= data.name}}">
                  <span class="text-uppercase me-2"><img src="./assets/images/crypto/{{=data.xy.icon}}" class="icon icon24"></span> {{= data.coina }} <span class="text-muted">/{{= data.coinb }}</span>
                </a>
              </div>
              <div class="fs-4 d-flex flex-row">
                <div> {{#= data.xy.open }} </div>
                <div class="ps-2 d-flex flex-row" data-market="volume_sm"><div class="m-0 p-0 text-muted">Vol: </div> <div class="m-0 p-0 ps-1">{{#= data.xy.volusd }}</div></div>
              </div>
            </div>
          </td>
          <td class="text-end" data-market="volume">
            <div>{{#= data.xy.volusd }}</div>
          </td>
          <td class="yright" data-market="ext_price">
            <span class="badge bg-info-lt">{{#= data.xy.extprice}}</span>
          </td>
          
          <td class="yright pe-3" data-market="price"><div>{{#= data.xy.price }}</div> <div class="text-muted fs-5">{{#= data.xy.priceusd }}</div></td>
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

  
        xybot.vars.mikado.groupedMarketPairs = {
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
              //console.log("viewMarketsTable - created:", node);
            },
            insert: function(node) {
              //console.log("viewMarketsTable - inserted:", node);
            },
            update: function(node) {
              //console.log("viewMarketsTable - updated:", node);
            },
            change: function(node) {
              //console.log("viewMarketsTable - changed:", node);
            },
            remove: function(node) {
              //console.log("viewMarketsTable - removed:", node);
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

/*Mikado User Orders Page*/
/*
        const tplUserOrdersTmp = 
        `<div>
        <div>{{ data.index }}, 
        {{ data.side }}, 
        {{ data.coina }}, 
        {{data.coinb}}, 
        {{data.date}}, 
        {{data.price}}, 
        {{data.inita}}, 
        {{data.filleda}},   
        {{data.initb}}, 
        {{data.filledfeeb}}
        </div>
        </div>`;

        const tplUserOrders34 = `
    <tr scope="row" class="">
      <td data-order="check" scope="row">
          <input class="form-check-input" type="checkbox">
      </td>
      <td data-order="id" data-sort="{{= data.index}}">
        {{= data.index}} 
      </td>
      <td data-order="date" data-sort="{{= data.date}}">
        {{= data.xy.date}}
      </td>
      <td data-order="market">
        <a href="#trade/{{= data.coina +'-'+data.coinb}}">{{= data.coina +'/'+data.coinb}}</a>
      </td>
      <td data-order="side" data-sort="{{= data.side}}">
        {{= data.side}}
      </td>
      <td data-order="price" data-sort="{{= data.price }}">
        {{#= data.xy.price }}
        <small class="d-block">{{#= data.xy.priceusd }}</small>
      </td>
      <td data-order="amount" data-sort="{{= data.inita}}">
        {{#= data.xy.inita}}
      </td>
      <td data-order="filled" data-sort="{{= data.filleda}}">
        {{#= data.xy.filleda}}
      </td>
      <td data-order="cancel">
        <button type="button" class="btn-close"></button>
      </td>
    </tr>

  `;
  */

  const tplUserOrders = `
    <div class="d-flex flex-row flex-tr py-2" table-sort-row>
    <div class="d-flex flex-column flex-fill ">
      <div class="d-flex flex-row " table-sort-cells>
        <div class="flex-cell" data-order="check">
          <input class="form-check-input" type="checkbox">
        </div>
        <div class="flex-cell" data-order="id" data-sort="{{= data.index}} ">
        {{= data.index}}
        <small class="d-block" data-bs-toggle="collapse" data-bs-target="#{{= data._id}}" aria-expanded="false" aria-controls="{{= data._id}}"><span class="me-1">Details</span> <i class="ti ti-arrow-big-right-filled"></i></small>
        </div>
        <div class="flex-cell" data-order="date" data-sort="{{= data.date}}">{{#= data.xy.date}}</div>
        <div class="flex-cell" data-order="market">
          <a href="#trade/{{= data.coina +'-'+data.coinb}}">{{= data.coina +'/'+data.coinb}}</a>
        </div>
        <div class="flex-cell text-start" data-order="side" data-sort="{{= data.side}}">{{= data.side}}</div>
        <div class="flex-cell" data-order="price" data-sort="{{= data.price}}">
          {{#= data.xy.price }}
          <small class="d-block">{{#= data.xy.priceusd }}</small>
        </div>
        <div class="flex-cell" data-order="amount" data-sort="{{= data.inita}}">
          {{#= data.xy.inita}}
        </div>
        <div class="flex-cell" data-order="filled" data-sort="{{= data.filleda}}">
          {{#= data.xy.filleda}}
        </div>
        <div class="flex-cell" data-order="cancel">
          <button type="button" class="btn-close" data-order-index="{{=data.index}}" data-order-side="{{=data.side}}" data-order-coina="{{=data.coina}}" data-order-coinb="{{=data.coinb}}"></button>
        </div>
      </div>
      <div class="flex-fill p-2 collapse" id="{{= data._id}}">
        This will be adapted for mobile view later on ... cheers :)
      </div>
      </div>
  </div>`;


        /*
        `<div>
        {{data.index}}, 
        {{data.coina}}, 
        {{data.coinb}}, 
        {{data.date}}, 
        {{data.price}}, 
        {{data.inita}}, //amount to buy/sell
        {{data.filleda}},   //amount filled
        {{data.initb}}, initb + feeb = cost (for buy orders)
        {{data.filledfeeb}}, filledfeeb = feecost
        </div>`;

        //for sell orders: fee paid "filledfeea", total cost in fees: "feea"
        */

        const containerUserOrders = document.getElementById("userOrders");
        const tplUserOrdersC = Mikado.compile(tplUserOrders);
        xybot.view.viewUserOrders = Mikado(containerUserOrders, tplUserOrdersC, {
          on: {
            create: function(node) {
              //console.log("viewUserOrders - created:", node);
            },
            insert: function(node) {
              //console.log("viewUserOrders - inserted:", node);
            },
            update: function(node) {
              //console.log("viewUserOrders - updated:", node);
            },
            change: function(node) {
              //console.log("viewUserOrders - changed:", node);
            },
            remove: function(node) {
              //console.log("viewUserOrders - removed:", node);
            },
            cache: false,
          }
        });




/*Mikado User Orders Page*/


  const tplUserWithdrawals = `
    <div class="d-flex flex-row flex-tr py-2" table-sort-row>
    <div class="d-flex flex-column flex-fill ">
      <div class="d-flex flex-row " table-sort-cells>
        
        <div class="flex-cell" data-order="id" data-sort="{{= data.uidx}} ">
          {{= data.uidx}}
          <small class="d-block" data-bs-toggle="collapse" data-bs-target="#withdrawal-id-{{= data.uidx}}" aria-expanded="false" aria-controls="withdrawal-id-{{= data.uidx}}"><span class="me-1">Details</span> <i class="ti ti-arrow-big-right-filled"></i></small>
        </div>

        <div class="flex-cell" data-order="date" data-sort="{{= data.time.done}}"><span class="text-muted fs-5">{{#= data.xy.date}}</span></div>
        <div class="flex-cell text-start" data-order="txid" data-sort="{{= data.txid}}">
          {{#= data.xy.txid_link}}
          <small class="d-block">{{#= data.xy.addr_link }}</small>
        </div>
        <div class="flex-cell text-end" data-order="amount" data-sort="{{= data.vals.amount}}">
          {{#= data.xy.amount }}
          <small class="d-block text-end">{{#= data.xy.usdvalue }}</small>
        </div>
        
        <div class="flex-cell ms-2" data-order="asset" data-sort="{{= data.coin}}">
          <a href="javascript:void(0)">{{= data.coin}}</a> <img class="icon icon24 ms-2" title="{{= data.coin}}" alt="{{= data.coin}}" src="./assets/images/crypto/{{=data.xy.icon}}">
        </div>
        <div class="flex-cell text-end" data-order="status" data-sort="{{= data.status}}">
          {{#= data.xy.status}}
        </div>
      </div>
      <div class="flex-fill p-2 collapse" id="withdrawal-id-{{= data.uidx}}">
        This will be adapted for mobile view later on ... cheers :)
      </div>
      </div>
  </div>`;


        const containerUserWithdrawals = document.getElementById("userWithdrawals");
        const tplUserWithdrawalsC = Mikado.compile(tplUserWithdrawals);
        xybot.view.viewUserWithdrawals = Mikado(containerUserWithdrawals, tplUserWithdrawalsC, {
          on: {
            create: function(node) {
              //console.log("viewUserWithdrawals - created:", node);
            },
            insert: function(node) {
              //console.log("viewUserWithdrawals - inserted:", node);
            },
            update: function(node) {
              //console.log("viewUserWithdrawals - updated:", node);
            },
            change: function(node) {
              //console.log("viewUserWithdrawals - changed:", node);
            },
            remove: function(node) {
              //console.log("viewUserWithdrawals - removed:", node);
            },
            cache: true,
          }
        });


  const tplUserDeposits = `
    <div class="d-flex flex-row flex-tr py-2" table-sort-row>
    <div class="d-flex flex-column flex-fill ">
      <div class="d-flex flex-row " table-sort-cells>
        
        <div class="flex-cell" data-order="id" data-sort="{{= data.index}} ">
          {{= data.index}}
          <small class="d-block" data-bs-toggle="collapse" data-bs-target="#withdrawal-id-{{= data.index}}" aria-expanded="false" aria-controls="withdrawal-id-{{= data.index}}"><span class="me-1">Details</span> <i class="ti ti-arrow-big-right-filled"></i></small>
        </div>

        <div class="flex-cell" data-order="date" data-sort="{{= data.date}}"><span class="text-muted fs-5">{{#= data.xy.date}}</span></div>
        <div class="flex-cell text-start" data-order="txid" data-sort="{{= data.txid}}">
          {{#= data.xy.txid_link}}
          <small class="d-block">{{#= data.xy.addr_link }}</small>
        </div>
        <div class="flex-cell text-end" data-order="amount" data-sort="{{= data.amount}}">
          {{#= data.xy.amount }}
          <small class="d-block text-end">{{#= data.xy.usdvalue }}</small>
        </div>
        
        <div class="flex-cell ms-2" data-order="asset" data-sort="{{= data.coin}}">
          <a href="javascript:void(0)">{{= data.coin}}</a> <img class="icon icon24 ms-2" title="{{= data.coin}}" alt="{{= data.coin}}" src="./assets/images/crypto/{{=data.xy.icon}}">
        </div>
        <div class="flex-cell text-end" data-order="status" data-sort="{{= data.status}}">
          {{#= data.xy.status}}
        </div>
      </div>
      <div class="flex-fill p-2 collapse" id="withdrawal-id-{{= data.index}}">
        This will be adapted for mobile view later on ... cheers :)
      </div>
      </div>
  </div>`;


        const containerUserDeposits = document.getElementById("userDeposits");
        const tplUserDepositsC = Mikado.compile(tplUserDeposits);
        xybot.view.viewUserDeposits = Mikado(containerUserDeposits, tplUserDepositsC, {
          on: {
            create: function(node) {
              console.log("viewUserDeposits - created:", node);
            },
            insert: function(node) {
              console.log("viewUserDeposits - inserted:", node);
            },
            update: function(node) {
              console.log("viewUserDeposits - updated:", node);
            },
            change: function(node) {
              console.log("viewUserDeposits - changed:", node);
            },
            remove: function(node) {
              console.log("viewUserDeposits - removed:", node);
            },
            cache: true,
          }
        });



/*Mikado - selectMenuMarketPairs*/
        const tplMenuMarkets = 
        `<div class="item" data-select-market="{{data.coina+'-'+data.coinb}}"  data-value="{{=data.coina +','+ data.coinb+','+data.name+','+data.xy.icon}}" data-base="{{=data.coinb}}" data-select-market-menu="{{=data.coina +','+ data.coinb+','+data.name+','+data.xy.icon+','+data.xy.iconb}}">
              <div>
                <a href="#trade/{{=data.name}}" class="stretched-link">
                  <img src="./assets/images/crypto/{{=data.xy.icon}}"> 
                  <span class="coina">{{=data.coina}}</span><span class="text-muted fw-normal coinb">/{{=data.coinb}}</span>
                  </div>
                  <div class="d-flex flex-column text-end fs-4">
                    <div class="flex flex-row"><span class="fw-bold">{{#=data.xy.price}}</span> <span class="text-muted">{{=data.coinb}}<span></div>
                  </div>
                </a>
              </div>
            </div>`;

        const containerMenuMarkets = document.getElementById("selectMenuMarketPairs");
        const tplMenuMarketsC = Mikado.compile(tplMenuMarkets);
        xybot.view.viewMenuMarkets = Mikado(containerMenuMarkets, tplMenuMarketsC, {
          on: {
            create: function(node) {
              //console.log("viewMenuMarkets - created:", node);
            },
            insert: function(node) {
              //console.log("viewMenuMarkets - inserted:", node);
            },
            update: function(node) {
              //console.log("viewMenuMarkets - updated:", node);
            },
            change: function(node) {
              //console.log("viewMenuMarkets - changed:", node);
            },
            remove: function(node) {
              //console.log("viewMenuMarkets - removed:", node);
            },
            cache: true,
          }
        });

        

/*Mikado  - selectMenuMarketData*/
const tplMenuMarketsData = `
<div class="row">
  <div class="col-md-auto">
    <div class="row">
      <div class="col-6 col-md-auto mb-2">
        <div class="data-item">
          <div class="data-title text-muted">Last price</div>
          <div class="data-value fs-4 text-success">{{#=data.xy.price}} {{=data.coinb}}</div>
        </div>
      </div>
      <div class="col-6 col-md-auto ps-4">
        <div class="data-item text-end">
          <div class="data-title text-muted">7D Volume</div>
          <div class="fs-4 ">{{#=data.xy.volusd}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-auto ps-md-4 mb-3">
    <div class="row">
      <div class="col-6 col-md-auto">
        <div class="data-item">
          <div class="data-title text-muted">CMC Price</div>
          <div class="fs-4 text-info">{{#=data.xy.extprice}} {{=data.coinb}}</div>
        </div>
      </div>
      <div class="col-6 col-md-auto ps-4">
        <div class="data-item text-end">
          <div class="data-title text-muted">Status</div>
          <span class="fs-4">{{#=data.xy.open}} </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
const containerMenuMarketsData = document.getElementById("selectMenuMarketData");
        const tplMenuMarketsDataC = Mikado.compile(tplMenuMarketsData);
        xybot.view.viewMenuMarketsData = Mikado(containerMenuMarketsData, tplMenuMarketsDataC, {
          on: {
            create: function(node) {
              console.log("viewMenuMarketsData - created:", node);
            },
            insert: function(node) {
              console.log("viewMenuMarketsData - inserted:", node);
            },
            update: function(node) {
              console.log("viewMenuMarketsData - updated:", node);
            },
            change: function(node) {
              console.log("viewMenuMarketsData - changed:", node);
            },
            remove: function(node) {
              console.log("viewMenuMarketsData - removed:", node);
            },
            cache: false,
          }
        });

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
        /*
        xybot.vars.mikado.groupedMarketPairs.btcData.price = "$" + response.market_data.current_price.usd.toFixed(2);
        xybot.vars.mikado.groupedMarketPairs.btcData.daily = setBadgeColor($("#btc-daily-change"), dailyChange);;
        xybot.vars.mikado.groupedMarketPairs.btcData.weeklyChange = setBadgeColor($("#btc-weekly-change"), weeklyChange);;
        xybot.vars.mikado.groupedMarketPairs.btcData.monthlyChange = setBadgeColor($("#btc-monthly-change"), monthlyChange);;
        xybot.vars.mikado.groupedMarketPairs.btcData.yearlyChange = setBadgeColor($("#btc-yearly-change"), yearlyChange);;
        xybot.vars.mikado.groupedMarketPairs.btcData.marketCap = "$" + formatMarketCapValue(btcMarketCap, 0);
        */

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

  



  //Mikado Balance Table Template
  const tplBalancesTable = `

<tr data-balance="{{= data.coin}}">
        <td data-sort="{{= data.coin}}" data-balance="asset_name">{{= data.coin}}</td>
        <td data-sort="{{= data.sum}}" data-balance="sum">{{#= data.sum_format}}</td>
        <td data-sort="{{= data.usd}}" data-balance="usd">{{#= data.usd_format}}</td>
        <td data-sort="{{= data.free}}" data-balance="free">{{#= data.free_format}}</td>
        <td data-sort="{{= data.inorders}}" data-balance="orders">{{#= data.inorders_format}}</td>
        <td data-sort="{{= data.depositing}}" data-balance="depositing">{{#= data.depositing_format}}</td>
        <td data-sort="{{= data.withdraws}}" data-balance="withdraws">{{#= data.withdraws_format}}</td>
        <td ><a href="#deposit/{{= data.coin}}" class="btn btn-sm btn-lime mb-1">Deposit</a> <br><a href="#withdraw/{{= data.coin}}" class="btn btn-sm  btn-cyan">Withdraw</a></td>
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
      cache: true,
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
      cache: true,
    }
  });


//Mikado Market Trades History template
  const tplMarketTrades = `
  <div class="entryContainer" title="Order cost: {{=(data.xy.cost).toFixed(8) + ' ' + (data.coinb)}}" data-bs-toggle="tooltip" data-bs-placement="top">
    <div class="leftLabelCol">
      <span class="entryTextPre">{{#=data.xy.direction}}</span> 
      <span class="entryText">{{=data.xy.price}}</span>
    </div>
    <div class="centerLabelCol">
      <span class="entryBuyText text-lime">{{=(data.xy.qty).toFixed(4)}}</span>
    </div>
    <div class="rightLabelCol">
      <span class="entryText">{{=data.xy.time}}</span>
    </div>
  </div>
`;

  //Mikado Bid OrderBook compile template
  var tplMarketTradesC = Mikado.compile(tplMarketTrades);

  //set the container for the view
  // Mount a DOM element to Mikado and render the template with data, set the options as well
  const containerMarketTrades = document.getElementById('marketTradeHistory');
  const viewMarketTrades = new Mikado(containerMarketTrades, tplMarketTradesC, {
    on: {
      create: function(node) {
        //console.log("viewMarketTrades - created:", node);
      },
      insert: function(node) {
        //console.log("viewMarketTrades - inserted:", node);
      },
      update: function(node) {
        //console.log("viewMarketTrades - updated:", node);
      },
      change: function(node) {
        //console.log("viewMarketTrades - changed:", node);
      },
      remove: function(node) {
        //console.log("viewMarketTrades - removed:", node);
      },
      cache: true,
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
  

  //sort market and its pairs on it base market, find high and low volumes..
  const groupedMarketPairs = groupMarketsAndFindVolumeExtremes(conditionFn);
  xybot.vars.mikado.groupedMarketPairs = groupedMarketPairs;
  

  //xybot.vars.mikado.groupedMarketPairs.markets = groupedMarketPairs.markets;
  //xybot.vars.mikado.groupedMarketPairs.marketOverall = groupedMarketPairs.marketOverall;

  // Render the markets table using the groupedMarketPairs
  xybot.view.viewMarketsTable.render(xybot.vars.mikado.groupedMarketPairs);

  // Fetch Coingecko data initially
  xybot.vars.mikado.groupedMarketPairs.btcData = {};
  fetchCryptoApiData();
  // Refresh data every 5 minutes
  setInterval(fetchCryptoApiData, 5 * 60 * 1000); // 5 minutes interval


  //render marketOverall View
  //const marketOverall = ({"highestVolumeMarketOverall": groupedMarketPairs.marketOverall.highestVolumeMarketOverall, "lowestVolumeMarketOverall": groupedMarketPairs.marketOverall.lowestVolumeMarketOverall, "lastAddedMarkets": groupedMarketPairs.lastAddedMarkets});
  const marketOverall = ({"highestVolumeMarketOverall": groupedMarketPairs.marketOverall.highestVolumeMarketOverall, "lowestVolumeMarketOverall": groupedMarketPairs.marketOverall.lowestVolumeMarketOverall, "lastAddedMarkets": groupedMarketPairs.lastAddedMarkets, "btcData": (xybot.vars.mikado.groupedMarketPairs.btcData)});
  console.log('marketOverall: ', marketOverall);
  //xybot.vars.mikado.marketOverall[0] = marketOverall;
  xybot.vars.mikado.marketOverallView.render(marketOverall);

  //set variables for auth user
  xybot.vars.mikado.profile = {};

  //render select menu for Markets
  xybot.renderMarketMenu();

  //init Router
  xybot.initRouter();
}

/*
 Render Select Market Menu
*/
xybot.renderMarketMenu = function () {

  const markets = xybot.vars.mikado.groupedMarketPairs.markets;

  //*Add base markets to the select markets menu
  //get elements from DOM
  const parentElement = document.getElementById("select-menu-market");
  /*const selectTabSwitch = parentElement.querySelector(".select-tab-switch");

  markets.forEach((market) => {
    // Create a new div element
    const newElement = document.createElement("div");

    // Add the "name" property and class
    newElement.classList.add("badge", "fs-4", "item-switch", "ms-1");
    newElement.textContent = market.name;
    
    // Add the new element as a child to the ".select-tab-switch" element
    selectTabSwitch.appendChild(newElement);
  });
  */
  const selectTabSwitch = parentElement.querySelector(".select-tab-switch");
  const existingBaseNames = new Set([...selectTabSwitch.querySelectorAll(".item-switch")].map(element => element.textContent));

  markets.forEach(market => {
    if (!existingBaseNames.has(market.name)) {
      const newElement = document.createElement("div");
      newElement.classList.add("badge", "fs-4", "item-switch", "ms-1");
      newElement.textContent = market.name;
      selectTabSwitch.appendChild(newElement);
    }
  });


  xybot.view.viewMenuMarkets.render(xybot.vars.mikado.groupedMarketPairs.allMarkets);

  //render marketMenuData
  xybot.renderMarketMenuData();
}

/*
 @ Render Select Market Menu Data
*/
let marketMenuDataInput =  document.getElementById("selectMenuMarketInput");

let marketMenuBtn = document.querySelector("#select-menu-market .select-btn");
let marketMenuBtnLeft = marketMenuBtn.querySelector(".selected-option-left");
let marketMenuBtnCenter = marketMenuBtn.querySelector(".selected-option-center");


marketMenuDataInput.addEventListener("change", function(event) {
  console.log('==marketMenuDataInput');
  xybot.renderMarketMenuData();
});

xybot.renderMarketMenuData = function () {

  const allMarkets = xybot.vars.mikado.groupedMarketPairs.allMarkets;

  console.log('xybot.vars.mikado.groupedMarketPairs.allMarkets: ', allMarkets);
  //* Find selected market pair data, and render it
  let selectedMarket = marketMenuDataInput.value;
  let findMarket = selectedMarket;
  //if no market is selected, set default to highest volume
  if (selectedMarket === ""){
    findMarket  = xybot.vars.mikado.groupedMarketPairs.marketOverall.highestVolumeMarketOverall.name;
  }

  const selectedMarketIndex = allMarkets.findIndex(item => item.name === findMarket);
  xybot.view.viewMenuMarketsData.render( allMarkets[selectedMarketIndex] );

  console.log('allMarkets[selectedMarketIndex]: ', allMarkets[selectedMarketIndex]);
  if (selectedMarket === ""){
    marketMenuBtnCenter.innerHTML = `<span class="coina">${allMarkets[selectedMarketIndex].coina}</span><span class="text-muted fw-normal coinb">/${allMarkets[selectedMarketIndex].coinb}</span>`;
    marketMenuBtnLeft.innerHTML =
    `<div class="">
      <figure class="avatar_with_badge">
        <img src="./assets/images/crypto/${allMarkets[selectedMarketIndex].xy.icon}" class="avatar_main">
        <img src="./assets/images/crypto/${allMarkets[selectedMarketIndex].xy.iconb}" class="avatar_badge">
      </figure>
    </div>`;
  }
}


xybot.update_userorders = function(market = '', updatedOrders = []) {
  
  // If the 'market' is not an empty string, use the provided market value.
  // Otherwise, set the default market to the user's chosen market on the page.
  market = (market !== '') ? market : xybot.current_market.market;

  console.log('==xybot.update_userorders market: ', market, xybot.current_market.market );
  
  // Only update or render the chosen market of the page if it is different from the current market.
  // If the provided 'market' is not the same as the current market (xybot.current_market.market),
  // then return early to avoid unnecessary updates or rendering.
  if (market !== xybot.current_market.market)
    return ;

  console.log('==xybot.update_userorders: ', updatedOrders );
  console.log('==xybot.update_userorders xybot.current_market: ', xybot.current_market);

  let userBuyOrders = ych.data.profile.buys[xybot.current_market.market];
  
  let userSellOrders = ych.data.profile.sells[xybot.current_market.market];
  

  for (var i=0; i < userBuyOrders.length; i++) {
    userBuyOrders[i].side = 'buy';
  }
  console.log('userBuyOrders: ', userBuyOrders);
  for (var i=0; i < userSellOrders.length; i++) {
    userSellOrders[i].side = 'sell';
  }
  console.log('userSellOrders: ', userSellOrders);

  const allUserOrdersUpdated = [...userBuyOrders, ...userSellOrders];

  
  
  

  //format the output
  const marketGroup = ych.data.markets[market];

  let digits = marketGroup.digits !== 0 ? marketGroup.digits : 8;

  const marketPairSplitted = market.split('-');
  const coinb = marketPairSplitted[1];

  const extPrice = ych.data.coininfos[coinb].ext.priceext;
  //let price_usd = (market.price) * ychData.coininfos[market.coinb].ext.priceext;
  //market.xy.priceusd = formatPrice( price_usd , digits, false);
  let priceusd = 0;

  for (var i=0; i < allUserOrdersUpdated.length; i++) {
    allUserOrdersUpdated[i].xy = {};

    // Format the price based on the number of digits
    allUserOrdersUpdated[i].xy.date = xy_fn.convertTimestampToDate(allUserOrdersUpdated[i].date);
    allUserOrdersUpdated[i].xy.price = formatPrice(allUserOrdersUpdated[i].price, digits, false);
    allUserOrdersUpdated[i].xy.inita = formatPrice(allUserOrdersUpdated[i].inita, digits, false);
    allUserOrdersUpdated[i].xy.filleda = formatPrice(allUserOrdersUpdated[i].filleda, digits, false);
    
    priceusd = (allUserOrdersUpdated[i].price) * extPrice * allUserOrdersUpdated[i].inita/1e8;
    //allUserOrdersUpdated[i].xy.priceusd = formatPrice(priceusd, digits, false);
    allUserOrdersUpdated[i].xy.priceusd = ych.gui.format_usd_or_empty(priceusd/1e8);
  }
  //console.log('allUserOrders: ', allUserOrdersUpdated);


  
  //xybot.view.viewUserOrders.render( allUserOrdersUpdated );

  renderUserOrders(allUserOrdersUpdated)
  .then(() => {
    console.log('renderUserOrders market: ', market);
    // Code to execute after rendering user orders successfully
    xy_fn.tablePagination(10, 'table_orders', 'userOrders');

    const table_orders = document.getElementById('table_orders');
    xy_fn.enableDivTableSorting(table_orders);

  })
  .catch((error) => {
    // Handle error if rendering fails
    console.log('renderUserOrders: ', error)
  });
}


function renderUserOrders(allUserOrdersUpdated) {
  console.log('renderUserOrders: ', allUserOrdersUpdated)
  return new Promise((resolve, reject) => {
    try {
      xybot.view.viewUserOrders.render(allUserOrdersUpdated);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

/*Withdrawals*/
xybot.update_userwithdrawals = function(coin) {
  //partWithdraw.update(xybot.current_coin);
  
  //init the withdrawal functions
  ych.gui.parts['send']['evm'].part_send_evm(true, coin);
  ych.gui.parts['send']['crypto'].part_send_crypto(true, coin);

  //render withdrawals history table
  xybot.update_userwithdrawals_table(coin);

  
}

xybot.update_userwithdrawals_table = function(coin) {
  console.log('==xybot.update_userwithdrawals_table==', coin);
  //pre-render the withdrawal array object
  
  //const modifiedWithdraws = Object.assign([], ych.data.profile.withdraws[coin]);
  const modifiedWithdraws = coinjs.clone(ych.data.profile.withdraws[coin]);
  console.log('==xybot.update_userwithdrawals_table== modifiedWithdraws', modifiedWithdraws);
  //const coinWithdraws = ych.data.profile.withdraws[coin];
  

  console.log('xybot.update_userwithdrawals modifiedWithdraws: ', modifiedWithdraws);

  for (let i = 0; i < modifiedWithdraws.length; i++) {
    //if (!modifiedWithdraws[i]) modifiedWithdraws[i] = {};

    //modifiedWithdraws[i] = coinWithdraws[i];
    modifiedWithdraws[i].xy = {};
    
    modifiedWithdraws[i].xy.txid = xy_fn.truncateString(modifiedWithdraws[i].txid, 10, 4);
    modifiedWithdraws[i].xy.addr = xy_fn.truncateString(modifiedWithdraws[i].addr, 10, 4);

    //modify date

    modifiedWithdraws[i].xy.date = '-';
    if (modifiedWithdraws[i].time.made)
      modifiedWithdraws[i].xy.date = xy_fn.convertTimestampToDate(modifiedWithdraws[i].time.made);

    //modify withdrawal status
    if (modifiedWithdraws[i].status == "COMPLETED")
      modifiedWithdraws[i].xy.status = '<span class="badge bg-lime-lt">'+modifiedWithdraws[i].status+'</span>';
    else if (modifiedWithdraws[i].status == "CANCELLED")
      modifiedWithdraws[i].xy.status = '<span class="badge bg-red-lt">'+modifiedWithdraws[i].status+'</span>';
    else
      modifiedWithdraws[i].xy.status = '<span class="badge bg-orange-lt">'+modifiedWithdraws[i].status+'</span>';

    //modify usd value
    modifiedWithdraws[i].xy.usdvalue = '<span class="badge bg-info-lt">'+ych.gui.format_usd_or_empty(modifiedWithdraws[i].vals.usdext)+'</span>';

    //modify icon
    const asset = xybot.getAssetData(coin);
    if (asset) {
      modifiedWithdraws[i].xy.icon = asset.icon;
    }

    //generate link for blockexplorer txid
    let txid_link = '';
      modifiedWithdraws[i].xy.txid_link = '';

    if (modifiedWithdraws[i].txid.length == 64) {
      //const txid_link = (ych.data.coininfos[coin].ext.txhashurl).replace('{txid}', modifiedWithdraws[i].txid);
      //modifiedWithdraws[i].xy.txid_link = `<a href="${txid_link}" target="_blank">${modifiedWithdraws[i].xy.txid}</a>`;

      
      //if there is any block explorer for txhash lookup
      if (ych.data.coininfos[coin].ext.txhashurl != '') {
        txid_link = (ych.data.coininfos[coin].ext.txhashurl).replace('{txid}', modifiedWithdraws[i].txid);
        modifiedWithdraws[i].xy.txid_link = `<a href="${txid_link}" target="_blank">${modifiedWithdraws[i].xy.txid}</a>`;

        //console.log('withdrawals txhashurl found!');
      }


    }else if(modifiedWithdraws[i].txid.length != '') { //cover cases for email internal sending
      if (modifiedWithdraws[i].status != 'CANCELLED') 
        modifiedWithdraws[i].xy.txid_link = '<span class="badge bg-success-lt">'+modifiedWithdraws[i].txid+'<br>'+xy_fn.truncateString(modifiedWithdraws[i].addr, 4, 6)+'</span>';

    } else {
      modifiedWithdraws[i].txid = '-';  //reset txid if withdrawal is cancelled
      modifiedWithdraws[i].xy.txid_link = '-';
    }
    //generate link for blockexplorer addr 
    //const addr_link = (ych.data.coininfos[coin].ext.txaddrurl).replace('{addr}', modifiedWithdraws[i].addr);
    //modifiedWithdraws[i].xy.addr_link = `<a href="${addr_link}" target="_blank">${modifiedWithdraws[i].xy.addr}</a>`;

    //generate link for blockexplorer addr 
    let addr_link = '';
    modifiedWithdraws[i].xy.addr_link = '';
    //if there is any block explorer for address lookup
    if (ych.data.coininfos[coin].ext.txaddrurl != '') {
      addr_link = (ych.data.coininfos[coin].ext.txaddrurl).replace('{addr}', modifiedWithdraws[i].addr);
      modifiedWithdraws[i].xy.addr_link = `<a href="${addr_link}" target="_blank">${modifiedWithdraws[i].xy.addr}</a>`;
      //console.log('withdrawals txaddrurl found!');
    }



    //format amount
    modifiedWithdraws[i].xy.amount = ych.gui.format_amount_or_empty(modifiedWithdraws[i].vals.amount);


  }

  //render the withdrawals history


  //xybot.view.viewUserWithdrawals.render(ych.data.profile.withdraws[coin]);
  //xybot.view.viewUserWithdrawals.render(modifiedWithdraws);

  renderUserWithdrawals(modifiedWithdraws)
  .then(() => {
    console.log('renderUserWithdrawals coin: ', coin);
    // Code to execute after rendering user orders successfully
    xy_fn.tablePagination(10, 'table_withdrawals', 'userWithdrawals');

    const table_withdrawals = document.getElementById('table_withdrawals');
    xy_fn.enableDivTableSorting(table_withdrawals);

  })
  .catch((error) => {
    // Handle error if rendering fails
    console.log('renderUserWithdrawals: ', error)
  });
  




  //ych.gui.parts['send']['evm'].update(coin);
  
  //render withdrawals page
  //ych.data.profile.withdraws[coin]
}


function renderUserWithdrawals(allUserWithdrawalsUpdated) {
  console.log('renderUserWithdrawals: ', allUserWithdrawalsUpdated)
  return new Promise((resolve, reject) => {
    try {
      xybot.view.viewUserWithdrawals.render(allUserWithdrawalsUpdated);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}


/*Deposits*/
xybot.update_userdeposits = function(coin) {
  //partWithdraw.update(xybot.current_coin);
  console.log('update_userdeposits: ', coin),

  //init the deposits functions
  //part.update(xybot.current_coin, true);
  ych.gui.parts['recv']['evm'].part_recv_evm(true, coin);
  //ych.gui.parts['recv']['evm'].update(xybot.current_coin, true);

  //render withdrawals history table
  xybot.update_userdeposits_table(coin);

  
}

xybot.update_userdeposits_table = function(coin) {
  console.log('==xybot.update_userdeposits_table==', coin);
  //pre-render the withdrawal array object
  
  //const modifiedDeposits = Object.assign([], ych.data.profile.deposits[coin]);
  const modifiedDeposits = coinjs.clone(ych.data.profile.deposits[coin]);
  console.log('==xybot.update_userdeposits_table== modifiedDeposits', modifiedDeposits);
  //const coinWithdraws = ych.data.profile.deposits[coin];
  

  console.log('xybot.update_userdeposits_table modifiedDeposits: ', modifiedDeposits);

  for (let i = 0; i < modifiedDeposits.length; i++) {

    modifiedDeposits[i].xy = {};
    
    modifiedDeposits[i].xy.txid = xy_fn.truncateString(modifiedDeposits[i].txid, 10, 4);
    modifiedDeposits[i].xy.addr = xy_fn.truncateString(modifiedDeposits[i].address, 10, 4);

    //modify date
    modifiedDeposits[i].xy.date = xy_fn.convertTimestampToDate(modifiedDeposits[i].date);

    //modify deposit status
    if (modifiedDeposits[i].registered)
      modifiedDeposits[i].xy.status = '<span class="badge bg-lime-lt">DEPOSITED</span>';
    else
      modifiedDeposits[i].xy.status = '<span class="badge bg-orange-lt">PENDING</span>';

    //modify usd value
    modifiedDeposits[i].xy.usdvalue = '<span class="badge bg-info-lt">'+ych.gui.format_usd_or_empty(modifiedDeposits[i].usdext)+'</span>';

    //get icon
    const asset = xybot.getAssetData(coin);
    if (asset) {
      modifiedDeposits[i].xy.icon = asset.icon;
    }

    //generate link for blockexplorer txid
    if (modifiedDeposits[i].txid.length == 64) {
      let txid_link = '';
      modifiedDeposits[i].xy.txid_link = '';
      //if there is any block explorer for txhash lookup
      if (ych.data.coininfos[coin].ext.txhashurl != '') {
        txid_link = (ych.data.coininfos[coin].ext.txhashurl).replace('{txid}', modifiedDeposits[i].txid);
        modifiedDeposits[i].xy.txid_link = `<a href="${txid_link}" target="_blank">${modifiedDeposits[i].xy.txid}</a>`;  
        //console.log('deposits txhashurl found!');
      }
      
    }else if(modifiedDeposits[i].txid.length != '') { //cover cases for email internal sending
      modifiedDeposits[i].xy.txid_link = '<span class="badge bg-success-lt">'+modifiedDeposits[i].txid+'<br>'+xy_fn.truncateString(modifiedDeposits[i].address, 4, 6)+'</span>';
    } else {
      modifiedDeposits[i].txid = '-';  //reset txid if withdrawal is cancelled
      modifiedDeposits[i].xy.txid_link = '-';
    }

    //generate link for blockexplorer addr 
    let addr_link = '';
    modifiedDeposits[i].xy.addr_link = '';
    //if there is any block explorer for address lookup
    if (ych.data.coininfos[coin].ext.txaddrurl != '') {
      addr_link = (ych.data.coininfos[coin].ext.txaddrurl).replace('{addr}', modifiedDeposits[i].address);
      modifiedDeposits[i].xy.addr_link = `<a href="${addr_link}" target="_blank">${modifiedDeposits[i].xy.addr}</a>`;
      //console.log('deposits txaddrurl found!');
    }
    

    //format amount
    modifiedDeposits[i].xy.amount = ych.gui.format_amount_or_empty(BigInt(modifiedDeposits[i].amount));


  }

  //render the withdrawals history


  //xybot.view.viewUserWithdrawals.render(ych.data.profile.withdraws[coin]);
  //xybot.view.viewUserWithdrawals.render(modifiedWithdraws);

  renderUserDeposits(modifiedDeposits)
  .then(() => {
    console.log('renderUserDeposits coin: ', coin);
    // Code to execute after rendering user orders successfully
    xy_fn.tablePagination(10, 'table_deposits', 'userDeposits');

    const table_deposits = document.getElementById('table_deposits');
    xy_fn.enableDivTableSorting(table_deposits);

  })
  .catch((error) => {
    // Handle error if rendering fails
    console.log('renderUserDeposits: ', error)
  });
  




  //ych.gui.parts['send']['evm'].update(coin);
  
  //render withdrawals page
  //ych.data.profile.withdraws[coin]
}


function renderUserDeposits(allUserDepositsUpdated) {
  console.log('renderUserDeposits: ', allUserDepositsUpdated)
  return new Promise((resolve, reject) => {
    try {
      xybot.view.viewUserDeposits.render(allUserDepositsUpdated);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

xybot.update_markettrades = function (market, marketTrades = []) {
  console.log('xybot.update_markettrades: ', market, marketTrades); 

const marketUpdate = market;
/*
for (const marketGroup of xybot.vars.mikado.groupedMarketPairs.markets) {
  for (let market of marketGroup.market) {
    if (market.name === marketUpdate.name) {
      // Update the entire market object with marketUpdate
      

      const ychData = ych.data; // The data object containing market and group information
  marketUpdate.xy = {};

        // Set the market open/close status
        marketUpdate.xy.open = marketUpdate.service
          ? '<div class="badge bg-danger-lt" title="Market is Closed" data-bs-toggle="tooltip" data-bs-placement="top">Closed</div>'
          : '<div class="badge bg-success-lt" title="Market is Open" data-bs-toggle="tooltip" data-bs-placement="top">Open</div>';

        const asset = xybot.getAssetData(marketUpdate.coina);
        if (asset) {
          marketUpdate.xy.icon = asset.icon;
        }

        // Format the volume in USD
        marketUpdate.xy.volusd = ych.gui.format_usd_or_empty(marketUpdate.volusd);

        let digits = marketGroup.digits !== 0 ? marketGroup.digits : 8;

        // Format the price based on the number of digits
        marketUpdate.xy.price = formatPrice(marketUpdate.price, digits, false);
        

        

        // Format the external price if available
        if (ychData.coininfos[marketUpdate.coinb].ext.priceext) {
          let price_base = ychData.coininfos[marketUpdate.coina].ext.priceext / ychData.coininfos[marketUpdate.coinb].ext.priceext;
          marketUpdate.xy.extprice = formatPrice(price_base, digits, true);

          //if coina-price is lesser then 0.1$, use 4 decimals
          if (ychData.coininfos[marketUpdate.coina].ext.priceext || ychData.coininfos[marketUpdate.coina].ext.priceext === 0) {
            if (ychData.coininfos[marketUpdate.coina].ext.priceext < 0.1)
              digits = 4;
            else
              digits = 2;
          } else
            digits = 4;
          let price_usd = (marketUpdate.price) * ychData.coininfos[marketUpdate.coinb].ext.priceext;
          marketUpdate.xy.priceusd = formatPrice( price_usd , digits, false);
        }


      market = Object.assign(market, marketUpdate);


      break; // No need to continue searching once we found the match
    }
  }
}
*/

let lowestVolumeMarketOverall = xybot.vars.mikado.groupedMarketPairs.marketOverall.lowestVolumeMarketOverall;
let highestVolumeMarketOverall = xybot.vars.mikado.groupedMarketPairs.marketOverall.highestVolumeMarketOverall;
let marketIsChanged = false;
const lastAddedMarket = xybot.vars.mikado.groupedMarketPairs.lastAddedMarkets;
let allMarkets = [];

// Iterate through the markets and find the matching name
for (let marketGroup of xybot.vars.mikado.groupedMarketPairs.markets) {
  for (let marketIndex = 0; marketIndex < marketGroup.market.length; marketIndex++) {
    let market = marketGroup.market[marketIndex];
    if (market.name === marketUpdate.name && (market.price !== marketUpdate.price || market.volusd !== marketUpdate.volusd)  ) {

      // Update the entire market object with marketUpdate using formatMarket function
      const [updatedMarketGroup, updatedMarket, updatedHighestVolumeMarketOverall, updatedLowestVolumeMarketOverall] = formatMarket(marketGroup, marketUpdate, highestVolumeMarketOverall, lowestVolumeMarketOverall, false);
      // Update the market object in the array with the updated one
      Object.assign(marketGroup.market[marketIndex], updatedMarket);
      console.log('xybot.update_markettrades updatedMarket: ', updatedMarket)

      // Check if the market name matches lastAddedMarketName
      if (market.name === lastAddedMarket.name && (lastAddedMarket.price !== marketUpdate.price || lastAddedMarket.volusd !== marketUpdate.volusd) ) {
        // Assign updatedMarket to xybot.vars.mikado.groupedMarketPairs.lastAddedMarkets
        Object.assign(xybot.vars.mikado.groupedMarketPairs.lastAddedMarkets, updatedMarket);
      }


      //update High/Low Volume Overall Data
      highestVolumeMarketOverall = updatedHighestVolumeMarketOverall;
      lowestVolumeMarketOverall = updatedLowestVolumeMarketOverall;

      //list of All markets
      allMarkets.push(allMarkets);


      marketIsChanged = true;
      //break; // We need to continue to find highestVolume and lowestVolume in markets
    }
  }
}

// Render the markets table using the groupedMarketPairs
if (marketIsChanged) {
  console.log('xybot.update_markettrades - marketIsChanged');
  xybot.vars.mikado.groupedMarketPairs.marketOverall.lowestVolumeMarketOverall
  xybot.vars.mikado.groupedMarketPairs.marketOverall.lowestVolumeMarketOverall

  //render marketOverall View
  const marketOverall = ({"highestVolumeMarketOverall": xybot.vars.mikado.groupedMarketPairs.marketOverall.highestVolumeMarketOverall, "lowestVolumeMarketOverall": xybot.vars.mikado.groupedMarketPairs.marketOverall.lowestVolumeMarketOverall, "lastAddedMarkets": xybot.vars.mikado.groupedMarketPairs.lastAddedMarkets, "btcData": (xybot.vars.mikado.groupedMarketPairs.btcData)});
  console.log('xybot.update_markettrades marketOverall: ', marketOverall);
  //xybot.vars.mikado.marketOverall[0] = marketOverall;
  xybot.vars.mikado.marketOverallView.render(marketOverall);


  xybot.view.viewMarketsTable.render(xybot.vars.mikado.groupedMarketPairs); //render startpage, markets
  xybot.view.viewMenuMarkets.render(xybot.vars.mikado.groupedMarketPairs.allMarkets); //render markets, select menu
  xybot.renderMarketMenuData();
}

// Render the Trade History table for the market
  //check if we are on same markets page

  /*
  if (!Router.urlParams)
      return;
  if (Router.urlParams.page !== 'bot' && Router.urlParams.page !== 'trade') {
    //console.log('dont update orderbook if page is not "bot" or "trade"'); //iceee commented out
    return;
  }

  const selectedMarket = document.querySelector('#' + Router.urlParams.page + ' select.select-market');
  

  if (selectedMarket === null || selectedMarket.dataset === null || selectedMarket.value === "") {
    // no selected market or dataset, do not render orderbook
    return;
  }

  console.log('xybot.update_markettrades selectedMarket : ', selectedMarket);
  console.log('xybot.update_markettrades selectedMarket marketUpdate.name: ', marketUpdate.name);
  console.log('xybot.update_markettrades selectedMarket.dataset : ', selectedMarket.dataset);

  const marketPair = selectedMarket.dataset.marketPair;
  */
  /*
  if (xybot.current_market.market == '' || !xybot.current_market.market)
    return;

  //if the web socket doesnt have updates for the market trade history
  //show the choosen market trade history for the user
  
  if (xybot.current_market.market == marketUpdate.name) {

  } else if (xybot.current_market.market != marketUpdate.name) {
    marketTrades = ych.data.trades[xybot.current_market.market];
  } else {
    //marketTrades = [];
  }
  */

  //if (xybot.current_market.market == marketUpdate.name) {
  //if (marketPair == marketUpdate.name) {
  //if (marketPair == marketUpdate.name) {
      //get price: market.price
      
      /*if (marketTrades.length == 0)
        return;
      */
      if (xybot.current_market.market == marketUpdate.name)
        xybot.marketTradesUpdate(marketTrades);

  /*} else {
    console.log('marketTrades - not same market?? - marketUpdate.name : ', market, marketUpdate.name);
  }
  */

}

/*
 marketUpdate contains basic coininfo
 marketTrades is the tradehistory, array
*/
xybot.marketTradesUpdate = function(marketTrades = []) {
  console.log('xybot.marketTradesUpdate: ', marketTrades);

  if (xybot.current_market.market == '' || !xybot.current_market.market)
    return;

  //get market info
  const market = ych.data.markets[xybot.current_market.market];

  //if there is market updates, just render the trade history according to the choosen market
  const totalTrades = marketTrades.length;

  if (totalTrades == 0)
    marketTrades = ych.data.trades[xybot.current_market.market];

  console.log('xybot.marketTradesUpdate render: ', marketTrades, 'total length: ', totalTrades);

  let trades = [];
  let digits = market.digits == 0 ? 8 : market.digits;

  let tradeType = ''; //1=buy, 2=sell
  for (let i = 0; i < marketTrades.length; i++) {
    trades[i] = marketTrades[i];
    trades[i].xy = {};

    
    let price, qty;
    //trade - buy order
    if (marketTrades[i].type == 1) {
      qty = parseFloat((marketTrades[i].amounta / 1e8).toFixed(4));
      price = (marketTrades[i].sellprice);
      trades[i].xy.direction = '<i class="ti ti-arrow-narrow-up text-success"></i>';
    } else if (marketTrades[i].type == 2) { //trade - sell order
      qty = parseFloat((marketTrades[i].amounta / 1e8).toFixed(4));
      price = (marketTrades[i].buyprice);
      trades[i].xy.direction = '<i class="ti ti-arrow-narrow-down text-danger"></i>';
    }
    //format price and date etc..
    trades[i].xy.time = xy_fn.formatDate(marketTrades[i].date);
    trades[i].xy.qty = qty;
    trades[i].xy.cost = parseFloat((marketTrades[i].amountb / 1e8).toFixed(8));
    
      //format decimals accordingly
    //trades[i].xy.price = price;
    trades[i].xy.price = parseFloat(price / 1e8).toFixed(8);

  }

  //console.log('viewBidBook updatedOrders: ', updatedOrders);
  // Render the entire buy/bid order book
  //console.log('marketTrades - :',marketTrades, trades);

  viewMarketTrades.render(trades);
}


xybot.login = function (user, profile) {
  console.log('===xybot.login: ', user, profile);

  xybot.dexySPA.userIsLoggedIn = true;
  //xybot.dexySPA.userIsLoggedIn = (ych.user !== "") ? true : false;
  console.log('xybot.dexySPA.userIsLoggedIn: ', xybot.dexySPA.userIsLoggedIn);

  $( '#page-login-box-status' ).removeClass('hidden');
  $( '#page-login-box-status .alert' ).removeClass('alert-danger').addClass('alert-success').html('Connected to NightTrader! <br> user: '+ych.user);

  
  
  $( '[data-user="email"]').text(ych.user);
  $( '[data-user="title"]').text(ych.data.profile.title);

  //generate icon from pubkey1
  $( '[data-user="hashicon"]').html( jdenticon.toSvg(ych.data.profile.pubk1, 32) );

  //show auth elements
  $( '[data-user="guest"]').addClass('hidden');
  $( '[data-user="auth"]').removeClass('hidden');
  

  //init elements
  xybot.page.init();

  //setBalance
  xybot.balance.init();

  //userOrders
  //console.log('init xybot.update_userorders');
  //xybot.update_userorders();

}
xybot.logout = function() {

  xybot.dexySPA.userIsLoggedIn = false;
  $( '#page-login-box-status' ).addClass('hidden');
  $( '#page-login-box-status .alert' ).removeClass('alert-danger').addClass('alert-success').text('');

  //reset/empty all user-data
  $( '[data-user="email"]').text('anon');
  $( '[data-user="title"]').text('');
  $( '[data-user="hashicon"]').html( jdenticon.toSvg('', 32) );

  $('#table-balance tbody').text('');

  //hide auth elements
  $( '[data-user="guest"]').removeClass('hidden');
  $( '[data-user="auth"]').addClass('hidden');
}

/**
 * Finds the last added coin/asset based on the highest index.
 * @returns {Object|null} The last added coin/asset object, or null if no coins/assets are found.
 */
function findLastAddedAsset() {
  let lastAddedCoin = null;
  let highestIndex = -Infinity;

  for (const coin in ych.data.coininfos) {
    if (ych.data.coininfos.hasOwnProperty(coin)) {
      const coininfo = ych.data.coininfos[coin];
      if (coininfo.index > highestIndex) {
        highestIndex = coininfo.index;
        lastAddedCoin = coininfo;
      }
    }
  }

  return lastAddedCoin;
}





/**
 * Formats the price based on the number of digits and calculates the external price if available.
 * @param {number} price - The price value.
 * @param {number} digits - The number of digits for formatting the price.
 * @param {boolean} isExternalPrice - Indicates if the price is an external price.
 * @returns {string} - The formatted price.
 */
function formatPrice(price, digits, isExternalPrice = false) {
  let formattedPrice;

  if (digits === 8) {
    if (isExternalPrice) {
      formattedPrice = ych.gui.format_amount(BigInt(Math.floor(0.5 + price * 1e8)));
    } else {
      formattedPrice = ych.gui.format_amount(BigInt(Math.floor(0.5 + price)));
    }
  } else if (digits === 2 || digits === 4) {
    if (isExternalPrice) {
      formattedPrice = ych.gui.format_usd_like("$", price);
    } else {
      formattedPrice = ych.gui.format_usd_like("$", price / 1e8);
    }
  } else {
    formattedPrice = price.toFixed(digits);
  }

  return formattedPrice;
}

/**
 * Groups the markets based on a specific condition (market pair) and finds the market with the highest and lowest volume within each group.
 * @param {Function} conditionFn - The condition function to determine whether a market belongs to a group.
 * @returns {Object} - An object containing market groups with its highest and lowest volume markets.
 *  Returns:
    An array-object with the following keys:
      markets: An array of objects, each of which represents a group of markets. Each object has the following properties:
        name: The name of the group
        icon: The icon of the group
        market: An array of market objects
        highestVolumeMarket: The market with the highest volume in the group
        lowestVolumeMarket: The market with the lowest volume in the group
      marketOverall: highestVolumeMarketOverall: The market with the highest volume across all groups
      marketOverall: lowestVolumeMarketOverall: The market with the lowest volume across all groups
 */

// Condition function to determine if a market belongs to a group based on the coin pair
//const result = groupMarketsAndFindVolumeExtremes(conditionFn);
function conditionFn(group, market) {
  return (
    (group.coina === '*' && ((market.coina === group.name || market.coinb === group.name)) ||
        (market.coina === group.coinb && market.coinb === group.name)) && group.name !== market.coina
  );
}
function formatMarket(marketGroup, market, highestVolumeMarketOverall, lowestVolumeMarketOverall, pushMode = true) {
  const ychData = ych.data; // The data object containing market and group information
  market.xy = {};

        // Set the market open/close status
        market.xy.open = market.service
          ? '<div class="badge bg-danger-lt" title="Market is Closed" data-bs-toggle="tooltip" data-bs-placement="top">Closed</div>'
          : '<div class="badge bg-success-lt" title="Market is Open" data-bs-toggle="tooltip" data-bs-placement="top">Open</div>';

        const asset = xybot.getAssetData(market.coina);
        const assetb = xybot.getAssetData(market.coinb);
        if (asset) {
          market.xy.icon = asset.icon;
          market.xy.iconb = assetb.icon;
        }

        // Format the volume in USD
        market.xy.volusd = ych.gui.format_usd_or_empty(market.volusd);

        let digits = marketGroup.digits !== 0 ? marketGroup.digits : 8;

        // Format the price based on the number of digits
        market.xy.price = formatPrice(market.price, digits, false);
        

        

        // Format the external price if available
        if (ychData.coininfos[market.coinb].ext.priceext) {
          let price_base = ychData.coininfos[market.coina].ext.priceext / ychData.coininfos[market.coinb].ext.priceext;
          market.xy.extprice = formatPrice(price_base, digits, true);

          //if coina-price is lesser then 0.1$, use 4 decimals
          if (ychData.coininfos[market.coina].ext.priceext || ychData.coininfos[market.coina].ext.priceext === 0) {
            if (ychData.coininfos[market.coina].ext.priceext < 0.1)
              digits = 4;
            else
              digits = 2;
          } else
            digits = 4;
          let price_usd = (market.price) * ychData.coininfos[market.coinb].ext.priceext;
          market.xy.priceusd = formatPrice( price_usd , digits, false);
        }

        if (pushMode) {
          marketGroup.market.push(market);
        } else {
          //Object.assign()
        }
        

        // Update the highest and lowest volume markets within the group
        if (!marketGroup.highestVolumeMarket || market.volusd > marketGroup.highestVolumeMarket.volusd) {
          marketGroup.highestVolumeMarket = market;
        }

        if (!marketGroup.lowestVolumeMarket || market.volusd < marketGroup.lowestVolumeMarket.volusd) {
          marketGroup.lowestVolumeMarket = market;
        }

        // Update the highest and lowest volume markets across all groups
        if (!highestVolumeMarketOverall || market.volusd > highestVolumeMarketOverall.volusd) {
          highestVolumeMarketOverall = market;
        }

        if (!lowestVolumeMarketOverall || market.volusd < lowestVolumeMarketOverall.volusd) {
          lowestVolumeMarketOverall = market;
        }

        return [marketGroup, market, highestVolumeMarketOverall, lowestVolumeMarketOverall];

}
function groupMarketsAndFindVolumeExtremes(conditionFn) {

  const ychData = ych.data; // The data object containing market and group information
  const groupedMarketPairs = [];  //markets are grouped in base Pair
  const listMarkets = []; //market is not grouped

  let highestVolumeMarketOverall = null; // Tracks the highest volume market across all groups
  let lowestVolumeMarketOverall = null; // Tracks the lowest volume market across all groups

  let lastAddedMarkets = [];
  const findLastAddedCoin = findLastAddedAsset(); //get the last added coin, retrieve its markets in the loop below!

  // Iterate over each market group
  ychData.groups.forEach(group => {
    let marketGroup = {
      title: `${group.name} Markets`,
      name: group.name,
      open: group.open,
      service: group.service,
      digits: group.digits,
      icon: "",
      market: [],
      highestVolumeMarket: null,
      lowestVolumeMarket: null
    };

    // Iterate over each market
    Object.entries(ychData.markets).forEach(([marketName, market]) => {
      const asset = xybot.getAssetData(group.coinb);
      if (asset) {
        marketGroup.icon = asset.icon;
      }

      // Check the condition function to determine if the market belongs to the group
      if (conditionFn(group, market)) {
        [marketGroup, market, highestVolumeMarketOverall, lowestVolumeMarketOverall] = formatMarket(marketGroup, market, highestVolumeMarketOverall, lowestVolumeMarketOverall);

        //add market to list of all markets
        listMarkets.push(market);

        //get last added coins data
        if (market.coina === findLastAddedCoin.coin || market.coinb === findLastAddedCoin.coin)
          lastAddedMarkets.push(market);
      }
    });

    groupedMarketPairs.push({
      ...marketGroup,
      highestVolumeMarket: marketGroup.highestVolumeMarket,
      lowestVolumeMarket: marketGroup.lowestVolumeMarket
    });
  });

  // Create an object to hold the overall highest and lowest volume markets
  const marketOverall = {
    highestVolumeMarketOverall,
    lowestVolumeMarketOverall
  };

  // get only 1 of the last added markets for the coin
  lastAddedMarkets = lastAddedMarkets[lastAddedMarkets.length-1];


  return { allMarkets: listMarkets, markets: groupedMarketPairs, marketOverall, lastAddedMarkets };
}







    // Add the market




  /* Mikado/JQuery Event Handler */

  const modalLoginContent = document.getElementById('modal-login');
  const loginButton = $('#page-login-button-login');

  const buyPriceInput = $('#makebuy-price-text');
  const sellPriceInput = $('#makesell-price-text');
  const buyAmountInput = $('#makebuy-quantity-text');
  const sellAmountInput = $('#makesell-quantity-text');
  const sellCostEl = $('#makesell-cost-text');
  const buyCostEl = $('#makebuy-cost-text');
  
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


  $('#modal-login').keypress(function(e) {
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
      sellCostEl.text((cost).toFixed(8));
  });


  

  $('#buy_form').on('change, keyup', 'input', function (e) {
      const price = parseFloat(buyPriceInput.val());
      const amount = parseFloat(buyAmountInput.val());
      const cost = (price * amount);

      const marketFee = ych.data.coininfos[xybot.current_market.coinb ].fee.buyfee;
      const fee = cost * marketFee;

      buyCostFee.text(fee.toFixed(8));
      buyCostEl.text((cost + fee).toFixed(8));
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



  /*
  @ Wallet Router settings
  */

  xybot.initRouter = async function() {
    console.log('===initRouter DexySPA.js===');

    xybot.dexySPA.userIsLoggedIn = (ych.user !== "") ? true : false;
    let userMembership = '';

    // Add routes to the router
    Router
    .add(/^$/, (data) => {
      console.log('**Empty page**');
      Router.navigate('start');
    })
    .add(/^start$/, (data) => {
      console.log('**Start page**');
    })
    .add(/^about$/, (data) => {
      console.log('About page');
    })
    .add(/^bot$/, (data) => {
      console.log('Bot page');
      const buyEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="buy"]');
      const sellEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="sell"]');

      const isBuyContainerRendered = buyEntryContainerUpdated.data('rendered') === true;
      const isSellContainerRendered = sellEntryContainerUpdated.data('rendered') === true;

      if (!isBuyContainerRendered || !isSellContainerRendered) {
        console.log('buyEntryContainerUpdated.data(rendered): ', isBuyContainerRendered);
        console.log('sellEntryContainerUpdated.data(rendered): ', isSellContainerRendered);

        const pageSelectedMarket = $('#'+Router.urlParams.page+' select.select-market');
        //pageSelectedMarket.trigger('change');
      }
      

    })
    .add(/^balance$/, (data) => {
      console.log('Balance page');
    })
    .add(/^components$/, (data) => {
      console.log('Components page');
    })
    .add(/^orders$/, (data) => {
      console.log('Order page');

      const pageSelectedMarket = $('#'+Router.urlParams.page+' select.select-market');
      //pageSelectedMarket.trigger('change');

    })
    /*.add(/^trade(\/(.*))?$/, (data) => {
      const tradeParam = data[1]; // Get the second part of the URL, if it exists
      console.log('Trade page');
      if (tradeParam) {
        const tradeParts = tradeParam.split('_'); // Split the second part by underscore
        console.log('First part:', 'trade');
        console.log('Second part:', tradeParts[0]); // Output the first part of the second URL segment
        console.log('Third part:', tradeParts[1]); // Output the second part of the second URL segment
      }
    })*/
    .add(/^trade(?:\/(.*))?$/, (data) => {
      console.log('Trade page');
      const tradeParam = data[1] || ''; // Get the second part of the URL, or an empty string if it doesn't exist
      if (tradeParam) {
        const tradeParts = tradeParam.split('-'); // Split the second part by underscore
        console.log('MarketPair:', tradeParam); // Output the first part of the second URL segment
        console.log('Coina:', tradeParts[0]); // Coina
        console.log('Coinb:', tradeParts[1]); // Coinb

        const tradingPair = tradeParam;
        const markets = xybot.vars.mikado.groupedMarketPairs.markets;

        let isTradingPairFound = false;

        for (let i = 0; i < markets.length; i++) {
          const marketPairs = markets[i].market;
          for (let j = 0; j < marketPairs.length; j++) {
            if (marketPairs[j].name === tradingPair) {
              isTradingPairFound = true;
              break;
            }
          }
          if (isTradingPairFound) {
            break;
          }
        }

        //if marketPair is not found, re-direct to startPage
        if (isTradingPairFound) {
          console.log(`Trading pair ${tradingPair} found!`);
        } else {
          console.log(`Trading pair ${tradingPair} not found.`);
          Router.navigate('start');
        }

      }

    })
    //.add(/^deposit(\/(.*))?$/, (data) => {
    .add(/^deposit(?:\/(.*))?$/, (data) => {
      console.log('Deposit page: ', data);
      
      const depositParam = data[1] || ''; // Get the second part of the URL, or an empty string if it doesn't exist
      if (depositParam !== '') {
        xybot.current_coin = depositParam;
        

        //Init deposit page and rendering
        xybot.update_userdeposits(xybot.current_coin);

      }
      else {
        console.log('DEPOSIT ERROR: COIN not defined for deposit! ');
        Router.navigate('balance');
      }
    })
    .add(/^withdraw(?:\/(.*))?$/, (data) => {
      console.log('Withdraw page: ', data);
      
      const withdrawParam = data[1] || ''; // Get the second part of the URL, or an empty string if it doesn't exist
      if (withdrawParam !== '') {
        xybot.current_coin = withdrawParam;

        //Init withdrawals page and rendering
        xybot.update_userwithdrawals(xybot.current_coin);

        
      }
      else {
        console.log('WITHDRAW ERROR: COIN not defined for Withdrawal! ');
        Router.navigate('balance');
      }
    })
    .add(/^login$/, (data) => {
      console.log('Login page');
    })
    .add(/^logout$/, (data) => {
      console.log('Logout page');
      window.ych_gui_on_logout();
      xybot.logout();
      Router.navigate('start');
    })
    .add(/^profile$/, (data) => {
      console.log('Profile page');
    })
    .add(/^market$/, (data) => {
      console.log('Markets page');
    })
    .add(/^vip1$/, (data) => {
      console.log('Vip 1 page');
    })
    .add(/^vip2$/, (data) => {
      console.log('Vip 2 page');
    })



    //membership based page permissions
    const membershipPermissions = {
      'gold': {
        'permissions': ['vip1', 'vip2', 'orders'],
      },
      'silver': {
        'permissions': ['vip1'],
      },
      'bronze': {
        'permissions': [],
      },
      '': {
        'permissions': [],
      },
    };

    // Create your own page availability configuration
    const pagePermissions = {
      '': true,   //start page, when website is loaded
      start: true,  // for all
      about: true,  // for all
      trade: true, // for all
      bot: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      balance: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      orders: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      //deposit: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      
      withdraw: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      
      login: (userIsLoggedIn) => !xybot.dexySPA.userIsLoggedIn, // for Non-Auth users
      logout: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      profile: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      components: (userIsLoggedIn) => xybot.dexySPA.userIsLoggedIn, // for Auth users
      vip1: {
        'membership': (userIsLoggedIn, userMembership) => {
          // Check if the user has the required membership to access vip2 page, in this case user must be a "silver/gold" member
          return xybot.dexySPA.userIsLoggedIn && membershipPermissions[userMembership]?.permissions.includes('vip1');
        },
      },
      vip2: {
        'membership': (userIsLoggedIn, userMembership) => {
          // Check if the user has the required membership to access vip2 page, in this case user must be a "gold" member
          return xybot.dexySPA.userIsLoggedIn && membershipPermissions[userMembership]?.permissions.includes('vip2');
        },
      },
      // Add the function to handle dynamic trade pages (e.g., trade/TBLK2-TBTC)
      trade: /^trade(\/(.*))?$/i,
      deposit: /^deposit(\/(.*))?$/i,
      withdraw: /^withdraw(\/(.*))?$/i,
      
      /*orders: {
        'membership': (userIsLoggedIn, userMembership) => {
          // Check if the user has the required membership to access vip2 page, in this case user must be a "gold" member
          return xybot.dexySPA.userIsLoggedIn && membershipPermissions[userMembership]?.permissions.includes('orders');
        },
      },
      */
    };
    const defaultPage = 'start'; // Replace with your desired default page
    

    // Define your custom callback functions
    // Custom logic for handling unauthorized page access
    const unauthorizedPageAccessCallback = (page) => {
      console.log(`Unauthorized page access: ${page}`);
      var modalLogin = new bootstrap.Modal(modalLoginContent, {});
      modalLogin.show();
    };

    const invalidRouteCallback = () => {
      alert('Invalid route detected');
      // Custom logic for handling invalid routes
    };
    xybot.dexySPA = new DexySPA(Router, pagePermissions, membershipPermissions, defaultPage, unauthorizedPageAccessCallback, invalidRouteCallback);

    
    // Create an instance of DexySPA and pass your router instance and page availability configuration
    //const dexySPA = new DexySPA(Router, pagePermissions, membershipPermissions, defaultPage);

  };





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
      $.getJSON( 'https://'+xybot.network +window.ych_login_path, JSON.stringify({
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
      url: 'https://' + xybot.network + window.ych_login_path,
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
        //console.log(JSON.stringify(jqXHR));
        //console.log('textStatus: ', textStatus);
        
      }
    });



  }


  //
  


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
  //console.log('storedTheme: ', storedTheme)


  if (storedTheme === 'dark') {
    document.body.setAttribute("data-bs-theme", storedTheme);
    $('[data-set-theme]').attr(themeStorageKey, 'light')
  } else {
    document.body.removeAttribute("data-bs-theme");
    $('[data-set-theme]').attr(themeStorageKey, 'dark')
  }



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
        var depositing = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].deposits);
        var witdrawing = ych.gui.format_amount_or_empty(ych.data.profile.balances[coin].withdraws);

        userBalances.push({
          'coin': coin,
          'sum_format': sum,
          //'sum_format': Number(ych.data.profile.balances[coin].sum)/1.e8,
          'sum': (ych.data.profile.balances[coin].sum) ? (ych.data.profile.balances[coin].sum) : 0,

          'usd_format': ych.gui.format_usd_or_empty(usd),
          //'usd_format': usd,
          'usd': usd ? usd : 0,

          'free_format': free,
          //'free_format': Number(ych.data.profile.balances[coin].free)/1.e8,
          'free': (ych.data.profile.balances[coin].free) ? (ych.data.profile.balances[coin].free) : 0,

          'inorders_format': inorders,
          //'inorders_format': Number(ych.data.profile.balances[coin].orders)/1.e8,
          'inorders': (ych.data.profile.balances[coin].orders) ? (ych.data.profile.balances[coin].orders) : 0,

          'depositing_format': depositing,
          'depositing': (ych.data.profile.balances[coin].deposits) ? (ych.data.profile.balances[coin].deposits) : 0,
          
          'withdraws_format': witdrawing,
          'withdraws': (ych.data.profile.balances[coin].withdraws) ? (ych.data.profile.balances[coin].withdraws) : 0,
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
    console.log('userBalances: ', userBalances);
    xybot.view.viewBalancesTable.render(userBalances);

    $('#table-balance-total').html(ych.gui.format_usd_or_empty(usdtotal));


  }


/**
 * Converts specified properties of an object to numbers.
 *
 * @param {Object} obj - The input object.
 * @param {string[]} keysToConvert - The array of keys to be converted to numbers.
 * @returns {Object} - A new object with specified properties converted to numbers.
 */
function convertObjectValuesToNumber(obj, keysToConvert) {
  const convertedObject = {};

  Object.keys(obj).forEach((key) => {
    convertedObject[key] = keysToConvert.includes(key) ? Number(obj[key]) : obj[key];
  });

  return convertedObject;
}

function convertKeysToNumber(obj) {
  return {
    ...obj,
    amounta: Number(obj.amounta),
    amountb: Number(obj.amountb),
    price: Number(obj.price),
  };
}

  xybot.part.orderbook.update = function(orderType = 'both') {


    if (!Router.urlParams)
      return;
    if (Router.urlParams.page !== 'bot' && Router.urlParams.page !== 'trade') {
      //console.log('dont update orderbook if page is not "bot" or "trade"'); //iceee commented out
      return;
    }

    console.log('xybot.part.orderbook.update Router.urlParams.page : ', Router.urlParams.page)
    const selectedMarket = document.querySelector('#' + Router.urlParams.page + ' select.select-market');
    

    if (selectedMarket === null || selectedMarket.dataset === null || selectedMarket.value === "") {
      // no selected market or dataset, do not render orderbook
      return;
    }

    //console.log('xybot.part.orderbook.update selectedMarket : ', selectedMarket)
    //console.log('xybot.part.orderbook.update selectedMarket.dataset : ', selectedMarket.dataset)

    const marketPair = selectedMarket.dataset.marketPair;

    const selected_market_pair = (marketPair).split('-');

    //Mikado update buy side of orderbook


    if (orderType === 'both' || orderType === 'buy') {
      const buyEntryContainer = $('#xyOrderBookTable .entriesContainer[data-orders="buy"] .entryContainer');
      const buyEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="buy"]');
      //let bidOrderBook = ych.data.buys[marketPair];
      //bidOrderBook = bidOrderBook.map(convertKeysToNumber);
      // Convert BigInt for amounta, amountb, price to Number()
      //let bidOrderBook = convertObjectValuesToNumber(ych.data.buys[marketPair], ['amounta', 'amountb', 'price']);
      let bidOrderBook = ych.data.buys[marketPair];
      bidOrderBook = bidOrderBook.map(obj => convertObjectValuesToNumber(obj, ['amounta', 'amountb', 'price']));

      


      if (bidOrderBook === undefined) {
        return;
      }

      

      // Sort the orders in descending price order
      bidOrderBook.sort((a, b) => Number(b.price) - Number(a.price));

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
      buyEntryContainerUpdated.attr('data-rendered', true);


    }


    if (orderType === 'both' || orderType === 'sell') {
      const sellEntryContainer = $('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer');
      const sellEntryContainerUpdated = $('#xyOrderBookTable .entriesContainer[data-orders="sell"]');
      //let askOrderBook = ych.data.sells[marketPair];
      //askOrderBook = askOrderBook.map(convertKeysToNumber);
      let askOrderBook = ych.data.sells[marketPair];
      askOrderBook = askOrderBook.map(obj => convertObjectValuesToNumber(obj, ['amounta', 'amountb', 'price']));
      // Convert BigInt for amounta, amountb, price to Number()
      

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
      sellEntryContainerUpdated.attr('data-rendered', true);

      $('[data-market="sell_orders_total"]').text(totalSellAmount.toFixed(8));
      $('[data-balance="coinb"]').html($(`[data-balance="${selected_market_pair[1]}"] [data-balance="free"]`).html());
    }




    //Calculate and set spread between bid & ask
    let spread = {'spreadAmount': '-', 'spreadPercentage': '-'};
    if (ych.data.buys[marketPair] && ych.data.sells[marketPair]) {
      spread = calculateSpreadInPercentage(ych.data.buys[marketPair], ych.data.sells[marketPair])
    }
    $('[data-market="spread"]').text(spread.spreadPercentage + '%');

    //Set Market Volume 
    let volusd = ych.data.markets[ych.gui.current_market].volusd;
    if (ych.data.markets[ych.gui.current_market].volusd) {
      $('[data-market="volumeusd"]').text('≈ $' + volusd.toFixed(0));
    }



    
  }

/**
 * Calculate the bid-ask spread amount and percentage between the highest bid price and the lowest ask price.
 * @param {Array} bid - An array of bid objects containing price data.
 * @param {Array} ask - An array of ask objects containing price data.
 * @returns {Object|string} - An object containing the bid-ask spread amount and percentage as strings with four decimal places,
 * or an error message if the bid or ask data is empty or undefined, or an odd situation where
 * the highest bid price is higher than the lowest ask price.
 */
function calculateSpreadInPercentage(bidBook, askBook) {
  // Check if either bid or ask is empty or undefined
  if (!bidBook || bidBook.length === 0 || !askBook || askBook.length === 0) {
    return { 'spreadAmount': '-', 'spreadPercentage': '-' }
  }

  // Find the highest bid price and the lowest ask price
  const bid = Math.max(...bidBook.map(item => Number(item.price)));
  const ask = Math.min(...askBook.map(item => Number(item.price)));

  // Check if bid is higher than ask (odd situation)
  if (bid > ask) {
    // Handle this odd situation, you can log an error message or return a special value to indicate the odd situation
    return { 'spreadAmount': '-', 'spreadPercentage': '-' }
  }
  
  // Calculate the bid-ask spread amount and percentage with 4 decimal places
  const spreadAmount = (ask - bid);
  const spreadPercentage = (100 * (spreadAmount / ask));
  //const spreadAmount = (ask - bid);
  //const spreadPercentage = ((spreadAmount / bid) * 100);

  // Return the result as an object
  return { 'spreadAmount': spreadAmount.toFixed(3), 'spreadPercentage': spreadPercentage.toFixed(3) };
}

/*
// Example usage:
const bidPrice = 100;
const askPrice = 105;
const spreadPercentage = calculateSpreadInPercentage(bidPrice, askPrice);
console.log('Spread Percentage:', spreadPercentage + '%');
*/

  /*Event Handler after Single Balance Update - update the total*/
  xybot.balance.update_total = function() {
    //console.log('===xybot.balance.update_total===');  //iceee commented out
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
    //console.log('xybot.balance.update: ', balance); //iceee commented out

    const node = xybot.view.viewBalancesTable.where({
      'coin': balance.coin,
      //error: 'Order failed',
    });
    //console.log('xybot.balance.update node: ', node); //iceee commented out

    //var data2 = xybot.view.viewBalancesTable.data(node[0]);
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
    var depositing = ych.gui.format_amount_or_empty(balance.deposits);
    var witdrawing = ych.gui.format_amount_or_empty(balance.withdraws);

    const data = {
      'coin': balance.coin,
      'sum_format': sum,
      //'sum_format': Number(balance.sum)/1.e8,
      'sum': balance.sum ? balance.sum : 0,

      'usd_format': ych.gui.format_usd_or_empty(usd),
      //'usd_format': usd,
      'usd': usd ? usd : 0,

      'free_format': free,
      //'free_format': Number(balance.free)/1.e8,
      'free': balance.free ? balance.free : 0,

      'inorders_format': inorders,
      //'inorders_format': Number(balance.orders)/1.e8,
      'inorders': balance.orders ? balance.orders : 0,

      'depositing_format': depositing,
      'depositing': balance.deposits ? balance.deposits : 0,

      'withdraws_format': witdrawing,
      'withdraws': balance.withdraws ? balance.withdraws : 0,


    };
    xybot.view.viewBalancesTable.update(node[0], data);
    $(node[0]).fadeOut(10).fadeIn(10);


    xybot.balance.update_total();
  }

  //**Page Specific - (Select Market on Page)
  const selectMarketEl = $('.select-market');
  const botBuyBalanceSlider = document.getElementById('botBuyBalanceSlider');
  const botSellBalanceSlider = document.getElementById('botSellBalanceSlider');

  selectMarketEl.on('change', function(e) {
    console.log('===selectMarketEl Change===');

    var selectedMarketPair = this.value;
    if (selectedMarketPair === "") {
      xybot.current_market.market = '';
      return;
    }

    
    const marketPairSplitted = selectedMarketPair.split('-');
    //buy and sell side data
    $(this).attr('data-market-pair', selectedMarketPair);
    $(this).attr('data-market-pair-coina', marketPairSplitted[0]);
    $(this).attr('data-market-pair-coinb', marketPairSplitted[1]);

    

    //var selectedMarketPair = this.options[this.selectedIndex].value;
    
    
    ych.gui.current_market = selectedMarketPair;
    xybot.current_market.market = selectedMarketPair;

    xybot.current_market.coina = marketPairSplitted[0];
    xybot.current_market.coinb = marketPairSplitted[1];

    console.log('marketPairSplitted selectedMarketPair: ', selectedMarketPair);
    //console.log('marketPairSplitted[0]: ', marketPairSplitted[0]);
    //console.log('marketPairSplitted[1]: ', marketPairSplitted[1]);

    //get the parent page of $this element
    // Find the parent element with the data attribute "data-page"
    const parentPageContainer = $(this).closest('[data-page]');
    const pageName = parentPageContainer.data('page');

    console.log('parentPageContainer: ', parentPageContainer);
     // Now we have the selected market pair, coina, coinb and the page name
    console.log(`Selected Market Pair: ${selectedMarketPair}`);
    console.log(`Page Name: ${pageName}`);

    if (pageName === "bot" || pageName === "trade") {
      xybot.part.orderbook.update();  //render orderbook in bot page
      console.log('update bot orderbook!');

      const buyFee = ych.data.coininfos[marketPairSplitted[1]].fee.buyfee*100;
      const sellFee = ych.data.coininfos[marketPairSplitted[0]].fee.sellfee*100;
      
      $('[data-market-fee="coinb"]').text((buyFee).toFixed(2));
      $('[data-market-fee="coina"]').text((sellFee).toFixed(2));

      $('[data-market="name"]').text(xybot.current_market.coina+'/'+xybot.current_market.coinb);

      const price = ych.data.markets[selectedMarketPair].price;
      $('[data-market="price"]').val(parseFloat(price/1e8).toFixed(8));


      //console.log('marketPairSplitted[0]: ' + marketPairSplitted[0])
      //console.log('marketPairSplitted[1]: ' + marketPairSplitted[1])

      //buy and sell side data
      $('[data-market="coina"]').text(marketPairSplitted[0]);
      $('[data-market="coinb"]').text(marketPairSplitted[1]);

      //TRADINGBOT DOM - update user bot balance data
      if (ych.user) {
        // Function to divide a value into n ranges
        function divideValueIntoRanges(value, ranges) {
            var result = [];
            var rangeSize = value / ranges;
            var accumulatedValue = 0;
            for (var i = 0; i < ranges; i++) {
                accumulatedValue += rangeSize;
                result.push(accumulatedValue);
            }
            return result;
        }

        //if ($('#tradingbot [data-bot="buyBalance"]').val() === "" && $('#tradingbot [data-bot="sellBalance"]').val() === ""  ){
          const percentageBalanceToUse = 0.05; //5% of balance to use for tradingbot
          const buyBalance = (Number(ych.data.profile.balances[marketPairSplitted[1]].free) / 1e8 * percentageBalanceToUse).toFixed(8);
          const sellBalance = (Number(ych.data.profile.balances[marketPairSplitted[0]].free) / 1e8 * percentageBalanceToUse).toFixed(8);
          $('#tradingbot [data-bot="buyBalance"]').val(buyBalance);
          $('#tradingbot [data-bot="sellBalance"]').val(sellBalance);


          var botBuySlider = document.getElementById('botBuyBalanceSlider');
          var botSellSlider = document.getElementById('botSellBalanceSlider');
          
          //Setup nouiSlider
          function destroyExistingSlider(slider){
            if(slider && slider.noUiSlider){
              slider.noUiSlider.destroy();
            }
          }
          destroyExistingSlider(botBuySlider);
          destroyExistingSlider(botSellSlider);
          /*
          // destroy slider if it exists and re-configure it
          if (typeof botBuySlider !== 'undefined')
            botBuySlider.noUiSlider.destroy();
          if (typeof botSellSlider !== 'undefined')
            botSellSlider.noUiSlider.destroy();
          */

          var botBuyBalance = Number(ych.data.profile.balances[marketPairSplitted[1]].free) / 1e8;
          var botSellBalance = Number(ych.data.profile.balances[marketPairSplitted[0]].free) / 1e8;

          // Divide botBuyBalance into 8 ranges
          var botBuyBalanceRanges = divideValueIntoRanges(botBuyBalance, 8);
          // Divide botSellBalance into 8 ranges
          var botSellBalanceRanges = divideValueIntoRanges(botSellBalance, 8);



          var format = {
              // 'to' the formatted value. Receives a number.
              to: function (value) {
                  return parseFloat(value).toFixed(4);
              },
              // 'from' the formatted value.
              // Receives a string, should return a number.
              from: function (value) {
                  return parseFloat(value).toFixed(4);
              }
          };

          noUiSlider.create(botBuySlider, {
            start: [0],
            range: {
                'min': [botBuyBalanceRanges[0]/2],
                'max': [botBuyBalanceRanges[botBuyBalanceRanges.length-1]]
            },
            //step: botBuyBalance/8,
            format: format,
              /*format: {
                    // 'to' the formatted value. Receives a number.
                    to: function (value) {
                        return parseFloat(value).toFixed(4);
                    },
                    // 'from' the formatted value.
                    // Receives a string, should return a number.
                    from: function (value) {
                        return parseFloat(value).toFixed(4);
                    }
                },
            
                tooltips: true,
                pips: {
                      mode: 'values',
                      values: [botBuyBalanceRanges[0], botBuyBalanceRanges[botBuyBalanceRanges.length-1]],
                      density: 2
                  }
                  */
            
              //pips: { mode: 'steps', format: format },
          });

          
          noUiSlider.create(botSellSlider, {
            start: [0],
            range: {
                'min': [botSellBalanceRanges[0]/2],
                'max': [botSellBalanceRanges[botSellBalanceRanges.length-1]]
            },
            format: format,
            //pips: { mode: 'steps', format: format },
          });
           

          var botBuyBalanceInput = document.querySelector('input[data-bot="buyBalance"]');
            
          botBuySlider.noUiSlider.on('update', function (values, handle) {
              botBuyBalanceInput.value = values[handle];
          });

          botBuyBalanceInput.addEventListener('change', function () {
              botBuySlider.noUiSlider.set(this.value);
          });

          var botSellBalanceInput = document.querySelector('input[data-bot="sellBalance"]');
            
          botSellSlider.noUiSlider.on('update', function (values, handle) {
              botSellBalanceInput.value = values[handle];
          });

          botSellBalanceInput.addEventListener('change', function () {
              botSellSlider.noUiSlider.set(this.value);
          });


          //refresh slider options
        //}
      }


      //render market trade history
      xybot.marketTradesUpdate();

    }

    if (pageName === "orders") {
      xybot.update_userorders();
    }


  });

  //initiate auth pages elements and their values
  xybot.page.init = function() {

    //Page: Orders
    
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
    var marketOptions = '';
    var market_maintenance = '';

    for (var [market, pairs] of Object.entries(base_markets)) {

      marketOptions = '<optgroup label="' + market + ' Markets">';

      for (let i = 0; i < pairs.length; i++) {
        if (ych.data.markets[pairs[i]].service == true) //maintenance mode
          market_maintenance = ' (maintenance)';
        marketOptions += '<option value="' + pairs[i] + '">' + pairs[i] + market_maintenance + '</option>';
        market_maintenance = '';
      }
      marketOptions += '</optgroup >';
      
      //append marketPairs to all "select-markets" element
      selectMarketEl.each(function() {
        $(this).append(marketOptions);
      });

      marketOptions = ''; //empty the options after each market base
    }


    //var usdrate = ych.data.coininfos[selected_market_pair[0]].ext.priceext;
    



    //Buy/Sell Orders Table
    console.log('trigger market change on select');
    //selectMarketEl.trigger('change');


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
          const txout_sign_wei = txout_sign * sat;

          const sig = ych.evm_sign1(
            ych.address[coinb],
            state1,
            txout_sign_wei,
            ych.evm_zeroaddr,
            txout.nout+1);
          const sigs = [sig];

          let signed_txinp = {};
          signed_txinp.txid = txout.txid;
          signed_txinp.nout = txout.nout;
          signed_txinp.amnt = txout.amount;
          signed_txinp.fill = txout.filled;
          signed_txinp.usea = amount;
          signed_txinp.sigf = "";
          signed_txinp.sigv = txout_sign;
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
      url: 'https://' + xybot.network + window.ych_buy_path,
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
          if (xybot.dexyBot.isRunning()) {
            //$('#data_bot_log tbody tr:first-child td[data-label="Message"] div').append(`<br>buftext: ${buftext}`);
            xybot.buftextBot = buftext;
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

  // modal form
  // user confirms the password when privkey is not present!
  $('#form-pass1-inp-password-verify').click(async function(event) {
      //[uprvkey, upubkey] = ych.user_keys_v1(ych.user, upass);
      
      const userEmail = ych.user;
      const userPass = $('#form-pass1-inp-password').val();

      let uprvkey = "";
      let upubkey = "";
      [uprvkey, upubkey] = ych.user_keys_v1(userEmail, userPass);
      if (upubkey === ych.pubkey1) {
        ych.prvkey1 = uprvkey;

        $('#modal-privkey').modal('hide');
      } else {
        $('#form-pass1-inp-password-status').removeClass('hidden');
      }

  });
  $('#modal-privkey').keypress(function(e) {
    if (e.which === 13) { // Check if the Enter key was pressed (key code 13)
      e.preventDefault(); // Prevent the form from being submitted
      // Your code to handle the Enter key press goes here
      // For example, you can call a login function
      $('#form-pass1-inp-password-verify').click();
    }
  });


  //is privkey is set in sessionstorage
  //if not user should write in their password
  xybot.checkPrivKey = function() {
    let privKeyIsAvailable = true;
    
    //if private key is not present in sessionStorage, 
    //users should write in their password to generate the private key!
    if (!ych.prvkey1) {
      $('#modal-privkey').modal('show');
      
      
      privKeyIsAvailable = false;
    }

    return privKeyIsAvailable;
  };

  $('#makebuy-button').click(async function(event) {
    event.preventDefault();

    //check if privkey is set in sessionstorage
    if (!xybot.checkPrivKey())
      return;

    $(this).prop('disabled', true);
    $(this).children('.spinner').removeClass('hidden');

    const price = buyPriceInput.val();
    const amount = buyAmountInput.val()
    let order = {success: 'Success', alert: 'alert-success', message: 'Order Placed!', orderid: ''};

    /*let buyCall = xybot.promisify( xybot.part.buy_call  );
    buyCall(1871.74978924, 0.1).then((data) => {
      console.log('===buyCall: ', data);
    }).catch((error) => {
      console.log('===buyCall Catch: ', error);
    }).then(() => {
      
      console.log('===buyCall Done: ');
    });
    */
    let isSuccess = false;
    let placeOrderCall;
    try {
      placeOrderCall = await xybot.part.buy_call(price, amount);
      console.log('placeOrderCall: ', placeOrderCall);
      isSuccess = placeOrderCall.ok;

      if (!isSuccess) {
        order = {success: 'Failed', alert: 'alert-danger', message: placeOrderCall.error};
        console.log(`Buy Call - Failed: `);
      } else
        order.id = placeOrderCall.index;
    } catch (error) {
      order = {success: 'Error', alert: 'alert-danger', message: error.toString()};
      console.log(`Buy Call - Catch: `, error);
    }

    $(this).children('.spinner').addClass('hidden');
    $(this).prop('disabled', false);


    if (isSuccess) {
      iziToast.success({
        icon: 'ti ti-check',
        title: 'Success',
        message: `Buy order created with orderId: ${order.id}!`,
      });
    } else {
      iziToast.error({
        icon: 'ti ti-alert-circle',
        title: 'Error',
        message: `Buy order failed: ${order.message}!`,
      });
    }


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

    //var priceAmount1 = BigInt(price * 1e8);
    //var quantity1 = BigInt(amounta * 1e8);
    //console.log('priceAmount1: ' + priceAmount1);
    //console.log('quantity1: ' + quantity1);

    price = ych.gui.get_bigIntValue(price);
    amounta = ych.gui.get_bigIntValue(amounta);
    console.log('price: ' + price);
    console.log('amounta: ' + amounta);

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
          const txout_sign_wei = txout_sign * sat;

          const sig = ych.evm_sign1(
            ych.address[coina],
            state1,
            txout_sign_wei,
            ych.evm_zeroaddr,
            txout.nout+1);
          const sigs = [sig];

          let signed_txinp = {};
          signed_txinp.txid = txout.txid;
          signed_txinp.nout = txout.nout;
          signed_txinp.amnt = txout.amount;
          signed_txinp.fill = txout.filled;
          signed_txinp.usea = amount;
          signed_txinp.sigf = "";
          signed_txinp.sigv = txout_sign;
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
      url: 'https://' + xybot.network + window.ych_sell_path,
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
          if (xybot.dexyBot.isRunning()) {
            //$('#data_bot_log tbody tr:first-child td[data-label="Message"] div').append(`<br>buftext: ${buftext}`);
            xybot.buftextBot = buftext;
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

    //check if privkey is set in sessionstorage
    if (!xybot.checkPrivKey())
      return;

    $(this).prop('disabled', true);
    $(this).children('.spinner').removeClass('hidden');
    
    const price = sellPriceInput.val();
    const amount = sellAmountInput.val()
    let order = {success: 'Success', alert: 'alert-success', message: 'Order Placed!', id: ''};

    let isSuccess 
    try {
      const placeOrderCall = await xybot.part.sell_call(price, amount);
      isSuccess = placeOrderCall.ok;

      if (!isSuccess) {
        order = {success: 'Failed', alert: 'alert-danger', message: placeOrderCall.error};
        console.log(`Sell Call - Failed: `);
      } else
        order.id = placeOrderCall.index;
    } catch (error) {
      console.log(`Sell Call - Catch: `, error);
      order = {success: 'Error', alert: 'alert-danger', message: error.toString()};
    }
    $(this).children('.spinner').addClass('hidden');
    $(this).prop('disabled', false);

    

    if (isSuccess) {
      iziToast.success({
        icon: 'ti ti-check',
        title: 'Success',
        message: `Sell order created with orderId: ${order.id}!`,
      });
    } else {
      iziToast.error({
        icon: 'ti ti-alert-circle',
        title: 'Error',
        message: `Sell order failed: ${order.message}!`,
      });
    }



  });


  //PART market NO BUY - Cancel Buy
  xybot.part.nobuy_call = function(orderid, coinaa = '', coinbb = '') {

    //coina = ych.data.markets[ych.gui.current_market].coina;
    //coinb = ych.data.markets[ych.gui.current_market].coinb;
    const coina = coinaa ? coinaa : ych.data.markets[ych.gui.current_market].coina;
    const coinb = coinbb ? coinbb : ych.data.markets[ych.gui.current_market].coinb;


    return $.ajax({
      type: "PUT",
      url: 'https://' + xybot.network + window.ych_nobuy_path,
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

    const coina = coinaa ? coinaa : ych.data.markets[ych.gui.current_market].coina;
    const coinb = coinbb ? coinbb : ych.data.markets[ych.gui.current_market].coinb;

    //ych.data.markets[ych.gui.current_market].coina
    return $.ajax({
      type: "PUT",
      url: 'https://' + xybot.network + window.ych_nosell_path,
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




/*Orders Page - Cancel orders*/
$('#userOrders').on('click', '.flex-tr button.btn-close', async function(e) {

  let isCancelSuccess = false;
  let orderId = '';
  try {
    orderId = $(this).data('order-index');
    const orderSide = $(this).data('order-side');
    const orderCoina = $(this).data('order-coina');
    const orderCoinb = $(this).data('order-coinb');

    // Check if orderId, orderCoina, and orderCoinb are defined
    if (!orderId || !orderCoina || !orderCoinb || !["sell", "buy"].includes(orderSide)) {
      throw('orderCanel - Invalid order data. Cannot proceed with cancellation.');
      return;
    }

    console.log('userOrders - Cancel orderId: ' + orderId);

    //try to Cancel the order
    let cancelCall;
    if (orderSide === "buy")
      cancelCall = await xybot.part.nobuy_call(orderId, orderCoina, orderCoinb);
    else if (orderSide === "sell")
      cancelCall = await xybot.part.nosell_call(orderId, orderCoina, orderCoinb);

    // Check if the cancel order was successful
    isCancelSuccess = cancelCall.ok;

    if (isCancelSuccess) {
      // Find the closest row with the attribute [table-sort-row]
      const row = $(this).closest('[table-sort-row]');
      if (row.length) {
        // Perform the action you want when .btn-close is clicked
        // For example, you can remove the row from the table:
        row.remove();

        
      }
    } else {
      console.log('Error in cancelling the order');
    }
  } catch (error) {
    console.log(`orderCanel (${orderId}) - Error Catch:`, error);
  }

  if (isCancelSuccess) {
    iziToast.success({
      icon: 'ti ti-check',
      title: 'Success',
      message: `Successfully cancelled orderId: ${orderId}!`,
    });
  } else {
    iziToast.error({
      icon: 'ti ti-alert-circle',
      title: 'Error',
      message: `Error in cancelling orderId: ${orderId}!`,
    });
  }

});








/*select markets dropdown - page header*/

class SelectMenu {
  constructor(optionsData = []) {
    this.bodyEl = document.getElementsByTagName('body')[0];
    this.selectMenu = document.querySelector(".select-menu");
    this.selectBtn = this.selectMenu.querySelector(".select-btn");
    this.selectedOptionLeft = this.selectBtn.querySelector(".selected-option-left");
    this.selectedOptionCenter = this.selectBtn.querySelector(".selected-option-center");

    this.selectedInp = this.selectMenu.querySelector("input.selected-input");
    this.searchInp = this.selectMenu.querySelector("input.select-search-input");
    this.optionsList = this.selectMenu.querySelector(".options");
    this.menuContent = this.selectMenu.querySelector(".menu-content");

    this.switchMarket = this.menuContent.querySelector('.select-tab-switch');
    this.selectOptionsEmpty = this.menuContent.querySelector('.select-menu-search-empty');
    this.selectOptionsEmptyWord = this.selectOptionsEmpty.querySelector('.select-menu-search-empty-word');

    this.clearSearch = this.selectMenu.querySelector('.clear-icon');

    this.optionsData = optionsData;
    this.selectedOption = null;
    this.menuOpen = false;
    this.debounceTimeout = null;

    this.init();
  }

  init() {
    this.addOptions();
    this.addEventListeners();
  }

  selectOption(selectedLi) {
    this.selectedOption = selectedLi.dataset.selectMarket;
     // Split the comma-separated values into an array using destructuring
    const [coina, coinb, market, iconcoina, iconcoinb] = selectedLi.dataset.selectMarketMenu.split(",");

    this.selectedInp.value = this.selectedOption;
    this.selectedOptionCenter.innerHTML = `<span class="coina">${coina}</span><span class="text-muted fw-normal coinb">/${coinb}</span>`;
    //this.selectedOptionLeft.innerHTML = `<img src="./assets/images/crypto/${iconcoina}">`;
    this.selectedOptionLeft.innerHTML = `
                      <div class="">
                        <figure class="avatar_with_badge">
                          <img src="./assets/images/crypto/${iconcoina}" class="avatar_main">
                          <img src="./assets/images/crypto/${iconcoinb}" class="avatar_badge">
                        </figure>
                      </div>`;

    
    // Remove "selected" class from other options
    const selectedOptions = this.optionsList.querySelectorAll(".selected");
    selectedOptions.forEach(option => {
      option.classList.remove("selected");
    });
    selectedLi.classList.add("selected"); // Add "selected" class to the new selected option
    
    
    //this.addOptions();
    this.toggleMenu(false); // Hide menu content after selecting an option

    //
    this.selectedInp.dispatchEvent(new Event("change", { bubbles: true }));
  }

  filterOptions(searchWord) {
    const selectedTabSwitch = this.switchMarket.querySelector(".selected");
    const baseFilter = selectedTabSwitch.textContent.trim().toLowerCase();

    let hasMatchingOptions = false; // Variable to track if there are matching options

    this.optionsData.forEach(data => {
      const listItem = this.optionsList.querySelector(`div.item[data-value="${data.value}"]`);
      const baseMatches = baseFilter === "all" || data.base.toLowerCase() === baseFilter;
      const matchesSearchWord = data.text.toLowerCase().includes(searchWord);

      if (baseMatches && matchesSearchWord) {
        listItem.classList.remove('hidden'); // Show the item when it matches the search and base filter
        //listItem.style.display = "flex"; // Show the item when it matches the search and base filter
        hasMatchingOptions = true; // Set the variable to true when there's a match
      } else {
        //listItem.style.display = "none"; // Hide the item when it doesn't match the search and base filter
        listItem.classList.add('hidden');
      }
    });

    this.optionsList.querySelectorAll("div.item").forEach(item => {
      if(!item.dataset.base)
        return;
      const baseMatches = baseFilter === "all" || item.dataset.base.toLowerCase() === baseFilter;
      const matchesSearchWord = item.textContent.toLowerCase().includes(searchWord);

      if (baseMatches && matchesSearchWord) {
        item.classList.remove("hidden"); // Show the item when it matches the search and base filter
        hasMatchingOptions = true; // Set the variable to true when there's a match
      } else {
        item.classList.add("hidden"); // Hide the item when it doesn't match the search and base filter
      }
    });

    // Show/hide the message based on the hasMatchingOptions variable
    if (!hasMatchingOptions) {
      if (this.selectOptionsEmpty.classList.contains('hidden')) {
        this.selectOptionsEmpty.classList.remove('hidden');
      }
      this.selectOptionsEmptyWord.textContent = searchWord;
    } else {
      if (!this.selectOptionsEmpty.classList.contains('hidden')) {
        this.selectOptionsEmpty.classList.add("hidden");
      }
    }
  }

  debouncedFilterOptions() {
    const searchWord = this.searchInp.value.toLowerCase();
    const searchWordIsBold = this.searchInp.classList.contains("fw-bold");

    if (searchWord === "") {
      if (searchWordIsBold) 
        this.searchInp.classList.remove("fw-bold");
    } else {
      if (!searchWordIsBold) 
        this.searchInp.classList.add("fw-bold");
    }
    
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.filterOptions(searchWord);
    }, 300);
  }

  toggleMenu(show = !this.menuOpen) {
    
  const backdropElement = document.getElementById('backdrop-custom');
  this.menuOpen = show;
  this.selectMenu.classList.toggle("active", this.menuOpen);
  this.menuContent.classList.toggle("closing", !this.menuOpen); // Add the "closing" class immediately to start the closing animation
  if (this.menuOpen) {
    this.menuContent.style.display = "block"; // Show the menu content immediately when opening
    backdropElement.style.display = 'block';
    this.bodyEl.classList.add('overflow-hidden');

  } else {
    // Hide the menu content after the closing animation ends
    const onAnimationEnd = () => {
      this.menuContent.classList.remove("closing");
      this.menuContent.removeEventListener("animationend", onAnimationEnd);

      // Check if the menu is still closed after the animation ends
      const isActive = this.selectMenu.classList.contains("active");
      if (!isActive) {
        this.menuContent.style.display = "none";
      }
    };
    this.menuContent.addEventListener("animationend", onAnimationEnd);
    backdropElement.style.display = 'none';
    this.bodyEl.classList.remove('overflow-hidden');
  }
}

  addOptions() {
    const optionsHTML = this.optionsData.map(data => {
      const isSelected = data.value === this.selectedOption ? "selected" : "";
      return `<div class="item ${isSelected}" data-value="${data.value}" data-select-market="${data.coina}-${data.coinb}" data-select-market-menu="${data.coina},${data.coinb},${data.market},${data.iconcoina},${data.iconcoinb}">
            <div>
            <a href="trade/${data.name}" class="stretched-link">
              <img src="./assets/images/crypto/${data.iconcoina}"> 
              <span class="coina">${data.coina}</span><span class="text-muted fw-normal coinb">/${data.coinb}</span>
            </div>
            <div class="d-flex flex-column text-end fs-5">
              <div><span class="text-muted">Price</span></div>
              <div><span class="fw-bold">0.0076255</span> <span class="text-muted">${data.coinb}<span></div>
            </a>  
            </div>
            
          </div>`;
    }).join("");

    this.optionsList.innerHTML = optionsHTML;
  }

  addEventListeners() {
    // Add click event listener to the "select-tab-switch" element
    this.switchMarket.addEventListener("click", event => {
      const clickedButton = event.target.closest(".item-switch");
      if (clickedButton) {
        this.switchMarket.querySelector(".selected").classList.remove("selected");
        clickedButton.classList.add("selected");
        this.filterOptions(this.searchInp.value.toLowerCase()); // Filter options based on the selected button
      }
    });


    this.searchInp.addEventListener("keyup", this.debouncedFilterOptions.bind(this));

    // Clear Search button event listener
    this.clearSearch.addEventListener("click", () => {
      this.searchInp.value = ""; // Clear the search input
      this.filterOptions(""); // Trigger filtering with an empty search word
    });

    this.optionsList.addEventListener("click", event => {
      if (!this.menuOpen) return; // Do nothing if the menu is closed
      const selectedLi = event.target.closest("div.item");
      if (selectedLi) {
        this.selectOption(selectedLi);
      }
    });

    this.selectBtn.addEventListener("click", () => {
      this.toggleMenu();
    }); 

    document.addEventListener("click", event => {
      const isClickInsideMenu = this.selectMenu.contains(event.target);
      if (!isClickInsideMenu) {
        this.toggleMenu(false);
      }
    });

    this.menuContent.addEventListener("animationend", () => {
      if (this.menuContent.classList.contains("closing")) {
        this.menuContent.classList.remove("closing");
      }
    });
  }
}

/*const optionsData = [
  { value: "TETH2-TBTC", text: '<img src="./assets/images/crypto/ethereum-eth-logo.svg"> TETH2/TBTC', iconcoina: 'ethereum-eth-logo.svg', iconcoinb: 'bitcoin-btc-logo.svg', coina: "TETH2", coinb: 'TBTC', market: 'TETH2/TBTC', name: 'TETH-TBTC', base: "TBTC"},
  { value: "TLTC-TBTC", text: '<img src="./assets/images/crypto/litecoin-ltc-logo.svg"> TLTC/TBTC', iconcoina: 'litecoin-ltc-logo.svg', iconcoinb: 'bitcoin-btc-logo.svg', coina: "TLTC", coinb: 'TBTC', market: 'TLTC/TBTC', name: 'TLTC-TBTC', base: "TBTC" },

  { value: "TBTC-TDAI2", text: '<img src="./assets/images/crypto/bitcoin-btc-logo.svg"> TBTC/TDAI2', iconcoina: 'bitcoin-btc-logo.svg', iconcoinb: 'dai-dai-logo.svg', coina: "TBTC", coinb: 'TDAI2', market: 'TBTC/TDAI2', name: 'TBTC-TDAI2', base: "TDAI2" },
  { value: "TETH2-TDAI2", text: '<img src="./assets/images/crypto/ethereum-eth-logo.svg"> TETH/TDAI2', iconcoina: 'ethereum-eth-logo.svg', iconcoinb: 'dai-dai-logo.svg', coina: "TETH2", coinb: 'TDAI2', market: 'TETH2/TDAI2', name: 'TETH2-TDAI2', base: "TDAI2" },
];

//generate frontend addresses, for testing purpose


coinjs.pub = [111];
  coinjs.priv = [239];
  coinjs.multisig = [196];

coinjs.privkey2wif("7017afeb6e7ddb54e8a72bd890d65478513577873d6b828fb8d8f00a6fadf5db");

coinjs.wif2privkey("92SHR6zADcAuEBDsdF8ghUKLnsevoKGpKfu4WU3YMyebtcNMtBK");

coinjs.pubkeys2MultisigAddressWithBackup("03d5dc06be6cd1059777a5f7706b1da7924c195cca50cce6d913b7ca0a0e121f95", "0304f636703a7179e3a94064b89ffbcf27f9dd1f8cad7a2ef3e89895ba230ac8df", 1706400000,1737936000)
{
  "address": "bchtest:pphxtmkxm76fn68jd4zk7mmnh2q5x0dqdu39khlk7k",
  "redeemScript": "63522103d5dc06be6cd1059777a5f7706b1da7924c195cca50cce6d913b7ca0a0e121f95210304f636703a7179e3a94064b89ffbcf27f9dd1f8cad7a2ef3e89895ba230ac8df52ae6763040099b565b1752103d5dc06be6cd1059777a5f7706b1da7924c195cca50cce6d913b7ca0a0e121f95ac670480cc9667b175210304f636703a7179e3a94064b89ffbcf27f9dd1f8cad7a2ef3e89895ba230ac8dfac6868"
}
*/

const selectMenuInstance = new SelectMenu();

  
  /* Switch Network */

$('a[data-set-network]').on('click', function(e) { 
  const network = $(this).attr('data-set-network');

  if (network == 'mainnet')
  	xybot.network = xybot.api.mainnet;
  else
  	xybot.network = xybot.api.testnet;
  
  console.log('==Set Network: ', network);

  iziToast.settings({
      timeout: 5000, // default timeout
      resetOnHover: false,
      pauseOnHover: true,
      // icon: '', // icon class
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      // color: 'dark',
      //theme: 'dark', // 
      //progressBarColor: 'rgb(0, 255, 184)',
      position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      onOpen: function () {
        
      },
      onClose: function () {
        

      }
    });
      
    iziToast.show({
      //color: 'dark',
      overlay: true,
      layout: 2,
      icon: 'ti ti-network',
      title: '<span class="text-muted">NightTrader Network:</span> '+network+'',
      message: '<div class="pt-2 pb-2"><img src="./assets/images/nighttrader.svg" class="icon icon32 icon24 svg_icon purple pe-2"> You switched network. Page will be reloaded...!</div>',
      position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
      progressBarColor: '#5f52d6',

      onClosing: function(instance, toast, closedBy){
        console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
        location.reload();	//refresh the page
    	}
    });

    //set the default network in session storage
    storage_s.set('xybot', { 'network': network });

    Router.navigate('logout');

});
  
  
  /* bottom menu /mobile menu related*/
  $('#bottom_menu a').click(function() {
      // Find the checkbox within the clicked <a> element
      var radio = $(this).find('input[type="radio"]');
      
      // Check the radio
      radio.prop('checked', true);
  });


  /* trade layout*/
  $('#trade .btn-show').on('click', function(){
    $('#trade .container').toggleClass('show-border');
    $('#trade .element').toggleClass('show-border');
  });
  
  const tabButtons = $('#trade .tab-button');
  const tabContents = $('#trade .elemento');

  /*
   $('#trade [data-show-tab]').on('click', function() {
        var dataShowTabValue = $(this).attr('data-show-tab');
        var number = dataShowTabValue.split('-')[1];
        console.log('Clicked on tab number:', number);
        TradeShowTab(number);
        // Add your code to handle the click event here
    });
   */


    function tradeShowTab(tabIndex) {
      tabContents.each(function(index) {
        if (index === tabIndex) {
          $(this).addClass('active');
        } else {
          $(this).removeClass('active');
        }
      });
    }

    tabButtons.on('click', function() {
      tradeShowTab($(this).index());
    });


  /*tab indicator*/
  $(".addTabIndicator").each(function(index, addIndicator) {
    initializeIndicator(addIndicator);
    updateIndicator(addIndicator);
  });

  function initializeIndicator(addIndicator) {
    var listItems = $(addIndicator).find("li");
    listItems.each(function(index, element) {
      if (
        $(element).hasClass("active") ||
        $(element)
          .find("a")
          .hasClass("active")
      ) {
        $(addIndicator).prepend("<span class='indicator'></span>");
        var indicator = $(addIndicator).find(".indicator");
        $(indicator).css({
          left: $(element).position().left,
          width: $(element).outerWidth()
        });
      }
    });
  }

  function updateIndicator(addIndicator) {
    var indicator = $(addIndicator).find(".indicator");
    var listItems = $(addIndicator).find("li");
    if (indicator) {
      $(listItems).each(function(aindex, element) {
        $(element).on("click", function() {
          $(indicator).css({
            left: $(element).position().left,
            width: $(element).outerWidth()
          });
        });
      });
    }
  }
}); //<<JQuery ?




