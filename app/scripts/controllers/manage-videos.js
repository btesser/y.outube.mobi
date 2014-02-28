'use strict';

angular.module('youtubemobiApp')
  .controller('ManageVideosCtrl', function ($scope, Suits, Cards, $stateParams) {
    $scope.cards = Cards;
    $scope.suits = Suits;
    $scope.videos = {};

    $scope.card = Cards[0];
    $scope.suit = Suits[0];
    angular.forEach(Suits, function(suit){
      $scope.videos[suit.name] = {};
      if(suit.name.toLowerCase() === $stateParams.suit.toLowerCase()) $scope.suit = suit;
      angular.forEach(Cards, function(card){
      if(card.name.toLowerCase() === $stateParams.card.toLowerCase()) $scope.card = card;
        $scope.videos[suit.name][card.abbreviation] = {
          url: null,
          namePosition: null
        };
      });
    });
    $scope.next = function next() {
      $scope.card = Cards[Cards.indexOf($scope.card)+1];
      if(typeof $scope.card === 'undefined'){
        $scope.card = Cards[0];
        $scope.suit = Suits[Suits.indexOf($scope.suit)+1];
        if(typeof $scope.suit === 'undefined') $scope.suit = Suits[0];
      }
    };
    $scope.previous = function next() {
      $scope.card = Cards[Cards.indexOf($scope.card)-1];
      if(typeof $scope.card === 'undefined'){
        $scope.card = Cards[Cards.length-1];
        $scope.suit = Suits[Suits.indexOf($scope.suit)-1];
        if(typeof $scope.suit === 'undefined') $scope.suit = Suits[Suits.length-1];
      }
    };

  });
