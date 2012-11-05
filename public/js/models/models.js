define([
    'backbone'
  ], function(Backbone) {


  	window.Team = Backbone.Model.extend({

	    urlRoot: "/webservices/teams",

	    idAttribute: "_id",

		defaults: {
			_id: null,
			name: "Team BR"
		},
		validate: function(attrs) {
			if (attrs.name.length < 0) {
				return "You must enter a name.";
			}
		}

	});


	window.TeamCollection = Backbone.Collection.extend({
		
		url: "/webservices/teams/list",

		model: Team,

		initialize: function (models, options) {
		}
	});

	window.Tournament = Backbone.Model.extend({

	    urlRoot: "/tournament",

	    idAttribute: "_id",

	});

	window.TournamentCollection = Backbone.Collection.extend({

	    model: Tournament,

	    url: "/tournament"

	});

});