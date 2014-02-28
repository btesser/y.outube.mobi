var mongoose = require('mongoose');
var am = require('./authmanager');
var userSchema = mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  youtubeId: { type: String},
  email: { type: String, required: true},
  password: {type: String, required: true}
});
userSchema.pre('save', true, function(next, done) {
  console.log('pre');
  var user = this;
  console.log(user);
  console.log(next);
  if (!user.isModified('password')){
    console.log("password not modified");
    return console.log(next(function(){console.log('next', arguments)}));
  }
  console.log('password modified');
  next(function(){console.log('next')});
  this.setPassword(user.password).then(done);
});

userSchema.methods.setPassword = function(password){
  var user = this;
  return am.encryptPassword(password).then(function(encryptedPassword){
    return user.password = encryptedPassword;
  }, function (err){
    console.error("error encrypting password");
    console.log(err);
    return err;
  });
};
userSchema.methods.verifyPassword = function(password){
  return am.verifyPassword(this.password, password);
};
module.exports.User = mongoose.model('User', userSchema);
