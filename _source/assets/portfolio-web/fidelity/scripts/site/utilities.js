/**
* ==================================================
*		JS: Utilities
* ==================================================
*/

/* Name: Header Navigation */
/* Description: Hide/show 2 different menu views */
var headerNavControl = function () {

	$(document).ready(function() {
		var menuToggle = $("#js-mobile-menu-button").unbind();
	  	$("#js-navigation-menu, #js-navigation-menu-sub, #js-navigation-menu-tert").removeClass("show");	  

	  	menuToggle.on("click", function(e) {
	    	e.preventDefault();

		    // Open the first menu
		    $("#js-navigation-menu").slideToggle(function(){
		      if($("#js-navigation-menu").is(":hidden")) {
		        $("#js-navigation-menu").removeAttr("style");
		      }
		    });

		    // Open the second menu
		    $("#js-navigation-menu-sub").slideToggle(function(){
		      if($("#js-navigation-menu-sub").is(":hidden")) {
		        $("#js-navigation-menu-sub").removeAttr("style");
		      }
		    });

		    // If there is a third menu open it
		    if ($("#js-navigation-menu-tert") != -1) {
		    	$("#js-navigation-menu-tert").slideToggle(function(){
			      if($("#js-navigation-menu-tert").is(":hidden")) {
			        $("#js-navigation-menu-tert").removeAttr("style");
			      }
			    }); 
		    }

	  	});
	}); 
};

/* Name: navActiveSelector */
/* Description: Adds an 'active' CSS class to the current navigation item */
/* This is for demonstration only, please remove when integrating */
var navActiveSelector = function () {

	if (window.location.href.indexOf('home.html') > -1) {
		$('.nav-1').addClass('active');
		$(document).prop('title', 'Home');
	}

	if (window.location.href.indexOf('404.html') > -1) {
		$(document).prop('title', '404 - Page Not Found');
	}	

	if (window.location.href.indexOf('search-results.html') > -1) {
		$(document).prop('title', 'Search Results');
	}		

	if (window.location.href.indexOf('search-results-not-found.html') > -1) {
		$(document).prop('title', 'Search Results');
	}		

	/* Plan Ahead Section */
	if (window.location.href.indexOf('plan-ahead.html') > -1) {
		$('.nav-primary .nav-2').addClass('active');
		$(document).prop('title', 'Plan Ahead');
	}	

	if (window.location.href.indexOf('all-tools.html') > -1) {
		$('.nav-primary .nav-2').addClass('active');
		$('.nav-tertiary .nav-1').addClass('active');
		$(document).prop('title', 'All Tools');
	}

	if (window.location.href.indexOf('tool-details.html') > -1) {
		$('.nav-primary .nav-2').addClass('active');
		$('.nav-tertiary .nav-1').addClass('active');
		$(document).prop('title', 'Tool Details');
	}	

	if (window.location.href.indexOf('tool-details.html') > -1) {
		$('.nav-primary .nav-2').addClass('active');
		$(document).prop('title', 'Tool Details');
	}	

	if (window.location.href.indexOf('life-changing-event.html') > -1) {
		$('.nav-primary .nav-2').addClass('active');
		$('.nav-tertiary .nav-2').addClass('active');
		$(document).prop('title', 'Life Changing Event');
	}	

	/* Get Answers Section */
	if (window.location.href.indexOf('get-answers.html') > -1) {
		$('.nav-primary .nav-3').addClass('active');						
		$(document).prop('title', 'Get Answers');
	}

	if (window.location.href.indexOf('library-landing.html') > -1) {
		$('.nav-primary .nav-3').addClass('active');
		$('.nav-tertiary .nav-1').addClass('active');				
		$(document).prop('title', 'Library');
	}	

	if (window.location.href.indexOf('article-details.html') > -1) {
		$('.nav-primary .nav-3').addClass('active');
		$('.nav-tertiary .nav-1').addClass('active');				
		$(document).prop('title', 'Library');
	}	

	if (window.location.href.indexOf('contact.html') > -1) {
		$('.nav-primary .nav-3').addClass('active');
		$('.nav-tertiary .nav-3').addClass('active');		
		$(document).prop('title', 'Contact Us');
	}	

	if (window.location.href.indexOf('about.html') > -1) {		
		$(document).prop('title', 'About Us');
	}		

	if (window.location.href.indexOf('logged-out.html') > -1) {	
		$(document).prop('title', 'Logged Out');
	}	

	if (window.location.href.indexOf('log-in.html') > -1) {	
		$(document).prop('title', 'Log In');
	}		

};

/* Name: Accordion */
/* Description: This enables accordions */
var accordion = function () {

	$('.js-accordion-trigger').bind('click', function(e){
	  // Toggle open THIS list
	  jQuery(this).parent().find('.submenu').slideToggle('fast');
	  jQuery(this).parent().toggleClass('is-expanded');

	  // Collapse all others
	  jQuery(this).parent().siblings().find('.submenu').slideUp('fast');
	  jQuery(this).parent().siblings().removeClass('is-expanded');

	  e.preventDefault();
	});
};

/* Name: Typeahead */
/* Description: This is the initialization for Twitter Typeahead */
/* https://twitter.github.io/typeahead.js/examples */

var typeahead = function () {
	var placeholderData = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
	  	queryTokenizer: Bloodhound.tokenizers.whitespace,
	  
		// url points to a json file that contains an array of answers
		prefetch: '../templates/data/placeholder-typeahead-data.json'
	});

	$('.twitter-typeahead').typeahead({
		minLength: 2,
		highlight: true,
		hint: false
	},
	{
		name: 'placeholder-typeahead-data',
		source: placeholderData  
	}); 

};

/* Name: Typeahead Answers */
/* Description: This is a companion to Typeahead. */
/* It provides an answer after the user has asked a question */
/* Used in Ask Us Anything */
var typeaheadAnswers = function () {

	var inputField = $('.form-get-answers');
	var submitButton = $('.typeahead-submit');

	$(submitButton).bind('click', function(e){

		if($('.tt-suggestion').length === 0){
			$('.has-answer').fadeOut();
			$('.no-answer').fadeIn();
		} else {
			$('.no-answer').fadeOut();
			$('.has-answer').fadeIn();
		}

	  e.preventDefault();
	});

	// Prevent a real submit from happening if user hits Enter
	$(inputField).submit(function(e){
		return false;
	});	

	// If user hits Enter, trigger the click event
    $(inputField).keypress(function(e){
        if(e.which == 13){ //Enter key pressed
            $(submitButton).click();
        }
    });	

};
