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
  getPromise(coords) {
    const apiKey = process.env.exports.apiKey;
    const url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${coords},100&skip=0&limit=100&user_key=${apiKey}`;
    return this.apiTemplate(apiKey, url);
  }
  getCoords(location) {
    const mapKey = process.env.mapKey;
    const url = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapKey}&location=${location}`;
    return this.apiTemplate(mapKey, url);
  }
}
