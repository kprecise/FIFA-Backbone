
// REQUIRE MODULES AND GLOBAL VARIABLES

var express = require("express"),
    path = require("path"),
    webservices = require('./routes/crud');

var application_root = __dirname,
    port = process.env.PORT || 3000;

// CONFIG EXPRESS SERVER

var app = express.createServer();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/webservices', webservices.showStatus);
app.get('/webservices/list', webservices.findAll);
app.post('/webservices/create', webservices.create);
app.get('/webservices/find/:id', webservices.findById);
app.put('/webservices/update/:id', webservices.updateById);
app.delete('/webservices/delete/:id', webservices.deleteById);
app.get('/webservices/deleteAll', webservices.deleteAll);
app.get('/webservices/populate', webservices.populate);


app.get('/webservices/teams/list', webservices.findTeams);
app.post('/webservices/teams', webservices.addTeam);
app.get('/webservices/teams/:id', webservices.findTeamById);
app.delete('/webservices/teams/:id', webservices.deleteTeamById);


// LAUNCH SERVER

app.listen(port);
console.log('Server started on port: '+ port);