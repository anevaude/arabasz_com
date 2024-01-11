/* ==========================================================================
Script used for the main route based on specialty
Prototype/index.html#/rheum
Prototype/index.html#/derma
Prototype/index.html#/gastro
========================================================================== */

(function () {

    var app = Sammy.apps.body,
        baseUrl = '#/';

    //Main specialty route
    app.get('#/:specialty', function (context) {

        var specialty = this.params['specialty'],
        baseUrl = '#/' + specialty,
        tmplData = { 'baseUrl': baseUrl, 'specialty': specialty };

        console.log("You're in the Main route");
        
        //keep track of the current view
        app.currentview = 'main';

        //Render the template
        context.render('../Views/Home/main.template', tmplData, function (output) {

            $('#mainTemplate').html(output);
            setHomeLinks('#/' + specialty);

            //dev tofix: replace the static version of jqgrid with the version from the styleguide
            //use jqgrid for the tables
            tableToGrid('.sortable-table', {
                cellLayout: 200,
                shrinkToFit: false,
                width: '617px',
                height: 'auto',
                sortname: 'Status',
                sortorder: 'asc',
                rowNum: 3,
                colNames: ['Name', 'Status', 'Start Date'],
                colModel: [{ name: 'Name', width: 240 },
                            { name: 'Status', width: 250 },
                            { name: 'StartDate', width: 140}]

            });

            //set up accordion
            accordion('.accordion');

        });

    }); //End of main specialty route

})();