/* ==========================================================================
Script used to handle Task1 routes (by specialty)
========================================================================== */
(function () {

    var app = Sammy.apps.body,
        patientData = { '1': { 'id': '1', 'firstName': 'Jane', 'lastName': 'Grey', 'dob': 'March 14, 1943', 'shortdob': '03/14/43', 'email': 'jane.grey@gmail.com', 'phone': '(617) 555-2465', 'address1': '101 Bluebird Lane', 'address2': 'Newton, MA 02465', 'doctor': 'Dr. Jones'} },
        currentview = '',
        baseUrl = '#/task1',
        //Used to keep track of which pages have been visited to simulate content entered in edit pages.
        taskPageStatus = { 'demographic': false,
            'diagnosis': false,
            'insurance': false,
            'benefitSummary': false
        };

    //First url in task1
    // called when created a new patient
    app.get('#/:specialty/task1/patient/:id/demographic/new', function (context) {
        console.log("Task1 - New Patient");
        //reset variables
        taskPageStatus = { 'demographic': false,
            'diagnosis': false,
            'insurance': false,
            'benefitSummary': false
        };
        app.currentview = '';
        var specialty = this.params['specialty'];
        //go to correct url
        window.location = '#/' + specialty + '/task1/patient/1/demographic';
    });


    //05 Patient Page
    app.get('#/:specialty/task1/patient:templateNum/:id', function (context) {
        console.log("You're in the Task 1 - Patient route");

        var data = patientData[this.params['id']],
            templateNumber = this.params['templateNum'];
        //default to empty template for patient dashboard
        var templateStr = '../Views/Dashboard/patient' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task1',
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

            //Hide/Show content based on the taskPageStatus
            if (taskPageStatus.demographic) {
                context.render('../Views/Demographics/demographicBlurb.template', tmplData).replace('#demographicBlurbTemplate');
                //update the status
                $('#demographicCard').addClass('status-complete');
            }
            else {
                //update the status
                $('#demographicCard').removeClass('status-complete');
                $('#demographicNewPatientBlurb').show();
            }
            if (taskPageStatus.diagnosis) {
                context.render('../Views/Diagnosis/diagnosisBlurb.template', tmplData).replace('#diagnosisBlurbTemplate');
                $('#diagnosisCard').addClass('status-complete');
            }
            else {
                //update the status
                $('#diagnosisCard').removeClass('status-complete');
                $('#diagnosisNewPatientBlurb').show();
            }
            if (taskPageStatus.insurance) {
                context.render('../Views/Insurance/insuranceBlurb.template', tmplData).replace('#insuranceBlurbTemplate');
                $('#insuranceCard').addClass('status-complete');
            }
            else {
                //update the status
                $('#insuranceCard').removeClass('status-complete');
                $('#insuranceNewPatientBlurb').show();
            }
            if (taskPageStatus.benefitSummary) {
                context.render('../Views/BenefitSummary/benefitSummaryBlurb.template', tmplData).replace('#benefitSummaryBlurbTemplate');
                context.render('../Views/History/historyBlurb.template', tmplData).replace('#historyBlurbTemplate');
                context.render('../Views/PriorAuthorization/priorAuthorizationBlurb.template', tmplData).replace('#priorAuthorizationBlurbTemplate');
                context.render('../Views/Prescription/prescriptionBlurb.template', tmplData).replace('#prescriptionBlurbTemplate');
                $('#benefitSummaryCard').addClass('status-complete');
            }
            else {
                //update the status
                $('#benefitSummaryCard').removeClass('status-complete');
                $('#historyNewPatientBlurb').show();
                $('#benefitSummaryNewPatientBlurb').show();
                $('#priorAuthorizationNewPatientBlurb').show();
                $('#prescriptionNewPatientBlurb').show();
            }

            //Update status based on the taskPageStatus
            if (!taskPageStatus.insurance && taskPageStatus.diagnosis) {
                $('#insuranceNewPatientBlurb .status').show();
            }
            else if (!taskPageStatus.benefitSummary && taskPageStatus.insurance) {
                $('#benefitSummaryNewPatientBlurb .status').show();
            }

            app.currentview = 'patient';
        });



    }); //End Patient Dashboard route



    //07 Edit Demographic Info (Empty or Filled)
    app.get('#/:specialty/task1/patient/:id/demographic', function (context) {
        console.log("You're in the Task 1 Patient Demographic route");

        var data = patientData[this.params['id']];
        var templateStr = (taskPageStatus.demographic) ? '../Views/Demographics/demographicEditDetails.template' : '../Views/Demographics/demographicNewDetails.template';
        var isNew = !taskPageStatus.demographic,
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task1',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        // set page status to true - act as though content was filled out
        taskPageStatus.demographic = true;
        setHomeLinks('#/' + specialty);

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                showCardDetailsStatic($('#demographicEditDetailsTemplate').parent().parent());

                //show/hide new patient name/last name in the header depending on whether content is filled in
                $('.patient_content').toggle(!isNew);

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#demographicEditDetailsTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();

                    $('body').dateSelectBoxes({
                        monthElement: $('#month1'),
                        dayElement: $('#day1'),
                        yearElement: $('#year1'),
                        generateOptions: true,
                        keepLabels: true
                    });

                    simulateAutoSave();

                });
            });
        }
        //animate to the demographic view
        else {
            $('#demographicEditDetailsTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#demographicEditDetailsTemplate').html(childOutput);
                showCardDetails($('#demographicEditDetailsTemplate').parent().parent());
            });
        }
        app.currentview = 'patient-subview';
    }); //End Demographic route





    //09 Diagnosis and Prescription (Empty or Filled)
    app.get('#/:specialty/task1/patient/:id/diagnosis', function (context) {
        console.log("You're in the Task 1 Patient Diagnosis route");



        var data = patientData[this.params['id']];
        var templateStr = '',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task1',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        //swap out template based on specialty
        switch (specialty) {
            case 'rheum':
                templateStr = (taskPageStatus.diagnosis) ? '../Views/Diagnosis/diagnosis.template' : '../Views/Diagnosis/diagnosisNewDetails.template';
                break;
            case 'derma':
                templateStr = (taskPageStatus.diagnosis) ? '../Views/Diagnosis/diagnosis-derma.template' : '../Views/Diagnosis/diagnosisNewDetails-derma.template';
                break;
            default:
                templateStr = (taskPageStatus.diagnosis) ? '../Views/Diagnosis/diagnosis-gastro.template' : '../Views/Diagnosis/diagnosisNewDetails-gastro.template';
        }


        // set page status to true - act as though content was filled out
        taskPageStatus.diagnosis = true;
        setHomeLinks('#/' + specialty);

        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                showCardDetailsStatic($('#diagnosisTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#diagnosisTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();


                    simulateAutoSave();
                });
            });
        }
        //animate to the demographic view
        else {
            $('#diagnosisTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#diagnosisTemplate').html(childOutput);
                showCardDetails($('#diagnosisTemplate').parent().parent());
            });
        }
        app.currentview = 'patient-subview';

    }); //End Diagnosis route




    //08 Insurance (Prefilled)
    app.get('#/:specialty/task1/patient/:id/insurance', function (context) {
        console.log("You're in the Task 1 Patient Insurance route");

        var data = patientData[this.params['id']];
        var templateStr = (taskPageStatus.insurance) ? '../Views/Insurance/insurance.template' : '../Views/Insurance/insuranceNewDetails.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task1',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        // set page status to true - act as though content was filled out
        taskPageStatus.insurance = true;
        taskPageStatus.benefitSummary = true;
        setHomeLinks('#/' + specialty);

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                showCardDetailsStatic($('#insuranceTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#insuranceTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();


                    simulateAutoSave();
                });
            });
        }
        //animate to the insurance view
        else {
            $('#insuranceTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#insuranceTemplate').html(childOutput);
                showCardDetails($('#insuranceTemplate').parent().parent());
            });
        }
        app.currentview = 'patient-subview';

    }); //End Insurance route



    //12 Benefit Summary
    app.get('#/:specialty/task1/patient/:id/benefitSummary:templateNum', function (context) {
        console.log("You're in the Task 1 Benefit Summary route");

        // set page status to true - act as though content was filled out
        //taskPageStatus.benefitSummary = true;

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/BenefitSummary/benefitSummary' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task1',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        setHomeLinks('#/' + specialty);
        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                showCardDetailsStatic($('#benefitSummaryTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#benefitSummaryTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the benefit summary view
        else {
            $('#benefitSummaryTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#benefitSummaryTemplate').html(childOutput);
                showCardDetails($('#benefitSummaryTemplate').parent().parent());
            });
        }
        app.currentview = 'patient-subview';

    }); //End Benefit Summary route


    // Task 2 Starts at Prior Authorization


})();