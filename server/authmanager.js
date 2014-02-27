var bcrypt = require('bcrypt');
var Q = require('q');
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
