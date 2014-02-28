'use strict';

angular.module('youtubemobiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider

      // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
      // Here we are just setting up some convenience urls.
      .when('/c?id', '/contacts/:id')
      .when('/user/:id', '/contacts/:id')
      .when('/manage-videos', '/manage-videos/spades/ace')

      // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
      .otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
      })
      .state('manage-videos', {
        url: '/manage-videos/:suit/:card',
        templateUrl: 'views/manage-videos.html',
        controller: 'ManageVideosCtrl',
        auth: true
      });

  }).run(function($rootScope, User, $state, $injector){
    $rootScope.getService = function(service){return $injector.get(service);};
    $rootScope.$on('$stateChangeStart', function(e, state, stateParams){
      if(state.auth && !User.loggedIn){
        $state.go('login');
        User.loginComplete = (function($state, state){return function(){$state.go(state.name, stateParams)};})($state, state);
        e.preventDefault();
        return false;
      }
    })
  });
