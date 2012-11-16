
//REQUIRE CONFIGURATION
require.config({
    baseUrl: "/js/",
    paths: {
        jquery: [
            "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min",
            "libs/jquery-1.7.1.min"
        ],
        underscore: [
            "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min",
            "libs/underscore-min"
        ],
        backbone: [
            "//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min",
            "libs/backbone-min"
        ],
        bootstrap: [
            "//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min",
            "libs/bootstrap.min"
        ]
    },
    shim: {
        underscore: {
          exports: "_"
        },
        backbone: {
          deps: ['underscore', 'jquery'],
          exports: 'Backbone'
        }
    }
});

//MAIN APP
require([
    'jquery',
    'backbone',
    'bootstrap',
    'utils',
    'models/models',
    'views/header',
    'views/home',
    'views/team',
    'views/tournament-list',
    'views/tournament'
    ], function($, Backbone) {

    var AppRouter = Backbone.Router.extend({

        routes: {
            ""                      : "home",
            "tournaments"           : "list",
            "tournaments/page/:page": "list",
            "teams"                 : "addTeam",
            "tournaments/add"       : "addTournament",
            "tournaments/:id"       : "tournamentDetails",
            "about"                 : "about"
        },

        initialize: function () {
            this.headerView = new HeaderView();
            $('.header').html(this.headerView.el);
        },

        home: function (id) {
            if (!this.homeView) {
                this.homeView = new HomeView();
            }
            $('#content').html(this.homeView.el);
            this.headerView.selectMenuItem('home-menu');
        },

        addTeam: function() {
            var teamCollection = new TeamCollection();
            teamCollection.fetch({success: function() {
                $('#content').html(new TeamView({collection:teamCollection}).el);
            }});

            this.headerView.selectMenuItem('add-team-menu');
        },   

        list: function(page) {
            /*
            var p = page ? parseInt(page, 10) : 1;
            var tournamentList = new TournamentCollection();
            tournamentList.fetch({success: function(){
                $("#content").html(new TournamentListView({model: tournamentList, page: p}).el);
            }});
            */
            $('#content').html(new TournamentListView().el);
            this.headerView.selectMenuItem('list-menu');
        }, 

        addTournament: function() {
            var tournament = new Tournament();
            $('#content').html(new TournamentView({model: tournament}).el);
            this.headerView.selectMenuItem('add-menu');
        },        

    });

    utils.loadTemplate(['HomeView', 'HeaderView', 'TeamView', 'TournamentListView', 'TournamentView'], function() {
        window.app = new AppRouter();
        Backbone.history.start();
    });



});
