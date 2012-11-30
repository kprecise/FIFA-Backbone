define([
    //Add the libraries we need for the following section
    'backbone'
  ], function(Backbone) {

    //Header View
    window.HeaderView = Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            //Update content container with template
            $(this.el).html(this.template());
            return this;
        },

        //Updates the menu selected state for particular menu Item
        selectMenuItem: function (menuItem) {
            $('.nav li').removeClass('active');
            if (menuItem) {
                $('.' + menuItem).addClass('active');
            }
        }

    });


});