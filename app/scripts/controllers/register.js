'use strict';

angular.module('youtubemobiApp')
  .controller('RegisterCtrl', function ($scope, User) {
        console.log(window.u = User);
    $scope.register = function(){
      if($scope.user.password.length && $scope.user.password === $scope.user.passwordConfirm){
        User.save($scope.user);
      }
    };
  });
