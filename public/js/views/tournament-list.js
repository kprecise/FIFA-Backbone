define([
    'backbone'
  ], function(Backbone) {

	window.TournamentListView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    render:function () {
	        $(this.el).html(this.template());
	        return this;
	    }

	});

});