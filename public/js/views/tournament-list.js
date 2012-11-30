define([
	//Add the libraries we need for the following section
    'backbone'
  ], function(Backbone) {

	window.TournamentListView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    render:function () {
	    	//Update content container with template
        $(this.el).html(this.template());
        return this;
	    }

	});

});