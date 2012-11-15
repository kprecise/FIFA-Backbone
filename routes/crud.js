
//REQUIRE MODULES

var mongoose = require('mongoose');
mongoose.on("error", function(err) {
  console.log("Mongoose error: " + err);
});

//CONFIG DB

var db_url = process.env.MONGOHQ_URL || "mongodb://heroku:test123@alex.mongohq.com:10074/app7958459",
db = mongoose.connect(db_url);

//DEFINE SCHEMA AND COLLECTION

Schema = mongoose.Schema;
var Product = new Schema({  
    title: { type: String, required: true },  
    description: { type: String, required: true },  
    style: { type: String, unique: true },  
    modified: { type: Date, default: Date.now }
});

var Tournament = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    numberOfTeams: { type: Number, required: true },
    matches : [{ 
      teamA: { type: String },
      teamB: { type: String },
      teamAScore: { type: Number },
      teamBScore: { type: Number },
      complete: { type: Boolean }
    }],
    complete: { type: Boolean}
});

var Team = new Schema({
  name: { type:String, required: true}
});

var TeamModel = mongoose.model('Team', Team);

var ProductModel = mongoose.model('Product', Product);  

//REST SERVICES

exports.showStatus = function (req, res) {
  res.send('Web services is running correctly.');
};

exports.findAll = function (req, res){
  ProductModel.find(function (err, products) {
    if (!err) {
      res.send(products);
    } else {
      console.log(err);
    }
  });
};

exports.create = function (req, res){
  var product;
  console.log("POST: ");
  console.log(req.body);
  product = new ProductModel({
    title: req.body.title,
    description: req.body.description,
    style: req.body.style,
  });
  product.save(function (err) {
    if (!err) {
      console.log("created");
    } else {
      console.log(err);
    }
  });
  res.send(product);
};

exports.findById = function (req, res){
  ProductModel.findById(req.params.id, function (err, product) {
    if (!err) {
      res.send(product);
    } else {
      console.log(err);
    }
  });
};

exports.updateById = function (req, res){
  ProductModel.findById(req.params.id, function (err, product) {
    product.title = req.body.title;
    product.description = req.body.description;
    product.style = req.body.style;
    product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      res.send(product);
    });
  });
};

exports.deleteById = function (req, res){
  ProductModel.findById(req.params.id, function (err, product) {
    if (product) {
      product.remove(function (err) {
        if (!err) {
          console.log("removed");
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

exports.deleteAll = function (req, res) {
  ProductModel.collection.drop(function(err, result) {
    if (!err) {
      console.log("Collection Removed");
      res.send('Collection Removed');
    } else {
      console.log(err);
    }
  });
};

exports.populate = function (req, res) {
    var products = [
    {
      "title": "My Awesome T-shirt",
      "description": "All about the details. Of course it's black.",
      "style": "12345"
    },
    {
      "title": "My Awesome pants",
      "description": "blah blah",
      "style": "12121"
    },
    {
      "title": "My Awesome dress",
      "description": "Hello test",
      "style": "54321"
    }];

    var count = products.length;
    products.forEach(function(product) {
        doc = new ProductModel(product);
        doc.save(function(err, result) {
            if (--count === 0) {
                // All done; call containing function's callback
                console.log("Data populated!");
                res.send('Data populated!');
            }
        });
    });
};

exports.addTeam = function(req, res) {
    var team = req.body;
    console.log("POST: " + req.body);
    team = new TeamModel({
      name: req.body.name
    });
    team.save(function (err) {
      if (!err) {
        console.log("Created new team");
      } else {
        console.log(err);
      }
    });
    res.send(team);
}

exports.findTeamById = function (req, res){
  TeamModel.findById(req.params.id, function (err, team) {
    if (!err) {
      res.send(team);
    } else {
      console.log(err);
    }
  });
};

exports.findTeams = function (req, res){
  TeamModel.find(function (err, teams) {
    if (!err) {
      res.send(teams);
    } else {
      console.log(err);
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