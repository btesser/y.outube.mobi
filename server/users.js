var mongo = require('mongodb');
var mongoose = require('mongoose');
var am = require('./authmanager');
var schemas = require('./schemas');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure,
  User = schemas.User;

var connStr = 'mongodb://localhost:27017/youtube';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

exports.all = function(req,res){
  return User.find(function(err, users){
    res.send(users);
  });
};
exports.register = function(req,res){
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    youtubeId: req.body.youtubeId
  });
  user.setPassword(req.body.password);
  return user.save(function(err, user){
    res.send(user);
  });
};

module.exports.login = function login(req, res){
  User.findOne({ email: req.body.email}, function(err, user) {
    if (err) throw err;
    user.verifyPassword(req.body.password).then(function(response){
      if(response) res.send(user);
      else res.send(401, {error: "Incorrect Password"});
    }, function(err) {
      res.send(401, "Incorrect Password");
    });
  });
};
