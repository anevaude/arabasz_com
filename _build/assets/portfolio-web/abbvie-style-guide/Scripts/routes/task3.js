/* ==========================================================================
Script used to handle Task3 routes (by specialty)
========================================================================== */
(function () {

    var app = Sammy.apps.body,
        patientData = { '1': { 'id': '1', 'firstName': 'George', 'lastName': 'Williams', 'dob': 'August 16, 1951', 'shortdob': '08/16/51', 'email': 'gwilliams@yahoo.com', 'phone': '(617) 555-9028', 'address1': '123 Elm Street', 'address2': 'Waltham, MA 02453', 'doctor': 'Dr. Smith'} },
        currentview = '',
        baseUrl = '#/task3',
        taskPageStatus = { 'priorAuthorization': false };

    //06 Patient Page
    app.get('#/:specialty/task3/patient:templateNum/:id', function (context) {
        console.log("You're in the Task 3 - Patient route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        //default to empty template for patient dashboard
        var templateStr = '../Views/Dashboard/patient' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task3',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };


        setHomeLinks('#/' + specialty);


        context.render(templateStr, tmplData, function (output) {


            if (app.currentview == 'patient-subview') {
                hideCardDetails();

                //change the status messages based on whether or not priorAuth page was visited
                if (taskPageStatus.priorAuthorization) {
                    $('#priorAuthorizationCard .front .status').removeClass('status-wait');
                    $('#priorAuthorizationCard .front .status').html('<em>Approved 10/28/14</em>');

                    //add status to Prescription
                    $('#prescriptionCard .front').append('<div class="status status-ready"><i class="fa fa-circle"></i>Send Prescription</div>');


                }

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
    app.get('#/:specialty/task3/patient/:id/priorAuthorization:templateNum', function (context) {
        console.log("You're in Task 3 Prior Authorization route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/PriorAuthorization/priorAuthorization' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task3',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };

        setHomeLinks('#/' + specialty);
        // set page status to true - act as though content was filled out
        taskPageStatus.priorAuthorization = true;

        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient06.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the Prior Authorization back
                showCardDetailsStatic($('#priorAuthorizationTemplate').parent().parent());

                //context.render('../Views/PriorAuthorization/priorAuthorization.template', that.patient).appendTo('#priorAuthorizationTemplate');
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

    //32 Prescription
    app.get('#/:specialty/task3/patient/:id/prescription:templateNum', function (context) {
        console.log("You're in Task 3 Prescription route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/Prescription/prescription' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task3',
            tmplData = { 'patient': data, 'baseUrl': baseUrl, 'specialty': specialty };


        //swap out template based on specialty
        if (templateNumber === "35" || templateNumber === "36") {
            switch (specialty) {
                case 'rheum':
                    templateStr = '../Views/Prescription/prescription' + templateNumber + '.template';
                    break;
                case 'derma':
                    templateStr = '../Views/Prescription/prescription' + templateNumber + '-derma' + '.template';
                    break;
                default:
                    templateStr = '../Views/Prescription/prescription' + templateNumber + '-gastro' + '.template';
            }
        }




        setHomeLinks('#/' + specialty);
        //if currentview != patient
        //open the patient view first
        if (app.currentview !== 'patient') {
            context.render('../Views/Dashboard/patient06.template', tmplData, function (output) {
                $('#mainTemplate').html(output);

                //hide everything but the Prior Authorization back
                showCardDetailsStatic($('#prescriptionTemplate').parent().parent());

                context.render(templateStr, tmplData, function (childOutput) {
                    $('#prescriptionTemplate').html(childOutput);

                    //uniform js
                    initCustomFormFields();

                    $('a[data-reveal-id]').on('click', function () {
                        var id = $(this).attr('data-reveal-id');
                        $("#" + id).reveal('open');
                        return false;
                    });
                    setEmailLink(specialty);

                });
            });
        }
        //animate to the Prescription view
        else {
            $('#prescriptionTemplate').parent().hide();
            context.render(templateStr, tmplData, function (childOutput) {
                $('#prescriptionTemplate').html(childOutput);
                showCardDetails($('#prescriptionTemplate').parent().parent());
                setEmailLink(specialty);
            });
        }
        app.currentview = 'patient-subview';
    }); //End Prescription route

})();