import $ from 'jquery';
import './sass/styles.scss';
import { DocCall } from './web-doc.js';
import { getCoordinatesReturnDoctors, specialtyPopulate, initializeBusiness, generateVariables, initializePage, searchCall } from './business-logic.js';

export function docMatch(doc) {
  const output = generateVariables(doc);
  $("#output").append(`<img src='${output[1]}'><p>Dr. ${output[0].first_name} ${output[0].last_name}, located at ${output[3].street}, ${output[3].city} ${output[3].state} ${output[3].zip}</p><p>Dr. ${output[0].last_name} can be reached at ${output[2].phones[0].number}${output[5]}</p><p>Dr. ${output[0].last_name} is ${output[4]}currently accepting new patients.</p>`);
  return;
}

export function testFail() {
  return function(error) {
    $("#output").text(`Request failed: ${error.message}`);
  }
}

export function returnCoordinatePromise(docCall) {
  $("#input").fadeOut();
  const location = $("#location").val();
  return docCall.promiseSetup(0, [location,[void(0), void(0)]]);
}

export function checkNoMatch(searchSucceed, userIn) {
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

export function addSpecialtyOptions(data,response) {
  for (let i = 0; i < data.length; i++) {
    $("#examples").append(`<option>${data[i].description}</option>`);
  }
}

export function initializeUI(arr,docCall) {
  for (let i = 0; i <= 1; i++) {
    $(`#${arr[i]}`).click(function() {
      btnToggle(i);
    });
    $(`#${arr[i]}Btn`).click(function() {
      const userIn = $("#userIn").val();
      searchCall(i, docCall, userIn);
    });
  }
}

$(document).ready(function() {
  initializePage();
});
