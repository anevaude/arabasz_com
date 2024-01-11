/* ==========================================================================
Script used to handle Task1 routes (by specialty)
========================================================================== */
(function () {
	
	var app = Sammy.apps.body,
		 patientData = { '1': { 'id': '1', 'firstName': 'Jane', 'lastName': 'Grey', 'dob': 'March 14, 1943', 'shortdob': '03/14/43', 'email': 'jane.grey@gmail.com', 'phone': '(617) 555-2465', 'address1': '101 Bluebird Lane', 'address2': 'Newton, MA 02465', 'doctor': 'Dr. Jones'} },
		 currentview = 'Jane Doe',
		 baseUrl = '#/task1',
		 //Used to keep track of which pages have been visited to simulate content entered in edit pages.
		 taskPageStatus = { 'demographic': false,
			 'diagnosis': false,
			 'insurance': false,
			 'benefitSummary': false
		 };


	// 1.001.0 - Landing Page		
	// View:	Views/Home/landing.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma
 
	app.get('#/:specialty', function (context) {
			
		var data = patientData[this.params['id']];
		var templateStr = '../Views/Home/landing.template';
		var isNew = !taskPageStatus.demographic,
				specialty = this.params['specialty'],
				baseUrl = '#/' + specialty,
				tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);
		
		context.render(templateStr, tmplData, function (childOutput) {
			
			$('#mainTemplate').html(childOutput);
			
			$('.landing-btn').on('click', function(){
				var elem = $(this);
				elem.prev('.landing-tab').trigger('click');
			});
			
			
		});
		
		app.currentview = 'landing';
		
	}); 
		
		
	// 1.001.1 - New Patient
	// View:	Views/Home/landing.template
	// View:	Views/Home/newPatient.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/new-patient
	
	app.get('#/:specialty/new-patient', function (context) {
	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PatientSupport/newPatient.template';
		var isNew = !taskPageStatus.demographic,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);
		
		console.log(app.currentview);
		
		if (app.currentview !== 'landing') {
			console.log('first');
			context.render('../Views/Home/landing2.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#newPatientsLoadingArea').html(childOutput);
					initCustomFormFields();
					$('body').dateSelectBoxes({
					  monthElement: $('#dob-month'),
					  dayElement: $('#dob-day'),
					  yearElement: $('#dob-year'),
					  generateOptions: true,
					  keepLabels: true
					});
					
					
				});
			});
		
		} else {	
			console.log('last');
			$('#priorAuthorizationTemplate').parent().hide();
			context.render(templateStr, tmplData, function (childOutput) {
				moveBigButtons();
				$('#newPatientsLoadingArea').html(childOutput).slideUp(100).removeClass('hidden').slideDown(400);
				initCustomFormFields();
				
				$('body').dateSelectBoxes({
				  monthElement: $('#month1'),
				  dayElement: $('#day1'),
				  yearElement: $('#year1'),
				  generateOptions: true,
				  keepLabels: true
				});
				
			});
		}
		app.currentview = 'subpage';
		
	});
	
	
	
	
	
	// 1.001.1 - Dosing (Gastro)
	// View:	Views/Home/landing2.template
	// View:	Views/PatientSupport/diagnosisDosing.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/dosings
	
	app.get('#/gastro/dosing', function (context) {
	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PatientSupport/diagnosisDosingGastro.template';
		var isNew = !taskPageStatus.demographic,
			specialty = this.params['specialty'],
			baseUrl = '#/gastro',
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);

		
		if (app.currentview !== 'landing') {
			console.log('first');
			context.render('../Views/Home/landing2.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				$('#landingTabs').hide();
				context.render(templateStr, tmplData, function (childOutput) {
					$('#newPatientsLoadingArea').html(childOutput);
					initCustomFormFields();
					
					$('#diagnosis').change(function(){
						if($(this).val() == 1) {
							$('#checkArea').slideDown();
						} else {
							if ($('#checkArea').not(":visible")) {
								$('#checkArea').slideUp();
							}
						}
					});
					
					
				});
			});
		
		} else {	
			
			$('#landingTabs').hide();
			
			$('#priorAuthorizationTemplate').parent().hide();
			context.render(templateStr, tmplData, function (childOutput) {
				moveBigButtons();
				$('#newPatientsLoadingArea').html(childOutput).slideUp(100).removeClass('hidden').slideDown(400);
				initCustomFormFields();
				
				
				$('#diagnosis').change(function(){
						if($(this).val() == 1) {
							$('#checkArea').slideDown();
						} else {
							if ($('#checkArea').not(":visible")) {
								$('#checkArea').slideUp();
							}
						}
					});
				
			});
		}
		app.currentview = 'subpage';
		
	});
	
	
	// 1.001.1 - Dosing (Derma)
	// View:	Views/Home/landing2.template
	// View:	Views/PatientSupport/diagnosisDosing.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/dosings
	
	app.get('#/derma/dosing', function (context) {
	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PatientSupport/diagnosisDosingDerma.template';
		var isNew = !taskPageStatus.demographic,
			specialty = this.params['specialty'],
			baseUrl = '#/derma',
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);

		
		if (app.currentview !== 'landing') {
			console.log('first');
			context.render('../Views/Home/landing2.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				$('#landingTabs').hide();
				context.render(templateStr, tmplData, function (childOutput) {
					$('#newPatientsLoadingArea').html(childOutput);
					initCustomFormFields();
					
					$('#diagnosis').change(function(){
						if($(this).val() == 1) {
							$('#checkArea').slideDown();
						} else {
							if ($('#checkArea').not(":visible")) {
								$('#checkArea').slideUp();
							}
						}
					});
					
					
				});
			});
		
		} else {	
			
			$('#landingTabs').hide();
			
			$('#priorAuthorizationTemplate').parent().hide();
			context.render(templateStr, tmplData, function (childOutput) {
				moveBigButtons();
				$('#newPatientsLoadingArea').html(childOutput).slideUp(100).removeClass('hidden').slideDown(400);
				initCustomFormFields();
				
				$('#diagnosis').change(function(){
						if($(this).val() == 1) {
							$('#checkArea').slideDown();
						} else {
							if ($('#checkArea').not(":visible")) {
								$('#checkArea').slideUp();
							}
						}
					});
				
				
			});
		}
		app.currentview = 'subpage';
		
	});
	
	
	
	// 1.001.1 - Dosing (Rheum)
	// View:	Views/Home/landing2.template
	// View:	Views/PatientSupport/diagnosisDosing.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/dosings
	
	app.get('#/rheum/dosing', function (context) {
	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PatientSupport/diagnosisDosingRheum.template';
		var isNew = !taskPageStatus.demographic,
			specialty = this.params['specialty'],
			baseUrl = '#/rheum',
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);

		
		if (app.currentview !== 'landing') {
			console.log('first');
			context.render('../Views/Home/landing2.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				$('#landingTabs').hide();
				context.render(templateStr, tmplData, function (childOutput) {
					$('#newPatientsLoadingArea').html(childOutput);
					initCustomFormFields();
					
					$('#diagnosis').change(function(){
						if($(this).val() == 1) {
							$('#checkArea').slideDown();
						} else {
							if ($('#checkArea').not(":visible")) {
								$('#checkArea').slideUp();
							}
						}
					});
					
				});
			});
		
		} else {	
			
			$('#landingTabs').hide();
			
			$('#priorAuthorizationTemplate').parent().hide();
			context.render(templateStr, tmplData, function (childOutput) {
				moveBigButtons();
				$('#newPatientsLoadingArea').html(childOutput).slideUp(100).removeClass('hidden').slideDown(400);
				initCustomFormFields();
				
				
				$('#diagnosis').change(function(){
						if($(this).val() == 1) {
							$('#checkArea').slideDown();
						} else {
							if ($('#checkArea').not(":visible")) {
								$('#checkArea').slideUp();
							}
						}
					});
				
			});
		}
		app.currentview = 'subpage';
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 1.001.1 - Pre Benefit Summary
	// View:	Views/Home/landing.template
	// View:	Views/Home/newPatient.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/pre-benefit-summary
	
	app.get('#/:specialty/pre-benefit-summary', function (context) {
	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/BenefitSummary/preBenefitSummary.template';
		var isNew = !taskPageStatus.demographic,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);
		
		context.render(templateStr, tmplData, function (childOutput) {
			$('#mainTemplate').html(childOutput);
		});
		
		app.currentview = 'landing';

		
	});
		


})();