/* ==========================================================================
Script used to handle Task2 routes (by specialty)
========================================================================== */
(function () {
	
	var app = Sammy.apps.body,
		patientData = { '1': { 'id': '1', 'firstName': 'Jane', 'lastName': 'Grey', 'dob': 'March 14, 1943', 'shortdob': '03/14/43', 'email': 'jane.grey@gmail.com', 'phone': '(617) 555-2465', 'address1': '101 Bluebird Lane', 'address2': 'Newton, MA 02465', 'doctor': 'Dr. Jones'} },
		currentview = '',
		baseUrl = '#/task2';

	// 1.001.20 - My Patients
	// View:	Views/Home/landing.template
	// View:	Views/Home/myPatients.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/my-patients
	
	app.get('#/:specialty/my-patients', function (context) {
	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/Home/myPatients.template';
		var isNew = !taskPageStatus.demographic,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		taskPageStatus.demographic = true;
		setHomeLinks('#/' + specialty);
	
		if (app.currentview !== 'landing') {
			context.render('../Views/Home/landing.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#myPatientsLoadingArea').html(childOutput);
				});
			});
		} else {	
			$('#priorAuthorizationTemplate').parent().hide();
			context.render(templateStr, tmplData, function (childOutput) {
				$('#myPatientsLoadingArea').html(childOutput);
				moveBigButtons();
			});
		}
		app.currentview = 'subpage';
		
	});
	
	
	
	// 3.001.0 - PA Choice Selected Form
	// View:	Views/Home/landing.template
	// View:	Views/PriorAuthorization.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/priorAuthorization
	
	app.get('#/:specialty/priorAuthorization', function (context) {
		
		console.log('hit');
	
		var data = patientData[this.params['id']],
		templateNumber = this.params['templateNum'];
		var templateStr = '../Views/PriorAuthorization/priorAuthorization.template',
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		context.render(templateStr, tmplData, function (output) {
			if (app.currentview == 'patient-subview') {
				$('#mainTemplate').html(output);
				stickyHeader();
			} else {
				$('#mainTemplate').html(output);
				updatePatientDashboardLinks();
				stickyHeader();
				

			}
			app.currentview = 'patient';
		});

	});
	
	
	// 3.001.0 - PA Choice Selected Form
	// View:	Views/Home/landing.template
	// View:	Views/PriorAuthorization.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/priorAuthorization/form
	
	app.get('#/:specialty/priorAuthorization/form', function (context) {
		
		var data = patientData[this.params['id']],
		templateNumber = this.params['templateNum'];
		var templateStr = '../Views/PriorAuthorization/priorAuthorizationForm.template',
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		context.render(templateStr, tmplData, function (output) {
			
			if (app.currentview == 'patient-subview') {
				$('#mainTemplate').html(output);
				
				$('a[data-reveal-id]').on('click', function () {
				  var id = $(this).attr('data-reveal-id');
				  $("#" + id).reveal('open');
				  return false;
				});
				
				$('#eSigSignBtn').on('click', function(e) {
					e.preventDefault();			
					var elem = $(this);					
					$('#sigBtn img').attr('src', '../Images/priorAuthFormSignature.jpg');
					$('.btn-primary').removeClass('inactive');
					elem.parent().siblings('.close-reveal-modal').trigger('click');		
				});			
				
			} else {
		
				$('#mainTemplate').html(output);
				$('a[data-reveal-id]').on('click', function () {
				  var id = $(this).attr('data-reveal-id');
				  $("#" + id).reveal('open');
				  return false;
				});
				
				$('#eSigSignBtn').on('click', function(e) {		
					e.preventDefault();			
					var elem = $(this);					
					$('#sigBtn img').attr('src', '../Images/priorAuthFormSignature.jpg');
					$('.btn-primary').removeClass('inactive');
					elem.parent().siblings('.close-reveal-modal').trigger('click');		
				});			
			}
			app.currentview = 'patient';
		});
	});
	
	
	// 3.010.0 - PA View Form eSignature Modal Show Password
	// View:	Views/Home/landing.template
	// View:	Views/priorAuthorizationSign.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/priorAuthorization/sign
	
	app.get('#/:specialty/priorAuthorization/sign', function (context) {
		
		console.log('hit');
	
		var data = patientData[this.params['id']],
		templateNumber = this.params['templateNum'];
		var templateStr = '../Views/PriorAuthorization/priorAuthorizationSign.template',
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		context.render(templateStr, tmplData, function (output) {
			if (app.currentview == 'patient-subview') {
				$('#mainTemplate').html(output);
			} else {
				$('#mainTemplate').html(output);
				updatePatientDashboardLinks();
			}
			app.currentview = 'patient';
		});

	});
	
	
	// 3.010.1 - PA Sent Confirmation Modal
	// View:	Views/Home/landing.template
	// View:	Views/priorAuthorizationSign.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/priorAuthorization/success
	
	app.get('#/:specialty/priorAuthorization/success', function (context) {
		
		console.log('hit');
	
		var data = patientData[this.params['id']],
		templateNumber = this.params['templateNum'];
		var templateStr = '../Views/PriorAuthorization/priorAuthorizationSuccess.template',
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		context.render(templateStr, tmplData, function (output) {
			if (app.currentview == 'patient-subview') {
				$('#mainTemplate').html(output);
			} else {
				$('#mainTemplate').html(output);
				updatePatientDashboardLinks();
			}
			app.currentview = 'patient';
		});

	});
	
	
	 //06 Patient Page
    app.get('#/:specialty/dashboard', function (context) {
        console.log("You're in the Task 2 - Patient route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        //default to empty template for patient dashboard
        var templateStr = '../Views/Dashboard/patientDashboard.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty,
            tmplData = { 'specialty': specialty };

        setHomeLinks('#/' + specialty);
        context.render(templateStr, tmplData, function (output) {

            if (app.currentview == 'patient-subview') {
                hideCardDetails();
            }
            else {
                $('#mainTemplate').html(output);
                updatePatientDashboardLinks();
            }
            context.render('../Views/Demographics/demographicBlurb.template', tmplData).replace('#demographicBlurbTemplate');
            app.currentview = 'patient';
        });


    }); //End Patient Page



})();