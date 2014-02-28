'use strict';

angular.module('youtubemobiApp')
  .service('User', function User($resource, $window, SERVER_PREFIX) {
    var User = $resource(SERVER_PREFIX + 'users/:vid',{},{
      login: {
        url: SERVER_PREFIX + 'login',
        method: 'POST',
        isArray: false,
        cache: false,
        widthCredentials: true,
        interceptor: {
          response: function(response){
            User.loggedIn = true;
            console.log(response);
            $window.sessionStorage.setItem('token', response.resource.token);
            if(User.loginComplete && typeof User.loginComplete === 'function') User.loginComplete();
            User.loginComplete = false;
            return response;
          }
        }
      }
    });
    User.logout = function(){
      User.loggedIn = false;
      $window.sessionStorage.removeItem('token')
    };
    User.loggedIn = false;
    return User;

//    return $resource('http://y.outube.mobi/users/:vid');
  });