/* ==========================================================================
   Utilities methods
========================================================================== */


if (!Date.now) {
	Date.now = function() {
		return +new Date();
	};
}

var saveInterval = null; //this variable is used in the simulateAutoSave method


// Method used for accordion functionality
var accordion = function(el) {
	$(el).find('.accordion-toggle').click(function(e) {
		e.preventDefault();

		//Expand or collapse this panel
		$(this).next().slideToggle('fast', function() {});

		//Hide the other panels
		$(".accordion-content").not($(this).next()).slideUp('fast');

		//set the arrows back to up
		if ($(this).find('.fa').is('.fa-chevron-up')) {
			$(this).find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		} else {
			$(this).find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
		}

		$('.accordion-toggle').not($(this)).find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');

	});
};

// Call this to init styles for custom fields
var initCustomFormFields = function() {

	$(".multiselect").css({
		'display': 'block',
		'width': '100%'
	}).multiselect();

	$('.ui-multiselect-checkboxes input').change(function(e) {
		var elem = $(this),
			isChecked = elem.prop('checked'),
			checkerID = elem.parents('.checker').attr('id'),
			label = elem.parents('label').find('> span').text();

		if (!isChecked) {
			$('.tag_span[data-tag-span="' + checkerID + '"]').remove();
		} else {

			var tagSpan = '<span class="tag_span" data-tag-span="' + checkerID + '">';
			tagSpan += label;
			tagSpan += '<i class="fa fa-close"></i>';
			tagSpan += '<div class="arrow_box"></div>';
			tagSpan += '</span>';

			var tag = $(tagSpan);
			tag.insertAfter('.ui-multiselect');

			var tagHeight = tag.outerHeight();

			console.log(tagHeight);

			if (tagHeight >= 49) {
				tag.addClass('two_lines');
			}

			if (tagHeight >= 65) {
				tag.addClass('three_lines');
			}

			if (tagHeight >= 81) {
				tag.addClass('four_lines');
			}


		}
	});

	$(document).on('click', '.tag_span .fa', function() {
		var elem = $(this),
			parent = elem.parents('.tag_span'),
			id = parent.attr('data-tag-span');
		id = id.replace('uniform-', '');

		$('#' + id).prop("checked", !$('#' + id).prop("checked"));
		$.uniform.update();
		parent.remove();
	});


	/* Applies Uniform to listed fields */

	$("select, input[type=text], input[type=checkbox], input[type=radio], input[type=password], input[type=search]").uniform({
		selectAutoWidth: false
	});
	$('input[type="checkbox"]').prop('checked', false);
	$.uniform.update();


	/* Date Picker */
	$(".datepicker").datepicker();

	var now = Date.now();
	$(".no_past_date").datepicker({
		isDisabled: function(date) {
			return date.valueOf() < now ? true : false;
		}
	});


	/* Multiselect */
	$('.ui-multiselect-none').trigger('click');
};

// Method called for reveal modal
var initModal = function() {
	$('[data-reveal-id]').reveal({
		animation: 'fadeAndPop', //fade, fadeAndPop, none
		animationspeed: 300, //how fast animations are
		closeonbackgroundclick: true, //if you click background will modal close?
		dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
	});
};

// Typeahead Search 
var initTypeahead = function() {

	// Sets where the data is coming from
	var nbaTeams = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: '../Scripts/vendor/typeahead.js/example_data/nba.json'
	});

	var nhlTeams = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('team'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		prefetch: '../Scripts/vendor/typeahead.js/example_data/nba.json'
	});

	// Finds the input and inits Typeahead
	$('.typeahead').typeahead({
			highlight: true,
			minLength: 3
	},

	// Defines how suggestions are displayed
	{
		name: 'nba-teams',
		display: 'team',
		source: nbaTeams,
		templates: {
			header: '<h3 class="group-name">NBA Teams</h3>'
		}
	}, {
		name: 'nhl-teams',
		display: 'team',
		source: nhlTeams,
		templates: {
			header: '<h3 class="group-name">NHL Teams</h3>'
		}
	});
};

// Table Subrow Opener
var subrowOpener = function() {

	// Initially hide toggleable content
	$("table").find(".subrow:not(.subrow-open)").hide();
	$("table").find(".subrow:not(.subrow-open) .subrow-content").hide();

	$(".has-subrow").click(function(event) {
		event.stopPropagation();

		// The target is what is clicked
		var $target = $(event.target);
		var closestSubrow = $target.closest("tr").next(".subrow");

		// Find closest Subrow and show it
		$(closestSubrow).slideToggle().find(".subrow-content").slideToggle();
		$(closestSubrow).toggleClass("subrow-open");

		// Add an Active class
		$target.closest("tr.has-subrow").toggleClass("active");

	});
};

// Puts zebra stripes on tables, considers hidden rows
var tableStripes = function() {
	// Using "even" here to ignore zero indexed start
	$("tbody tr:not(.subrow):even").addClass("odd");
};

var dropZone = function() {
	Dropzone.autoDiscover = true;
	Dropzone.options.patientFilesDZ = {
		previewTemplate: "<div class=\"dz-preview dz-file-preview \">\n <div class=\"dz-details\">\n <div class=\"dz-filename\"><i class=\"fa fa-paperclip\"></i><span data-dz-name></span></div>\n <a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a>\n  <img data-dz-thumbnail />\n </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>",
		acceptedFiles: '.doc,.docx,.pdf,.jpg,.jpeg,.gif,.png',
		addRemoveLinks: true,
		paramName: "file",
		autoProcessQueue: true,
		error: function(file, response) {
			if ($.type(response) === "string")
				var message = response; //dropzone sends its own error messages in string
			else
				var message = response.message;
			file.previewElement.classList.add("dz-error");
			_ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
			_results = [];
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				node = _ref[_i];
				_results.push(node.textContent = message);
			}
			return _results;
		}			
	}
};


/* ==========================================================================
Methods below this point should only be called in the prototype - these should not be used
in production. The main purpose was to simulate a working product for testing purposes only.
========================================================================== */

/*!
 * Avoid 'console' errors in browsers that lack a console.
 */
(function() {
	var method;
	var noop = function() {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());