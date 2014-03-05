'use strict';

angular.module('youtubemobiApp')
  .directive('header', function (routes) {
    return {
      templateUrl: '/views/header.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        scope.links = $.map(routes, function(route){
          if(angular.isDefined(route.linktext)){
            return route;
          }
        });

      }
    };
  });
