/* ==========================================================================
Script used to handle Task2 routes (by specialty)
========================================================================== */
(function () {
	
	var app = Sammy.apps.body,
		patientData = { '1': { 'id': '1', 'firstName': 'Jane', 'lastName': 'Grey', 'dob': 'March 14, 1943', 'shortdob': '03/14/43', 'email': 'jane.grey@gmail.com', 'phone': '(617) 555-2465', 'address1': '101 Bluebird Lane', 'address2': 'Newton, MA 02465', 'doctor': 'Dr. Jones'} },
		currentview = '',
		baseUrl = '#/task2';


		

	// Prior Authorization Modal
	// View:	Views/Home/landing3.template
	// View:	Views/PriorAuthorization/priorAuthorizationModal.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/prior-auth-modal

	app.get('#/:specialty/prior-auth-modal', function (context) {	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PriorAuthorization/priorAuthorizationModal.template';
		var isNew = null,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		
		if (app.currentview !== 'landing') {
			context.render('../Views/Home/landing3.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#loadingArea').html(childOutput);				
				});
			});
		
		} else {	
			context.render(templateStr, tmplData, function (childOutput) {
				$('#loadingArea').html(childOutput);				
			});
		}
		app.currentview = 'subpage';
	});
	
	
	
	
	// Patient Information
	// View:	Views/Home/landing3.template
	// View:	Views/PatientSupport/patientSupport.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/patient-support

	app.get('#/:specialty/patient-support', function (context) {	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PatientSupport/patientSupport.template';
		var isNew = null,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		
		if (app.currentview !== 'landing') {
			context.render('../Views/Home/landing3.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#loadingArea').html(childOutput);				
				});
			});
		
		} else {	
			context.render(templateStr, tmplData, function (childOutput) {
				$('#loadingArea').html(childOutput);				
			});
		}
		app.currentview = 'subpage';
	});
	
	
	
	
	// Diagnosis and Dosing Details
	// View:	Views/Home/landing3.template
	// View:	Views/PatientSupport/diagnosisDosingDetail.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/dosing-detail

	app.get('#/:specialty/dosing-detail', function (context) {	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/PatientSupport/diagnosisDosingDetail.template';
		var isNew = null,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		
		if (app.currentview !== 'landing') {
			context.render('../Views/Home/landing3.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#loadingArea').html(childOutput);				
				});
			});
		
		} else {	
			context.render(templateStr, tmplData, function (childOutput) {
				$('#loadingArea').html(childOutput);				
			});
		}
		app.currentview = 'subpage';
	});



	// Prescription
	// View:	Views/Home/landing3.template
	// View:	Views/Prescription/prescription.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/prescription

	app.get('#/:specialty/prescription', function (context) {	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/Prescription/prescription.template';
		var isNew = null,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		
		if (app.currentview !== 'landing') {
			context.render('../Views/Home/landing3.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#loadingArea').html(childOutput);				
				});
			});
		
		} else {	
			context.render(templateStr, tmplData, function (childOutput) {
				$('#loadingArea').html(childOutput);				
			});
		}
		app.currentview = 'subpage';
	});


	// Success Modal
	// View:	Views/Home/landing3.template
	// View:	Views/Prescription/prescriptionSuccessModal.template
	// URL: http://localhost:8080/Prototype/index2.html#/derma/prescription-success

	app.get('#/:specialty/prescription-success', function (context) {	
		var data = patientData[this.params['id']];
		var templateStr = '../Views/Prescription/prescriptionSuccessModal.template';
		var isNew = null,
			specialty = this.params['specialty'],
			baseUrl = '#/' + specialty,
			tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };
	
		setHomeLinks('#/' + specialty);
		
		if (app.currentview !== 'landing') {
			context.render('../Views/Home/landing3.template', tmplData, function (output) {
				$('#mainTemplate').html(output);
				context.render(templateStr, tmplData, function (childOutput) {
					$('#loadingArea').html(childOutput);				
				});
			});
		
		} else {	
			context.render(templateStr, tmplData, function (childOutput) {
				$('#loadingArea').html(childOutput);				
			});
		}
		app.currentview = 'subpage';
	});


})();