import $ from 'jquery';
import './sass/styles.scss';
import { DocCall } from './web-doc.js';

function testFail() {
  return function(error) {
    $("#output").text(`Request failed: ${error.message}`);
  }
}

function returnCoordinatePromise(docCall) {
  $("#input").fadeOut();
  const location = $("#location").val();
  return docCall.getCoords(location);
}

function getCoordinatesReturnDoctors(docCall) {
  return function(response) {
    const coordsObj = JSON.parse(response).results[0].locations[0].displayLatLng;
    const coords = `${coordsObj.lat},${coordsObj.lng}`;
    return docCall.getPromise(`doctors`, coords);
  }
}

function docMatch(doc) {
  const profile = doc.profile;
  const pic = profile.image_url;
  const practice = doc.practices[0];
  const location = practice.visit_address;
  const newPatients = practice.accepts_new_patients ? "" : "not ";
  const hasSite = practice.website ? ` or at <a href=' ${practice.website}'>their website</a>` : ``;
  $("#output").append(`<img src='${pic}'>`);
  $("#output").append(`<p>Dr. ${profile.first_name} ${profile.last_name}, located at ${location.street}, ${location.city} ${location.state} ${location.zip}</p>`);
  $("#output").append(`<p>Dr. ${profile.last_name} can be reached at ${practice.phones[0].number}${hasSite}</p>`);
  $("#output").append(`<p>Dr. ${profile.last_name} is ${newPatients}currently accepting new patients.</p>`);
  return;
}

function checkNoMatch(searchSucceed, userIn) {
  if (!searchSucceed) {
    $("#output").append(`<p>No doctors matched your search for ${userIn}</p>`);
  }
}

function searchCall(input, docCall) {
  const mapPromise = returnCoordinatePromise(docCall);
  mapPromise.then(getCoordinatesReturnDoctors(docCall), testFail())
  .then(function(response) {
    let searchSucceed = false;
    const data = JSON.parse(response).data;
    const userIn = $("#userIn").val();
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

function btnToggle(choice) {
  const options = [`doctor`,`symptom`];
  $(`#${options[choice]}Label`).fadeOut();
  $(`#${options[choice]}Btn`).fadeOut();
  $(`#${options[choice]}`).removeClass('active');
  $(`#${options[1-choice]}`).addClass('active');
  setTimeout(function() {
    $(`#${options[1-choice]}Btn`).fadeIn();
    $(`#${options[1-choice]}Label`).fadeIn();
  }, 400);
}

function specialtyPopulate() {
  return function(response) {
    const data = JSON.parse(response).data;
    for (let i = 0; i < data.length; i++) {
      $("#examples").append(`<option>${data[i].description}</option>`);
    }
  }
}

function initializePage() {
  const docCall = new DocCall();
  const initialCall = docCall.getPromise(`specialties`);
  initialCall.then(specialtyPopulate(), testFail())
  return docCall;
}

$(document).ready(function() {
  const docCall = initializePage();
  $("#symptom").click(function() {
    btnToggle(0);
  });
  $("#doctor").click(function() {
    btnToggle(1);
  });
  $("#symptomBtn").click(function() {
  searchCall(0, docCall);
  });
  $("#doctorBtn").click(function() {
    searchCall(1, docCall);
  });
});
