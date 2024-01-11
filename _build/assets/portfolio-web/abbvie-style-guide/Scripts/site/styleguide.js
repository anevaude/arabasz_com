$(document).ready(function() {


	// Menu Active Class
	if (window.location.href.indexOf('index.html') > -1) {
		$('.nav-branding').addClass('active');
	}

	if (window.location.href.indexOf('typography.html') > -1) {
		$('.nav-typography').addClass('active');
	}	

	if (window.location.href.indexOf('forms.html') > -1) {
		$('.nav-forms').addClass('active');
	}	

	if (window.location.href.indexOf('tables.html') > -1) {
		$('.nav-tables').addClass('active');
	}	

	if (window.location.href.indexOf('navigation.html') > -1) {
		$('.nav-navigation').addClass('active');
	}

	if (window.location.href.indexOf('modals.html') > -1) {
		$('.nav-modals').addClass('active');
	}	

	if (window.location.href.indexOf('modules.html') > -1) {
		$('.nav-modules').addClass('active');
	}





	SyntaxHighlighter.all();

	$('.accordion-sg').accordion({
		active: false,
		heightStyle: 'content',
		collapsible: true,
		icons: {
			"header": "fa fa-angle-right",
			"activeHeader": "fa fa-angle-down"
		}
	});



	initCustomFormFields();

	$('body').dateSelectBoxes({
		monthElement: $('#dob-month'),
		dayElement: $('#dob-day'),
		yearElement: $('#dob-year'),
		generateOptions: true,
		keepLabels: true
	});

	var now = Date.now();
	$("#dateTBD").datepicker({
		isDisabled: function(date) {
			return date.valueOf() < now ? true : false;
		}
	});

	// Button that shows/hides the Sidenav
	$(".pushy").hide();
	$( "#open-sidenav" ).click(function() {
		$(".pushy").toggle();
	});


	initTypeahead();

	subrowOpener();

	tableStripes();

	dropZone();
	
    accordion('.accordion');


});