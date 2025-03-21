/*!
* ych SPA exchange
*
* Copyright Lynxline LLC, yshurik, 2019-2023,
* Common Clause license https://commonsclause.com/
*/

var jsonBNparse = function(key, value) {
  if (typeof value === 'string' && /^\-?\d+n$/.test(value)) {
    return BigInt(value.slice(0, -1));
  }
  return value;
}

$( function() {

console.log("Init utils");

ych.is_logged = function() {
  let is_logged = false;
  let jwt = ych.get_cookie('jwt');
  let jwt_parts = jwt.split('.');
  if (jwt_parts.length == 3) {
    let b64 = jwt_parts[1].replace('-', '+').replace('_', '/');
    let jwt_info = JSON.parse(window.atob(b64));
    if ('uid' in jwt_info) {
      is_logged = true;
    }
  }
  return is_logged;
};

ych.get_cookie = function(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};


});

