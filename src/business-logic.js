import DocCall from './web-doc.js';

export function getCoordinatesReturnDoctors(docCall) {
  return function(response) {
    const coordsObj = JSON.parse(response).results[0].locations[0].displayLatLng;
    const coords = `${coordsObj.lat},${coordsObj.lng}`;
    return docCall.getPromise(`doctors`, coords);
  }
}
