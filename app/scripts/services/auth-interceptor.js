'use strict';

angular.module('youtubemobiApp')
  .factory('authInterceptor', function ($rootScope, $q, $window, $injector) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.getItem('token');
          $injector.get('User').loggedIn = true;
        }
        else{
          $injector.get('User').loggedIn = false;
        }
          return config;
      },
      response: function (response) {
        if (response.status === 401) {
          $injector.get('User').logout();
        }
        return response || $q.when(response);
      }
    };
  });
