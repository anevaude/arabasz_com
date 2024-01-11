/* ==========================================================================
Original route script used for testing
This file is no longer used - please look at the task routes instead:
task1.js, task2.js, task3.js, task4.js
========================================================================== */
(function () {

    var app = Sammy.apps.body,
        patientData = { '1': { 'id': '1', 'firstName': 'Jane', 'lastName': 'Doe' },
            '2': { 'id': '2', 'firstName': 'Anilkumar', 'lastName': 'Damodharan' },
            '3': { 'id': '3', 'firstName': 'George', 'lastName': 'Williams' },
            '4': { 'id': '4', 'firstName': 'Vigdis', 'lastName': 'Finnbogadottir' },
            '5': { 'id': '5', 'firstName': 'Louis-Pierre', 'lastName': 'Mecklenberg' },
            '6': { 'id': '6', 'firstName': 'William', 'lastName': 'George' }
        },
        baseUrl = '#/task1';

    //Patient Dashboard route
    app.get('#/patient:templateNum/:id', function (context) {
        console.log("You're in the Patient route");
        //console.log(context);

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/Dashboard/patient' + templateNumber + '.template';

        context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (output) {

            if (app.currentview == 'patient-subview') {
                hideCardDetails();
            }
            else {
                $('#mainTemplate').html(output);
                updatePatientDashboardLinks();
            }
            context.render('../Views/Demographics/demographicBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#demographicBlurbTemplate');
            context.render('../Views/Diagnosis/diagnosisBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#diagnosisBlurbTemplate');
            context.render('../Views/Insurance/insuranceBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#insuranceBlurbTemplate');
            context.render('../Views/History/historyBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#historyBlurbTemplate');
            context.render('../Views/BenefitSummary/benefitSummaryBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#benefitSummaryBlurbTemplate');
            context.render('../Views/PriorAuthorization/priorAuthorizationBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#priorAuthorizationBlurbTemplate');
            context.render('../Views/Prescription/prescriptionBlurb.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#prescriptionBlurbTemplate');
            app.currentview = 'patient';
        });

    }); //End Patient Dashboard route


    //Demographic route
    app.get('#/patient/:id/demographic', function (context) {
        console.log("You're in the Patient Demographic route");

        var that = this;

        var data = patientData[this.params['id']];

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the insurance back
                showCardDetailsStatic($('#demographicEditDetailsTemplate').parent().parent());

                //context.render('../Views/Demographics/demographicEditDetails.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#demographicEditDetailsTemplate');
                context.render('../Views/Demographics/demographicEditDetails.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
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
                });
            });
        }
        //animate to the demographic view
        else {
            $('#demographicEditDetailsTemplate').parent().hide();
            //context.render('../Views/Demographics/demographicEditDetails.template', { 'patient': data, 'baseUrl': baseUrl }).replace('#demographicEditDetailsTemplate');
            context.render('../Views/Demographics/demographicEditDetails.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#demographicEditDetailsTemplate').html(childOutput);
                showCardDetails($('#demographicEditDetailsTemplate').parent().parent());
            });
        }
        app.currentview = 'patient-subview';


    }); //End Demographic route


    //Diagnosis route
    app.get('#/patient/:id/diagnosis', function (context) {
        console.log("You're in the Patient Diagnosis route");

        var that = this;
        var data = patientData[this.params['id']];

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);


                //hide everything but the insurance back
                showCardDetailsStatic($('#diagnosisTemplate').parent().parent());

                //context.render('../Views/Diagnosis/diagnosis.template', that.patient).appendTo('#diagnosisTemplate');
                context.render('../Views/Diagnosis/diagnosis.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#diagnosisTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });

            });
        }
        //animate to the insurance view
        else {
            $('#diagnosisTemplate').parent().hide();
            //context.render('../Views/Diagnosis/diagnosis.template', that.patient).appendTo('#diagnosisTemplate');
            context.render('../Views/Diagnosis/diagnosis.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#diagnosisTemplate').html(childOutput);
                showCardDetails($('#diagnosisTemplate').parent().parent());
            });
        }

    }); //End Diagnosis route

    //Insurance route
    app.get('#/patient/:id/insurance', function (context) {
        console.log("You're in the Patient Insurance route");

        var that = this;
        var data = patientData[this.params['id']]

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the insurance back
                showCardDetailsStatic($('#insuranceTemplate').parent().parent());

                //context.render('../Views/Insurance/insurance.template', that.patient).appendTo('#insuranceTemplate');
                context.render('../Views/Insurance/insurance.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#insuranceTemplate').html(childOutput);
                    app.currentview = 'patient';
                    //uniform js
                    initCustomFormFields();
                });

            });
        }
        //animate to the insurance view
        else {
            $('#insuranceTemplate').parent().hide();
            //context.render('../Views/Insurance/insurance.template', that.patient).appendTo('#insuranceTemplate');

            context.render('../Views/Insurance/insurance.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#insuranceTemplate').html(childOutput);
                showCardDetails($('#insuranceTemplate').parent().parent());
            });
        }

    }); //End Insurance route

    //Patient Support route
    app.get('#/patient/:id/patientSupport', function (context) {
        console.log("You're in the Patient Support route");

        var that = this;
        var data = patientData[this.params['id']];

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the insurance back
                showCardDetailsStatic($('#patientSupportTemplate').parent().parent());

                //context.render('../Views/PatientSupport/patientSupport.template', that.patient).appendTo('#patientSupportTemplate');
                context.render('../Views/PatientSupport/patientSupport.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#patientSupportTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the insurance view
        else {
            $('#patientSupportTemplate').parent().hide();
            //context.render('../Views/PatientSupport/patientSupport.template', that.patient).appendTo('#patientSupportTemplate');
            context.render('../Views/PatientSupport/patientSupport.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#patientSupportTemplate').html(childOutput);
                showCardDetails($('#patientSupportTemplate').parent().parent());
            });

        }

    }); //End Patient Support route

    //Patient Survey route
    app.get('#/patient/:id/patientSurvey', function (context) {
        console.log("You're in the Patient Survey route");

        var that = this;
        var data = patientData[this.params['id']];

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the insurance back
                showCardDetailsStatic($('#patientSurveyTemplate').parent().parent());

                //context.render('../Views/PatientSurvey/patientSurvey.template', that.patient).appendTo('#patientSurveyTemplate');
                context.render('../Views/PatientSurvey/patientSurvey.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#patientSurveyTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the insurance view
        else {
            $('#patientSurveyTemplate').parent().hide();
            //context.render('../Views/PatientSurvey/patientSurvey.template', that.patient).appendTo('#patientSurveyTemplate');
            context.render('../Views/PatientSurvey/patientSurvey.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#patientSurveyTemplate').html(childOutput);
                showCardDetails($('#patientSurveyTemplate').parent().parent());
            });
        }

    }); //End Patient Survey route


    //History route
    app.get('#/patient/:id/history', function (context) {
        console.log("You're in the history route");

        var that = this;
        var data = patientData[this.params['id']];

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the insurance back
                showCardDetailsStatic($('#historyTemplate').parent().parent());

                //context.render('../Views/History/history.template', that.patient).appendTo('#historyTemplate');
                context.render('../Views/History/history.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#historyTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the history view
        else {
            $('#historyTemplate').parent().hide();
            //context.render('../Views/History/history.template', that.patient).appendTo('#historyTemplate');
            context.render('../Views/History/history.template', { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#historyTemplate').html(childOutput);
                showCardDetails($('#historyTemplate').parent().parent());
            });
        }

    }); //End History route


    //Benefit Summary route
    app.get('#/patient/:id/benefitSummary:templateNum', function (context) {
        console.log("You're in the benefit Summary route");

        var that = this;
        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/BenefitSummary/benefitSummary' + templateNumber + '.template';

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the insurance back
                showCardDetailsStatic($('#benefitSummaryTemplate').parent().parent());

                context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#benefitSummaryTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the benefit Summary view
        else {
            $('#benefitSummaryTemplate').parent().hide();
            context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#benefitSummaryTemplate').html(childOutput);
                showCardDetails($('#benefitSummaryTemplate').parent().parent());
            });
        }

    }); //End Benefit Summary route

    //Prior Authorization route
    app.get('#/patient/:id/priorAuthorization:templateNum', function (context) {
        console.log("You're in the Prior Authorization route");

        var that = this;
        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/PriorAuthorization/priorAuthorization' + templateNumber + '.template';

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the Prior Authorization back
                showCardDetailsStatic($('#priorAuthorizationTemplate').parent().parent());

                //context.render('../Views/PriorAuthorization/priorAuthorization.template', that.patient).appendTo('#priorAuthorizationTemplate');
                context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#priorAuthorizationTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the Prior Authorization view
        else {
            $('#priorAuthorizationTemplate').parent().hide();
            //context.render('../Views/PriorAuthorization/priorAuthorization.template', that.patient).appendTo('#priorAuthorizationTemplate');
            context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#priorAuthorizationTemplate').html(childOutput);
                showCardDetails($('#priorAuthorizationTemplate').parent().parent());
            });
        }

    }); //End Prior Authorization route

    //Prescription route
    app.get('#/patient/:id/prescription:templateNum', function (context) {
        console.log("You're in the Prescription route");

        var that = this;
        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/Prescription/prescription' + templateNumber + '.template';

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient05.template', { 'patient': data, 'baseUrl': baseUrl }, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the Prior Authorization back
                showCardDetailsStatic($('#prescriptionTemplate').parent().parent());

                //context.render('../Views/Prescription/prescription.template', that.patient).appendTo('#prescriptionTemplate');
                context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                    $('#prescriptionTemplate').html(childOutput);
                    app.currentview = 'patient';

                    //uniform js
                    initCustomFormFields();
                });
            });
        }
        //animate to the Prescription view
        else {
            $('#prescriptionTemplate').parent().hide();
            //context.render('../Views/Prescription/prescription.template', that.patient).appendTo('#prescriptionTemplate');
            context.render(templateStr, { 'patient': data, 'baseUrl': baseUrl }, function (childOutput) {
                $('#prescriptionTemplate').html(childOutput);
                showCardDetails($('#prescriptionTemplate').parent().parent());
            });
        }

    }); //End Prescription route



})();