/* ==========================================================================
Main app script - Used to set up the Sammyjs router with Sammy Templates
========================================================================== */

(function () {

    var app = Sammy('body');
    app.use(Sammy.Template),
    baseUrl = '#/';

    $(document).ready(function () {
        app.run('#/');
    });

})();