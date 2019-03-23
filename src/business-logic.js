import { DocCall } from './web-doc.js';
import { addSpecialtyOptions, testFail, initializeUI, returnCoordinatePromise, docMatch, checkNoMatch } from './index.js';

export function getCoordinatesReturnDoctors(docCall) {
  return function(response) {
    const coordsObj = JSON.parse(response).results[0].locations[0].displayLatLng;
    const coords = `${coordsObj.lat},${coordsObj.lng}`;
    return docCall.getPromise(`doctors`, coords);
  }
}

export function specialtyPopulate() {
  return function(response) {
    const data = JSON.parse(response).data;
    addSpecialtyOptions(data,response)
  }
}

export function initializeBusiness() {
  const docCall = new DocCall();
  const initialCall = docCall.getPromise(`specialties`);
  initialCall.then(specialtyPopulate(), testFail())
  return docCall;
}

export function generateVariables(doc) {
  let output = []
  output[0] = doc.profile;
  output[1] = output[0].image_url;
  output[2] = doc.practices[0];
  output[3] = output[2].visit_address;
  output[4] = output[2].accepts_new_patients ? "" : "not ";
  output[5] = output[2].website ? ` or at <a href=' ${output[2].website}'>their website</a>` : ``;
  return output;
}

export function initializePage() {
  const docCall = initializeBusiness();
  const arr = [`symptom`,`doctor`];
  initializeUI(arr,docCall);
}

export function searchCall(input, docCall, userIn) {
  const mapPromise = returnCoordinatePromise(docCall);
  mapPromise.then(getCoordinatesReturnDoctors(docCall), testFail())
  .then(function(response) {
    let searchSucceed = false;
    const data = JSON.parse(response).data;
    data.forEach(function(doc) {
      for (let i = 0; i < doc.specialties.length; i++) {
        const choice = [doc.specialties[i].description, doc.profile.last_name];
        if (choice[input].match(userIn)) {
          docMatch(doc);
          searchSucceed = true;
          break;
        }
      }
    })
    checkNoMatch(searchSucceed, userIn);
  }, testFail())
  return;
}
