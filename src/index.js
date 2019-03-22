import $ from 'jquery';
import './sass/styles.scss';
import { DocCall } from './web-doc.js';
import { getCoordinatesReturnDoctors } from './business-logic.js';



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

function specialtyPopulate() {
  return function(response) {
    const data = JSON.parse(response).data;
    addSpecialtyOptions(data,response)
  }
}

function initializeBusiness() {
  const docCall = new DocCall();
  const initialCall = docCall.getPromise(`specialties`);
  initialCall.then(specialtyPopulate(), testFail())
  return docCall;
}

function generateVariables(doc) {
  let output = []
  output[0] = doc.profile;
  output[1] = output[0].image_url;
  output[2] = doc.practices[0];
  output[3] = output[2].visit_address;
  output[4] = output[2].accepts_new_patients ? "" : "not ";
  output[5] = output[2].website ? ` or at <a href=' ${output[2].website}'>their website</a>` : ``;
  return output;
}

function docMatch(doc) {
  const output = generateVariables(doc);
  $("#output").append(`<img src='${output[1]}'>`);
  $("#output").append(`<p>Dr. ${output[0].first_name} ${output[0].last_name}, located at ${output[3].street}, ${output[3].city} ${output[3].state} ${output[3].zip}</p>`);
  $("#output").append(`<p>Dr. ${output[0].last_name} can be reached at ${output[2].phones[0].number}${output[5]}</p>`);
  $("#output").append(`<p>Dr. ${output[0].last_name} is ${output[4]}currently accepting new patients.</p>`);
  return;
}

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

function checkNoMatch(searchSucceed, userIn) {
  if (!searchSucceed) {
    $("#output").append(`<p>No doctors matched your search for ${userIn}</p>`);
  }
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

function addSpecialtyOptions(data,response) {
  for (let i = 0; i < data.length; i++) {
    $("#examples").append(`<option>${data[i].description}</option>`);
  }
}

function initializeUI(arr,docCall) {
  for (let i = 0; i <= 1; i++) {
    $(`#${arr[i]}`).click(function() {
      btnToggle(i);
    });
    $(`#${arr[i]}Btn`).click(function() {
      searchCall(i, docCall);
    });
  }
}

function initializePage() {
  const docCall = initializeBusiness();
  const arr = [`symptom`,`doctor`];
  initializeUI(arr,docCall);
}

$(document).ready(function() {
  initializePage();
});
