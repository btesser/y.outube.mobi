'use strict';

angular.module('youtubemobiApp')
  .controller('LoginCtrl', function ($scope, User) {
    $scope.login = function(){
      User.login({
        email: $scope.user.email,
        password: $scope.user.password
      }, function(response){
        console.log("logged in", response);
      })
    };
  });
