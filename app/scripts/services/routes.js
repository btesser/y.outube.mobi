'use strict';

angular.module('youtubemobiApp')
  .constant('routes', {
    'home': {
      url: '/',
      controller: 'HomeCtrl',
      linktext: 'Home',
      priority: 1
    },
    'register': {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl',
      linktext: 'Register',
      priority: 3
    },
    'login': {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl',
      linktext: 'Login',
      priority: 2
    }
  });
