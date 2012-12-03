define([
	//Add the libraries we need for the following section
    'backbone',
    'models/models'
  ], function(Backbone) {

  	//Team View
	window.TeamView = Backbone.View.extend({

	    initialize:function () {
	        this.render();
	    },

	    //Handle click events
	    events: {
	    	"click #add-team-btn" : "saveTeam", //Save Button
	    	"click .remove-btn" : "removeTeam"  //Remove Button
	    },

	    render:function () {
	    	//Update content container with template
	      $(this.el).html(this.template({collection:this.collection}));
	      return this;
	    },

	    //Add a new team to database
	    saveTeam: function () {
	        //Remove all previously add error message (if any)
	        $('.control-group').removeClass('error');
	        //Clear error messages
	        $('.help-inline').html('');
	        
	        var self = this;
	        //Create a new team model
	        var team = new Team();

	        //Save team model with fields from the form
	        team.save({name:$('#teamName').val(),ranking:$('#teamRanking option:selected').val()}, {
	            //If successful, reload page
	            success: function (model) {
	            	Backbone.history.loadUrl();
	            },
	            //Handle errors
	            error: function(model, error) {
	                $('#teamName').parents('.control-group').addClass('error').find('.help-inline').html(error);
	            }
	        });
	    },

	    //Remove team in database
	    removeTeam: function (ev) {
	    	//Remove the team
	    	$(ev.target).parents('tr').remove();

	    	//Get the Team ID
	    	var teamId = $(ev.target).parents('td').siblings('.team-id').html();

	    	//Get the model with specific ID from the collection
	    	var model = this.collection.get(teamId);
	    	
	    	//Destroys the model
	    	model.destroy({success:function(model, response) {
	    		console.log('Success!');
	    	}});

	    	//Ajax call to the delete webservice (include ID in url) - AJAX way to delete the team
	    	/*
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
				*/
	    }

	});

});