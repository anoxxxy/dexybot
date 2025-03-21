/*!
  * RouterJS v1.3.0 (https://wwwinterart.com/)
  * Copyright 2018-2019 Silvio Delgado (https://github.com/silviodelgado)
  * Licensed under MIT (https://opensource.org/licenses/MIT)
  * https://github.com/silviodelgado/routerjs
  * Modified by Anoxy anoxydoxy@gmail.com
  * added parseUrl for easy access to the parameters
  * http://site.com#products?param1=val1&param2&val2.....
  */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.Router = factory(root);
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function (root) {
    'use strict';

    let internal = {
        routes: [],
        history: [],
        urlParams: {},
        run_before: null,
        run_after: null
    };

    const run_before = () => {
        if (typeof internal.run_before == 'function' && internal.run_before) {
            internal.run_before.call(this);
        }
    };

    const run_after = () => {
        if (typeof internal.run_after == 'function' && internal.run_after) {
            internal.run_after.call(this);
        }
    };

    const router = {
        getFragment: () => {
            //console.log('===getFragment===');
            var r;
            if(window.location.hash != "")
                r = window.location.hash.replace(/\/$/, '');
            else
                r = window.location.search.replace(/\/$/, '');
            //console.log('>>r: ', r);
            return r;

        },
        add: (route, handler) => {
            //console.log('===add===');
            //console.log('route: : ', route);
            if (typeof route == 'function') {
                handler = route;
                route = '';
            }
            internal.routes.push({
                handler: handler,
                route: route
            });
            return router;
        },
        beforeAll: (handler) => {
            //console.log('**beforeAll**');
            internal.run_before = handler;
            return router;
        },
        afterAll: (handler) => {
            //console.log('**afterAll**');
            internal.run_after = handler;
            return router;
        },
        apply: (frg) => {
            //console.log('===apply===');
            //console.log('frg: : ', frg);

            let fragment = frg || router.getFragment();
            //console.log('fragment: ', fragment);

            for (let i = 0; i < internal.routes.length; i++) {
                let matches = fragment.match(internal.routes[i].route);
                console.log('matches: ', matches);
                if (matches) {
                    //matches.shift(); //remove the matched string
                    router.parseUrl(matches);    //parse url parameters
                    if (!internal.history[fragment])
                        internal.history.push(fragment);
                    run_before();
                    //internal.routes[i].handler.apply({}, matches);
                    //console.log('internal.routes[i].handler: ', internal.routes[i].handler);
                    
                    internal.routes[i].handler.apply({}, [matches]);  //pass parameter as array, //this.routes[i].handler.apply({}, [matches]); 
                    run_after();
                    return router;
                }
            }

            return router;
        },
        start: () => {
            //console.log('===start===');
            let current = router.getFragment();
            //console.log('>>current: ', current);
            window.onhashchange = function () {
                if (current !== router.getFragment()) {
                    current = router.getFragment();
                    router.apply(current);
                    //console.log('>>self.apply(current): ', current);
                }
            }
            return router;
        },
        navigate: (path, title) => {
            /*document.title = title || document.title;
            path = path.replace(/##/g, '#') || '';
            window.location.hash = path ? '#' + path : '';
            return router;
            */
            console.log('===navigate===');
            document.title = title || document.title;
            path = path ? path : '';
            path = path.replace(/##/g, '#') || '';
            
            //path = path.replace('?', '#') || '';
            //console.log('path: ', path);
            window.location.hash = path ? '#' + path : '';
            return this;
        },
        clearHash: () => {
            console.log('===clearHash===');
            window.location.hash = '#';
            history.pushState(null, document.title, window.location.pathname + window.location.search);
        },
        back: () => {
            console.log('===back===');
            internal.history.pop();
            let path = internal.history.pop();
            path = path || '';
            window.location.hash = path;
            return router;
        },
        checkFragment: (current) => {
            //console.log('===checkFragment===');
            //console.log('current: ', current);
            return router.getFragment().indexOf(current) >= 0;
        },
        parseUrl: function (url) {
          if (Array.isArray(url))
            url = url[0];

          url = url.trim(); // Trim the URL
  
          let hashIndex = url.indexOf('#'); // Find the index of '#'
          let urlFragment, queryStringIndex;

          if (hashIndex === -1) {
            urlFragment = url; // Use the entire URL as the URL fragment
          } else {
            urlFragment = url.slice(hashIndex + 1); // Get the URL fragment after '#'
          }

          queryStringIndex = urlFragment.indexOf('?'); // Find the index of '?'

          let pathString = urlFragment;
          let paramString = '';

          if (queryStringIndex !== -1) {
            pathString = urlFragment.slice(0, queryStringIndex); // Extract the path string
            paramString = urlFragment.slice(queryStringIndex + 1); // Extract the parameter string
          }

          const path = pathString === '/' ? [] : pathString.includes('/') ? pathString.split('/').filter(Boolean) : []; // Split the path string into segments
          const params = {};

          if (paramString !== '') {
            const paramPairs = paramString.split('&'); // Split the parameter string into key-value pairs
            for (let i = 0; i < paramPairs.length; i++) {
              const pair = paramPairs[i];
              const equalIndex = pair.indexOf('=');
              if (equalIndex !== -1) {
                const key = pair.slice(0, equalIndex); // Extract the parameter key
                const value = decodeURIComponent(pair.slice(equalIndex + 1)); // Extract the parameter value and decode it
                params[key] = value; // Store the parameter in the params object
              }
            }
          }

            //const page = (path.length > 0 ? path[0] : urlFragment.replace(/^#([^?]+)(\?.*)?$/, '$1') || null);
          const page = path.length > 0 ? path[0] : pathString === '/' ? null : pathString || null;

          const output = {
            "urlString": urlFragment,
            "pathString": pathString,
            "path": path,
            "paramString": paramString,
            "param": params,
            "page": page
          };
        this.urlParams = output;

        console.log('this.urlParams output: ', output);
        console.log('this.urlParams: ', this.urlParams);
          return output;
        }
    };

    return router;
});

/*
function parseURL(url) {
  let hashIndex = url.indexOf('#'); // Find the index of '#'
  let urlFragment, queryStringIndex;

  if (hashIndex === -1) {
    urlFragment = url; // Use the entire URL as the URL fragment
  } else {
    urlFragment = url.slice(hashIndex + 1); // Get the URL fragment after '#'
  }

  queryStringIndex = urlFragment.indexOf('?'); // Find the index of '?'

  let pathString = urlFragment;
  let paramString = '';

  if (queryStringIndex !== -1) {
    pathString = urlFragment.slice(0, queryStringIndex); // Extract the path string
    paramString = urlFragment.slice(queryStringIndex + 1); // Extract the parameter string
  }

  const path = pathString.includes('/') ? pathString.split('/').filter(Boolean) : []; // Split the path string into segments
  const params = {};

  if (paramString !== '') {
    const paramPairs = paramString.split('&'); // Split the parameter string into key-value pairs
    for (let i = 0; i < paramPairs.length; i++) {
      const pair = paramPairs[i];
      const equalIndex = pair.indexOf('=');
      if (equalIndex !== -1) {
        const key = pair.slice(0, equalIndex); // Extract the parameter key
        const value = decodeURIComponent(pair.slice(equalIndex + 1)); // Extract the parameter value and decode it
        params[key] = value; // Store the parameter in the params object
      }
    }
  }

  //const page = (path.length > 0 ? path[0] : urlFragment.replace(/^#([^?]+)(\?.*)?$/, '$1') || null);
  const page = path.length > 0 ? path[0] : pathString || null;

  const output = {
    "urlString": urlFragment,
    "pathString": pathString,
    "path": path,
    "paramString": paramString,
    "param": params,
    "page": page
  };

  return output;
}

// Example usage:
var url1 = "";
var url2 = "/#king/subpage?asset=btc&do=what";
var url3 = "         /#/walletICE/subpage?asset=btc&do=what                 ";
var url4 = "         #attans/wallet/subpage?asset=btc&do=what&och=sendå&asas/asas                 ";
var url5 = "         attans/wallet/subpage?asset=btc&do=what&och=sendå&asas/asas                 ";
var url6 = "#";
var url7 = "/#";
var url8 = "#/";
var url9 = "#about";
var url10 = "#/about";
var url11 = "/#/about";
var url12 = "about";
var url13 = "#about?kalle=aa";
var url14 = "about?kalle=aa";
var url15 = "/about?kalle=aa";
var url16 = "/#/page/subpage/";
var url17 = "#/page/subpage/";
var url18 = "/page/subpage/";

var result1 = parseURL(url1);
var result2 = parseURL(url2);
var result3 = parseURL(url3);
var result4 = parseURL(url4);
var result5 = parseURL(url5);
var result6 = parseURL(url6);
var result7 = parseURL(url7);
var result8 = parseURL(url8);
var result9 = parseURL(url9);
var result10 = parseURL(url10);
var result11 = parseURL(url11);
var result12 = parseURL(url12);
var result13 = parseURL(url13);
var result14 = parseURL(url14);
var result15 = parseURL(url15);
var result16 = parseURL(url16);
var result17 = parseURL(url17);
var result18 = parseURL(url18);
console.log('result1: ', result1);
console.log('result2: ', result2);
console.log('result3: ', result3);
console.log('result4: ', result4);
console.log('result5: ', result5);
console.log('result6: ', result6);
console.log('result7: ', result7);
console.log('result8: ', result8);
console.log('result9: ', result9);
console.log('result10: ', result10);
console.log('result11: ', result11);
console.log('result12: ', result12);
console.log('result13: ', result13);
console.log('result14: ', result14);
console.log('result15: ', result15);
console.log('result16: ', result16);
console.log('result17: ', result17);
console.log('result18: ', result18);


*/