'use strict';

angular.module('youtubemobiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {
        // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
        $urlRouterProvider

            // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
            // Here we are just setting up some convenience urls.
            .when('/c?id', '/contacts/:id')
            .when('/user/:id', '/contacts/:id')
            .when('/manage-video', '/manage-video/spades/ace')

            // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
            .otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('login',{
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('register',{
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
        })
        .state('manage-videos',{
            url: '/manage-videos/:suit/card',
            templateUrl: 'views/manage-videos.html',
            controller: 'ManageVideosCtrl'
        });

  });
