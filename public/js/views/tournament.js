define([
	//Add the libraries we need for the following section
    'backbone'
  ], function(Backbone) {

  //Tournament View
	window.TournamentView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    //Handle click events for this view
	    events: {
	    	"click #start-btn" : "createTournament"
	    },

	    render:function () {
	    	//Update content container with template
        $(this.el).html(this.template());
        return this;
	    },

	    //Starts creating new tournament
	    createTournament:function() {
	    	console.log("Not implemented yet.");
	    }

	});

});