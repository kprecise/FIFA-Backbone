
//REQUIRE CONFIGURATION
require.config({
    baseUrl: "/js/", //All the paths will have this base URL in front
    paths: {
        jquery: [
            "//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min", //CDN url
            "libs/jquery-1.7.1.min" //local url
        ],
        underscore: [
            "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min", //CDN url
            "libs/underscore-min" //local url
        ],
        backbone: [
            "//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min", //CDN url
            "libs/backbone-min" //local url
        ],
        bootstrap: [
            "//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/js/bootstrap.min", //CDN url
            "libs/bootstrap.min" //local url
        ],
        modernizr: [
            "libs/modernizr-2.5.3-respond-1.1.0.min" //local url
        ]
    },
    //This section makes sure that the libraries are used in the specified namespace and uses the correct dependencies (belive it's used to fix some issues with underscore and backbone)
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
    //Add the libraries we need for the following section
    'jquery',
    'backbone',
    'bootstrap',
    'modernizr',
    'utils',
    'models/models',
    'views/header',
    'views/home',
    'views/team',
    'views/tournament-list',
    'views/tournament'
    ], function($, Backbone) {


    //Backbone app router - routes particular url to particular functions
    var AppRouter = Backbone.Router.extend({

        //URL routes
        routes: {
            ""                      : "home",
            "tournaments"           : "list",
            "tournaments/page/:page": "list",
            "teams"                 : "addTeam",
            "tournaments/add"       : "addTournament",
            "tournaments/:id"       : "tournamentDetails",
            "about"                 : "about"
        },

        //Functions to route to

        //Initialize function is called when approuter is started
        initialize: function () {
            //Add in the header template
            this.headerView = new HeaderView();
            $('.header').html(this.headerView.el);
        },

        //Homepage route function
        home: function (id) {
            //Create home view
            if (!this.homeView) {
                this.homeView = new HomeView();
            }
            $('#content').html(this.homeView.el);

            //Select the home menu in the top navigation (in header view)
            this.headerView.selectMenuItem('home-menu');
        },

        //Teams route function
        addTeam: function() {
            //Create new Team Collection
            var teamCollection = new TeamCollection();
            //Get the latest team collection and pass it into a new Team view
            teamCollection.fetch({success: function() {
                $('#content').html(new TeamView({collection:teamCollection}).el);
            }});

            //Select the team menu in the top navigation (in header view)
            this.headerView.selectMenuItem('add-team-menu');
        },   

        //Tournament route function
        list: function(page) {
            /*
            var p = page ? parseInt(page, 10) : 1;
            var tournamentList = new TournamentCollection();
            tournamentList.fetch({success: function(){
                $("#content").html(new TournamentListView({model: tournamentList, page: p}).el);
            }});
            */
            //Create new Tournament List view
            $('#content').html(new TournamentListView().el);

            //Select the tournament list menu in the top navigation (in header view)
            this.headerView.selectMenuItem('list-menu');
        }, 

        //Add Tournament route function
        addTournament: function() {
            //Create a new Tournament model
            var tournament = new Tournament();
            //Create a new Tournament view and pass in tournament model
            $('#content').html(new TournamentView({model: tournament}).el);

            //Select the tournament add menu in the top navigation (in header view)
            this.headerView.selectMenuItem('add-menu');
        },        

    });

    //Load the HTMl templates into underscore templates and start the backbone router when completed
    //Note that template/view names have to be the same
    utils.loadTemplate(['HomeView', 'HeaderView', 'TeamView', 'TournamentListView', 'TournamentView'], function() {
        //Start backbone router
        window.app = new AppRouter();
        //Start history tracking (to track the different pages/states user goes to - so that browser back button works)
        Backbone.history.start();
    });



});
