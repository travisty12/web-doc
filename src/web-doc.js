export class DocCall {
  apiTemplate(key, url) {
    var Promise = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
  getPromise(destination, coords = `45.520247,-122.674195`) {
    const key = process.env.exports.apiKey;
    const url = `https://api.betterdoctor.com/2016-03-01/${destination}?location=${coords},100&skip=0&limit=100&user_key=${key}`;
    return this.apiTemplate(key, url);
  }
  getCoords(location) {
    const key = process.env.mapKey;
    const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${key}&location=${location}`;
    return this.apiTemplate(key, url);
  }
}
