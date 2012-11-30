define([
	//Add the libraries we need for the following section
    'backbone'
  ], function(Backbone) {

  //Home View
	window.HomeView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    render:function () {
	    	//Update header container with template
	        $(this.el).html(this.template());
	        return this;
	    }

	});

});