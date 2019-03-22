import $ from 'jquery';
import './sass/styles.scss';
import { DocCall } from './web-doc.js';

$(document).ready(function() {
  $("#symptom").click(function() {
    $("#doctorLabel").fadeOut();
    $("#doctorBtn").fadeOut();
    setTimeout(function() {
      $("#symptomBtn").fadeIn();
      $("#symptomLabel").fadeIn();
    }, 400);
  });
  $("#doc").click(function() {
    $("#symptomLabel").fadeOut();
    $("#symptomBtn").fadeOut();
    setTimeout(function() {
      $("#doctorBtn").fadeIn();
      $("#doctorLabel").fadeIn();
    }, 400);
  });
  
});
