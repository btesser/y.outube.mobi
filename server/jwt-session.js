var expressJwt = require('express-jwt');
var secret = 'ABCisEasyAs123';
var jwt = require('jsonwebtoken');
//module.exports.secret = secret;
module.exports.ejwt = expressJwt({secret: secret});
module.exports.sign = function(profile, expireMin){
  var args = [profile, secret];
  console.log(args);
  console.log(arguments);
  console.log(expressJwt);
  console.log(expressJwt.sign);
  if(expireMin && !isNaN(expireMin = parseInt(expireMin,10))) args.push({expiresInMinutes: expireMin});
  console.log(args);
  var result = jwt.sign.apply(this, args);
  console.log(result);
  return result;
};