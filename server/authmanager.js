var crypto = require('crypto');
var Q = require('q');
/*
exports.generateHash = function (text, callback){
  var deferred = Q.defer();
  bcrypt.genSalt(10, function (error, salt){
    if (error){
      console.log('Error getting salt');
    }
    return bcrypt.hash(text, salt, function(error, hash){
      if(error) console.error("error encrypting password");
      deferred.resolve(hash);
    });
  });
  return deferred.promise;
};
*/
var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};
exports.getHash = function(password, salt){
	return hash(password, salt);
};
exports.verifyPassword = function(user, password){
	return user.password === hash(password, user.salt);
};
exports.getSalt = Crypto.randomBytes('256', function(err, buf) {
        if (err) throw err; return buf;});
