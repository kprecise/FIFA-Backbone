define([
    'backbone'
  ], function(Backbone) {

	window.TournamentView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    events: {
	    	"click #start-btn" : "createTournament"
	    },

	    render:function () {
	        $(this.el).html(this.template());
	        return this;
	    },

	    createTournament:function() {
	    	console.log("Not implemented yet.");
	    }

	});

});