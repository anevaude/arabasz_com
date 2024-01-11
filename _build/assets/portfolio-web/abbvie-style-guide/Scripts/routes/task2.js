/* ==========================================================================
Script used to handle Task2 routes (by specialty)
========================================================================== */
(function () {

    var app = Sammy.apps.body,
        patientData = { '1': { 'id': '1', 'firstName': 'Jane', 'lastName': 'Grey', 'dob': 'March 14, 1943', 'shortdob': '03/14/43', 'email': 'jane.grey@gmail.com', 'phone': '(617) 555-2465', 'address1': '101 Bluebird Lane', 'address2': 'Newton, MA 02465', 'doctor': 'Dr. Jones'} },
        currentview = '',
        baseUrl = '#/task2';

    //06 Patient Page
    app.get('#/:specialty/task2/patient:templateNum/:id', function (context) {
        console.log("You're in the Task 2 - Patient route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        //default to empty template for patient dashboard
        var templateStr = '../Views/Dashboard/patient' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task2',
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

    //14 Prior Authorization
    app.get('#/:specialty/task2/patient/:id/priorAuthorization:templateNum', function (context) {
        console.log("You're in Task 2 Prior Authorization route");

        var data = patientData[this.params['id']];
        var templateNumber = this.params['templateNum'];
        var templateStr = '../Views/PriorAuthorization/priorAuthorization' + templateNumber + '.template',
            specialty = this.params['specialty'],
            baseUrl = '#/' + specialty + '/task2',
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

})();