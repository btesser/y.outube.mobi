'use strict';

angular.module('youtubemobiApp')
  .directive('footer', function () {
    return {
      templateUrl: 'views/footer.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

      }
    };
  });
