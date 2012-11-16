define([
    'backbone',
    'models/models'
  ], function(Backbone) {

	window.TeamView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    events: {
	    	"click #add-team-btn" : "saveTeam",
	    	"click .remove-btn" : "removeTeam"
	    },

	    render:function () {
	        $(this.el).html(this.template({collection:this.collection}));
	        return this;
	    },

	    saveTeam: function () {
	        $('.control-group').removeClass('error');
	        $('.help-inline').html('');
	        
	        var self = this;

	        var team = new Team();

	        team.save({name:$('#teamName').val(),ranking:$('#teamRanking option:selected').val()}, {
	            success: function (model) {
	            	Backbone.history.loadUrl();
	            },
	            error: function(model, error) {
	                $('#teamName').parents('.control-group').addClass('error').find('.help-inline').html(error);
	            }
	        });
	    },

	    removeTeam: function (ev) {
	    	//Remove the team
	    	$(ev.target).parents('tr').remove();

	    	var teamId = parseInt($(ev.target).parents('td').siblings('.team-id').html());

		    jQuery.ajax({
		      url: '/webservices/teams/' + $(ev.target).parents('td').siblings('.team-id').html(), 
		      type: "DELETE",
		      success: function (data, textStatus, jqXHR) { 
		          console.log("Post response:"); 
		          console.dir(data); 
		          console.log(textStatus); 
		          console.dir(jqXHR); 
		      }
		    });
	    }

	});

});