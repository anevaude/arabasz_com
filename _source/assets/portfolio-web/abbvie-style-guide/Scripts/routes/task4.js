/* ==========================================================================
Script used to handle Task4 routes (by specialty)
========================================================================== */
(function () {

    var app = Sammy.apps.body,
        patientData = { '1': { 'id': '1', 'firstName': 'Anilkumar', 'lastName': 'Damodharan', 'dob': 'July 5, 1981', 'shortdob': '07/05/81', 'email': 'anikumard@gmail.com', 'phone': '(617) 555-4505', 'address1': '144 Pennsylvania Avenue', 'address2': 'Gloucester, MA 01931', 'doctor': 'Dr. Jones'} },
        currentview = '',
        baseUrl = '#/task4';

    //06 Patient Page
    app.get('#/:specialty/task4/patient:templateNum/:id', function (context) {
        console.log("You're in the Task 4 - Patient route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        //default to empty template for patient dashboard
        var templateStr = '../Views/Dashboard/patient' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task4',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

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

    //22 Prior Authorization
    app.get('#/:specialty/task4/patient/:id/priorAuthorization:templateNum', function (context) {
        console.log("You're in Task 4 Prior Authorization route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/PriorAuthorization/priorAuthorization' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task4',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        setHomeLinks('#/' + specialty);
        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient06.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the Prior Authorization back
                showCardDetailsStatic($('#priorAuthorizationTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#priorAuthorizationTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();

                    $('a[data-reveal-id]').on('click', function () {
                        var id = $(this).attr('data-reveal-id');
                        $("#" + id).reveal('open');
                        return false;
                    });


                });
            });
        }
        //animate to the Prior Authorization view
        else {
            $('#priorAuthorizationTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#priorAuthorizationTemplate').html(childOutput);
                showCardDetails($('#priorAuthorizationTemplate').parent().parent());
            });
        }
        app.currentview = 'patient-subview';
    }); //End Prior Authorization route

    //08 Insurance (Prefilled)
    app.get('#/:specialty/task4/patient/:id/insurance', function (context) {
        console.log("You're in the Task 4 Patient Insurance route");

        var data = patientData[this.params['id']];
        var templateStr = '../Views/Insurance/insurance.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task4',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        setHomeLinks('#/' + specialty);
        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05B.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                showCardDetailsStatic($('#insuranceTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#insuranceTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();

                    $('#returnPatient').attr('href', '#/task4/patient05B/' + data.id);
                });
            });
        }
        //animate to the insurance view
        else {
            $('#insuranceTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#insuranceTemplate').html(childOutput);
                showCardDetails($('#insuranceTemplate').parent().parent());
                $('#returnPatient').attr('href', '#/task4/patient05B/' + data.id);
            });
        }
        app.currentview = 'patient-subview';

    }); //End Insurance route


    //12 Benefit Summary
    app.get('#/:specialty/task4/patient/:id/benefitSummary:templateNum', function (context) {
        console.log("You're in the Task 4 Benefit Summary route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/BenefitSummary/benefitSummary' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task4',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        setHomeLinks('#/' + specialty);
        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05B.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                showCardDetailsStatic($('#benefitSummaryTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#benefitSummaryTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();
                    $('#returnPatient').attr('href', '#/task4/patient05B/' + data.id);
                    $('#priorAuthLink').attr('href', '#/task4/patient/' + data.id + '/priorAuthorization27b');
                });
            });
        }
        //animate to the benefit summary view
        else {
            $('#benefitSummaryTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#benefitSummaryTemplate').html(childOutput);
                showCardDetails($('#benefitSummaryTemplate').parent().parent());
                $('#returnPatient').attr('href', '#/task4/patient05B/' + data.id);
                $('#priorAuthLink').attr('href', '#/task4/patient/' + data.id + '/priorAuthorization27b');
            });
        }
        app.currentview = 'patient-subview';

    }); //End Benefit Summary route


})();