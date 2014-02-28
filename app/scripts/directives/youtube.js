'use strict';

angular.module('youtubemobiApp')
  .directive('youtube', function ($sce) {
    return {
      template: '<iframe class="youtube-player" type="text/html" width="640" height="385" ng-if="showVideo" ng-src="{{ url }}" allowfullscreen frameborder="0"></iframe>' +
        '<div ng-if="!showVideo" style="background:black; width:640px; height:385px;"></div>',
      restrict: 'E',
      scope: {vid: '@'},
      link: function postLink(scope, element, attrs) {
        var urlBase = 'http://www.youtube.com/embed/';
        scope.url = urlBase + '';

        scope.$watch('vid', function(){
          if(scope.vid && scope.vid.length > 10) scope.showVideo = true;
          else scope.showVideo = false;
          scope.url = $sce.trustAsResourceUrl(urlBase + scope.vid);
        });
      }
    };
  });
