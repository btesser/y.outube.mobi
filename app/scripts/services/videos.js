'use strict';

angular.module('youtubemobiApp')
  .service('Videos', function Videos(Socket) {
    this.setVideo = function setVideo(suit, card, url, name) {
      socket.emit('setCard',{suit:suit, card:card, url:url, name:name});
    };
  });
