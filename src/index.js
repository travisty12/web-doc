import $ from 'jquery';
import './sass/styles.scss';
import { DocCall } from './web-doc.js';

function searchCall(input) {
  $("#input").fadeOut();
  let searchSucceed = false;
  const city = $("#cityName").children("option:selected").val();
  const docCall = new DocCall();
  const promise = docCall.getPromise(city);
  promise.then(function(response) {
    const data = JSON.parse(response).data;
    const userIn = $("#userIn").val();
    data.forEach(function(doc) {
      for (let i = 0; i < doc.specialties.length; i++) {
        const choice = [doc.specialties[i].description, doc.profile.last_name];
        if (choice[input].match(userIn)) {
          searchSucceed = true;
          const profile = doc.profile;
          const pic = profile.image_url;
          const practice = doc.practices[0];
          const location = practice.visit_address;
          const newPatients = practice.accepts_new_patients ? "" : "not ";
          const hasSite = practice.website ? ` or at their website, ${practice.website}` : ``;
          $("#output").append(`<img src='${pic}'>`);
          $("#output").append(`<p>Dr. ${profile.first_name} ${profile.last_name}, located at ${location.street}, ${location.city} ${location.state} ${location.zip}</p>`);
          $("#output").append(`<p>Dr. ${profile.last_name} can be reached at ${practice.phones[0].number}${hasSite}</p>`);
          $("#output").append(`<p>Dr. ${profile.last_name} is ${newPatients}currently accepting new patients.</p>`);
          break;
        }
      }
    })
    if (!searchSucceed) {
      $("#output").append(`<p>No doctors matched your search for ${userIn}</p>`);
    }
  }, function(error) {
    $("#output").text(`Request failed: ${error.message}`);
  })
  return;
}

function btnToggle(choice) {
  const options = [`doctor`,`symptom`];
  $(`#${options[choice]}Label`).fadeOut();
  $(`#${options[choice]}Btn`).fadeOut();
  setTimeout(function() {
    $(`#${options[1-choice]}Btn`).fadeIn();
    $(`#${options[1-choice]}Label`).fadeIn();
  }, 400);
}

$(document).ready(function() {
  $("#symptom").click(function() {
    btnToggle(0);
  });
  $("#doc").click(function() {
    btnToggle(1);
  });
  $("#symptomBtn").click(function() {
  searchCall(0);
  });
  $("#doctorBtn").click(function() {
    searchCall(1);
  });
});
