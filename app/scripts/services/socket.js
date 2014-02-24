'use strict';

angular.module('youtubemobiApp')
  .service('Socket', function Socket() {
    var socket;
    this.init = function init(){
      var socket = this.socket = io.connect('107.170.1.149:8080');
      socket.on('identify',function(){
        console.log('ID Request', arguments);
        socket.emit('identification',{
          id: prompt('Please enter client id'),
          type: 'magician'
        });
      });
      socket.on('status',function(data){
        console.log('message!!!');
        
        if(data.spectator == true){
          console.log('spectator connectd');
        }
        else{
          console.log('spectator not connectd');
        }
      });
      window.socket = socket;
    };
    this.getStatus = function getStatus(){
      socket.emit('getStatus');
    }
  });
