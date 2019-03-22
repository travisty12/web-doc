export class DocCall {
  getPromise(coords) {
    var Promise = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const apiKey = process.env.exports.apiKey;
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${coords},100&skip=0&limit=100&user_key=${apiKey}`;
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
  getCoords(location) {

    var Promise = require('es6-promise').Promise;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const mapKey = process.env.mapKey;
      let url = `http://open.mapquestapi.com/geocoding/v1/address?key=${mapKey}&location=${location}`;
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
}
