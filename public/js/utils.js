/* All the utilies/plugins we can use for the app */

window.utils = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            //If the view is found (Should be in js/views folder with the naming convention of windows.[name])
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            //If view not found, alert an error
            } else {
                alert(view + " not found");
            }
        });

        //Perform callback after the templates are loaded
        $.when.apply(null, deferreds).done(callback);
    }
};