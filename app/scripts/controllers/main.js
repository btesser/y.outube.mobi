'use strict';

angular.module('youtubemobiApp')
  .controller('MainCtrl', function ($scope, Socket) {
    Socket.init();
  });
