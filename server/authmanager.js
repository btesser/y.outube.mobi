// var crypto = require('crypto');
var bcrypt = require('bcrypt');
var Q = require('q');

var SALT_WORK_FACTOR = 10;
module.exports.encryptPassword = function(password){
  var deferred = Q.defer(); 
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return deferred.reject(err);
 
    // hash the password using our new salt
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) return deferred.reject(err);
 
      // override the cleartext password with the hashed one
      return deferred.resolve(hash);
    });
  });
  return deferred.promise;
};

module.exports.verifyPassword = function(passwordHash, passwordAttempt){
  var deferred = Q.defer();
  bcrypt.compare(passwordAttempt, passwordHash, function(err, isMatch){
    if (err) return deferred.reject(err);
    return deferred.resolve(isMatch);
  });
  return deferred.promise;
};
