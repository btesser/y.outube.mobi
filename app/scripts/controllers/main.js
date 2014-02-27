'use strict';

angular.module('youtubemobiApp')
  .controller('MainCtrl', function ($scope, $resource, Socket) {
    var Users = $resource('http://y.outube.mobi/users/:vid');
    $scope.users = Users.query();
    Socket.init();
  });
