//will go to nodemodules and require jquery
var $ = jQuery = require('jquery');

require('./bootstrap_custom.js');

var Handlebars = require('handlebars');

//this function will load
$(function() {

//by default bootstrap nav classes has an offset of 50 px tall
  var topoffset = 50;


  //registering service worker
  //navigator is an object that had features of the current browser
  //we need to install service workers in main root folder
  if('serviceWorker' in navigator) {

    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() {
      console.log('service worker active');
    })

  }




//parsing json and getting the images using handlebars.js
$.getJSON('/data/pets.json', function(data) {
  //target into slideshow-template id
var slideshowTemplate = $('#slideshow-template').html();
//compile slideshowScript
var slideshowScript = Handlebars.compile(slideshowTemplate);

//target into adoption-template id
var adoptionTemplate = $('#adoption-template').html();
//compile adoptionScript
var adoptionScript = Handlebars.compile(adoptionTemplate);


//target into appointments-template and get the html content and store in variable
var appointmentsTemplate = $('#appointments-template').html();
//compile appointmentsScript
var appointmentsScript = Handlebars.compile(appointmentsTemplate);

//it will load for one second before displaying images
  $('.loader').fadeOut(1000);

//append all images to slideshow-content id in index.html page
  $('#slideshow-content').append(slideshowScript(data));

  //append all images to adoption-content id in index.html page
    $('.adoption-content').append(adoptionScript(data));

    //append all images to adoption-content id in index.html page
      $('#appointments-content').append(appointmentsScript(data));



//replacing the image to fullscreen instead of half screen by using background-image
$('#slideshow .item img').each(function() {
var imgSrc = $(this).attr('src');
$(this).parent().css({'background-image' : 'url(' + imgSrc +')'});
$(this).remove();
});


//it will unpause carousel if we put cursor on screen
$('.carousel').carousel({
  pause: false
});
});

//injecting to openpetmodal class
$(document).on('click', '.openpetmodal' , function(){
//getting the data adoption template and injecting to modal classes like modal-petname,modal-petbreed etc
  $('.modal-petname').html($(this).data('petname'));
  $('.modal-petbreed').html($(this).data('petbreed'));
  $('.modal-petowner').html($(this).data('petowner'));
  $('.modal-petinfo').html($(this).data('petinfo'));

  $('.modal-petimage').attr('src','images/pets/'+$(this).data('petimage') + '.jpg');

  $('.modal-petimage').attr('alt',$(this).data('petimage') + 'photo');
});

  //used for loader ,css code has written for this class
//to keep the navbar on top eventhough we scroll down
$('.navbar-fixed-top').on('activate.bs.scrollspy',function() {
  //to get the name in nav bar eg home,adoption,appointments which are in list of active class from that //we get href of that element
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#slideshow') {
    $('header nav').addClass('inbody');
 }
  else {
    $('header nav').removeClass('inbody');
  }
});

//Use smooth scrolling when clicking on navigation
 $('.navbar a').click(function() {
   if (location.pathname.replace(/^\//,'') ===
     this.pathname.replace(/^\//,'') &&
     location.hostname === this.hostname) {
     var target = $(this.hash);
     target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
     if (target.length) {
       $('html,body').animate({
         scrollTop: target.offset().top-topoffset+2
       }, 500);
       return false;
     } //target.length
   } //click function
 }); //smooth scrolling

//activate scrollspy
$('body').scrollspy({
  target: 'header .navbar',
  offset: topoffset




});
});
