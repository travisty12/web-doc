import { DocCall } from './web-doc.js';
import { addSpecialtyOptions, testFail, initializeUI, returnCoordinatePromise, docMatch, checkNoMatch } from './index.js';

export function getCoordinatesReturnDoctors(docCall) {
  return function(response) {
    const coordsObj = JSON.parse(response).results[0].locations[0].displayLatLng;
    const coords = `${coordsObj.lat},${coordsObj.lng}`;
    return docCall.promiseSetup(1, [void(0),[`doctors`, coords]]);
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
  const initialCall = docCall.promiseSetup(1, [void(0),[`specialties`, `45.520247,-122.674195`]]);
  initialCall.then(specialtyPopulate(), testFail())
  return docCall;
}

export function generateVariables(doc) {
  let output = [doc.profile, doc.profile.image_url, doc.practices[0], doc.practices[0].visit_address, (doc.practices[0].accepts_new_patients ? "" : "not "), (doc.practices[0].website ? ` or at <a href=' ${doc.practices[0].website}'>their website</a>` : ``)];
  return output;
}

export function initializePage() {
  const docCall = initializeBusiness();
  const arr = [`symptom`,`doctor`];
  initializeUI(arr,docCall);
}

function checkIterate(doc, searchSucceed) {
  docMatch(doc);
}

function compareData(doc, i, input, userIn) {
  const choice = [doc.specialties[i].description, doc.profile.last_name];
  if (choice[input].match(userIn)) {
    checkIterate(doc);
    return true;
  } else {
    return false;
  }
}

function dataLoop(data, input, userIn, searchSucceed) {
  data.forEach(function(doc) {
    for (let i = 0; i < doc.specialties.length; i++) {
      if (compareData(doc, i, input, userIn)) {
        searchSucceed = true;
        break;
      }
    }
  })
  return searchSucceed;
}

function searchSuccess(input, userIn) {
  return function(response) {
    let searchSucceed = false;
    const data = JSON.parse(response).data;
    searchSucceed = dataLoop(data, input, userIn, searchSucceed);
    checkNoMatch(searchSucceed, userIn);
  }
}


export function searchCall(input, docCall, userIn) {
  const mapPromise = returnCoordinatePromise(docCall);
  mapPromise.then(getCoordinatesReturnDoctors(docCall), testFail())
  .then(searchSuccess(input, userIn), testFail())
  return;
}
