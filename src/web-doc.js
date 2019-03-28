export class DocCall {
  apiTemplate(url) {
    var Promise = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      requestResolveOrReject(request, resolve, reject, url);
    })
  }
  promiseSetup(step, vars = [`Portland,OR`, [`doctors`, `45.520247,-122.674195`]]) {
    const keys = [process.env.mapKey, process.env.exports.apiKey];
    const url = [`http://open.mapquestapi.com/geocoding/v1/address?key=${keys[step]}&location=${vars[0]}`, `https://api.betterdoctor.com/2016-03-01/${vars[1][0]}?location=${vars[1][1]},100&skip=0&limit=100&user_key=${keys[step]}`][step];
    return this.apiTemplate(url);
  }
}

function requestResolveOrReject(request, resolve, reject, url) {
  request.onload = function() {
    if (request.status === 200) {
      resolve(request.response);
    } else {
      reject(Error(request.statusText));
    }
  }
  request.open("GET", url, true);
  request.send();
}
