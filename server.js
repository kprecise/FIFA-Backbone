
/* ===========================================
 REQUIRE MODULES AND SET UP GLOBAL VARIABLES
 =============================================*/

var express = require("express"),
    path = require("path"),
    webservices = require('./mongo-config'); //Include the file that contains all database functionality into variable

var application_root = __dirname,
    port = process.env.PORT || 3000;

/* ========================
 CONFIG EXPRESS SERVER
 ==========================*/

var app = express.createServer();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' //Outputs useful debugging info on server side */
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

/* ====================
 SET UP WEB SERVICES
 ======================*/

app.get('/webservices', webservices.showStatus); //Displays the status of the webservices and database connection
app.get('/webservices/teams/list', webservices.findTeams); //List out all the teams available from database
app.post('/webservices/teams', webservices.addTeam); //Adds a new team to the database
app.get('/webservices/teams/:id', webservices.findTeamById); //Find a team based on team ID
app.delete('/webservices/teams/:id', webservices.deleteTeamById); //Delete a team based on team ID

/* ==============
 LAUNCH SERVER
 ================*/

app.listen(port);
console.log('Server started on port: '+ port);