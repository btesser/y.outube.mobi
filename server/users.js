var mongo = require('mongodb');
var mongoose = require('mongoose');
var am = require('./authmanager');
var schemas = require('./schemas');
var jwt = require('./jwt-session');
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
    youtubeId: req.body.youtubeId,
    videoId: req.body.videoId,
    password: req.body.password
  });
  user.setPassword(req.body.password).then(function(response){
    console.log(response);
  });

  return user.save(function(err, user){
    console.log('save', arguments[0].errors.password);
    res.send(user);
  });
};

module.exports.login = function login(req, res){
  console.log('login');
  User.findOne({ email: req.body.email}, function(err, user) {
    if (err) throw err;
    console.log(user);
    user.verifyPassword(req.body.password).then(function(response){
      var returnToUser = {
        name: user.name,
        videoId: user.videoId,
        email: user.email,
        youtubeId: user.youtubeId
      };
      console.log(returnToUser);
      var token = jwt.sign(returnToUser, 60);
      returnToUser.token = token;
      if(response) res.json(returnToUser);
      else res.send(401, {error: "Incorrect Password"});
    }, function(err) {
      res.send(401, "Incorrect Password");
    });
  });
};
