/* ===============
 REQUIRE MODULES
 =================*/

var mongoose = require('mongoose');



/* ==========
 CONFIG DB
 ============*/

var mongo_status = "not connected"; //Mongo db connection status
var db_url = "mongodb://heroku:test123@alex.mongohq.com:10074/app7958459" || process.env.MONGOHQ_URL; //Set up connection URL (username/pwd set up by going to mongohq and adding new user/pwd)

//Catch errors that occur when connecting to mongo db
db = mongoose.connect(db_url, function(err) {
  mongo_status = err;
});
//Update status when connected to mongo db
mongoose.connection.on('open', function (err) {
 mongo_status = "connected";
});



/* ==============================
 DEFINE SCHEMA AND COLLECTION
 ================================*/

//Team Schema
var teamSchema = new mongoose.Schema({
  name: { type:String, required: true },
  ranking: { type:Number, required: true }
});
//Team Model
var TeamModel = db.model('team', teamSchema);



/* =============
 REST SERVICES
 ===============*/

//Show status of webservice and mongo db connection
exports.showStatus = function (req, res) {
  res.send('Web services: Connected | ' + 'Mongoose: ' + mongo_status);
};

//Add a team to the db based on content in the body of the request
exports.addTeam = function(req, res) {
    console.log("POST: " + req.body);
    //Create new model
    var team = new TeamModel({
      name: req.body.name,
      ranking: req.body.ranking
    });
    //Save new model
    team.save(function (err) {
      //If there's no error, send the team model created
      if (!err) {
        console.log("Created new team");
        res.send(team);
      //Else send the error message back
      } else {
        console.log(err);
        res.send(err);
      }
    });
}

//Find the team with a specific ID in the database
exports.findTeamById = function (req, res){
  TeamModel.findById(req.params.id, function (err, team) {
    //If there's no error, send the team model found
    if (!err) { 
      res.send(team);
    //Else send the error message back
    } else {
      console.log(err);
      res.send(err);
    }
  });
};

//Find all the teams in the database
exports.findTeams = function (req, res){
  TeamModel.find(function (err, teams) {
    //If there's no error, send the teams found
    if (!err) {
      res.send(teams);
    //Else send the error message back
    } else {
      console.log(err);
      res.send('error');
    }
  });
};

//Delete a team in the database based on ID specified in request
exports.deleteTeamById = function (req, res){
  //Query the db by ID
  TeamModel.findById(req.params.id, function (err, team) {
    //If there's a team found, remove that team
    if (team) {
      //Remove Team
      team.remove(function (err) {
        if (!err) {
          console.log("Team removed");
          res.send('Team removed');
        } else {
          console.log(err);
        }
      });
    //Otherwise send a error back saying team doesn't exist
    } else {
      console.log('Error - Product does not exist!');
      res.send('Error - Product does not exist!');
    }
  });
};