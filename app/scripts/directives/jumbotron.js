'use strict';

angular.module('youtubemobiApp')
  .directive('jumbotron', function () {
    return {
      templateUrl: 'views/jumbotron.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
