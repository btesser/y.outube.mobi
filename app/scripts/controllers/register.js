'use strict';

angular.module('youtubemobiApp')
  .controller('RegisterCtrl', function ($scope, User) {
    $scope.register = function(){
      if($scope.user.password.length && $scope.user.password === $scope.user.passwordConfirm){
        User.register($scope.user);
      }
    };
  });
