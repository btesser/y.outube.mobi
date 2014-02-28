'use strict';

angular.module('youtubemobiApp')
  .service('Videos', function Videos(Socket) {dcc
    this.setVideo = function setVideo(suit, card, url, name) {
      socket.emit('setCard',{suit:suit, card:card, url:url, name:name});
    };
  });
