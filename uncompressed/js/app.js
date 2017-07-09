//will go to nodemodules and require jquery
var $ = jQuery = require('jquery');

require('./bootstrap_custom.js');

var Handlebars = require('handlebars');

//this function will load
$(function() {
  $('.loader').fadeOut(5000);
});
