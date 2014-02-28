'use strict';

angular.module('youtubemobiApp')
  .service('User', function User($resource) {
    return $resource('http://localhost/users/:vid');
//    return $resource('http://y.outube.mobi/users/:vid');
  });
