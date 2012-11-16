
//REQUIRE MODULES

var mongoose = require('mongoose');

//CONFIG DB

var mongo_status = "not connected";

var db_url = "mongodb://heroku:test123@alex.mongohq.com:10074/app7958459" || process.env.MONGOHQ_URL,
db = mongoose.connect(db_url, function(err) {
  mongo_status = err;
});

mongoose.connection.on('open', function (err) {
 mongo_status = "connected";
});


//DEFINE SCHEMA AND COLLECTION

var teamSchema = new mongoose.Schema({
  name: { type:String, required: true },
  ranking: { type:Number, required: true }
});

var TeamModel = db.model('team', teamSchema);


//REST SERVICES

exports.showStatus = function (req, res) {
  res.send('Web services: Connected | ' + 'Mongoose: ' + mongo_status);
};

exports.addTeam = function(req, res) {
    console.log("POST: " + req.body);
    var team = new TeamModel({
      name: req.body.name,
      ranking: req.body.ranking
    });
    team.save(function (err) {
      if (!err) {
        console.log("Created new team");
        res.send(team);
      } else {
        console.log(err);
        res.send(err);
      }
    });
}

exports.findTeamById = function (req, res){
  TeamModel.findById(req.params.id, function (err, team) {
    if (!err) { 
      res.send(team);
    } else {
      console.log(err);
      res.send(err);
    }
  });
};

exports.findTeams = function (req, res){
  TeamModel.find(function (err, teams) {
    if (!err) {
      res.send(teams);
    } else {
      console.log(err);
      res.send('error');
    }
  });
};

exports.deleteTeamById = function (req, res){
  TeamModel.findById(req.params.id, function (err, team) {
    if (team) {
      team.remove(function (err) {
        if (!err) {
          console.log("Team removed");
          res.send('');
        } else {
          console.log(err);
        }
      });
    } else {
      console.log('Error - Product does not exist!');
      res.send('Error - Product does not exist!');
    }
  });
};