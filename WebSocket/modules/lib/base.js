

var http = require('http');
var querystring = require('querystring');
var WorldUnitCity = {};

module.exports.WorldUnitCity = WorldUnitCity;
module.exports.ServerData  = {};

module.exports.isJson = function (str){
    
        var json = false;
        try {
           json =  JSON.parse(str);
        } catch (e) {
            console.log("Json Parse Error",str);
            console.log(e);
            throw e
            return false;
        }
        return json;
    
};

module.exports.broadcast = function (utfMsg){
    var connectedPlayers = Elkaisar.Arr.Players;
    
    for (var iii in connectedPlayers){
        connectedPlayers[iii].connection.sendUTF(utfMsg);
    }
};

exports.getPlayer = function (idPlayer){
    
    var player = Elkaisar.Arr.Players[idPlayer];
    if(player && player.connection && player.connection.connected)
        return player;
    
    return null;
};


exports.escapeHtml = function (text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
};


exports.arrayChunk = function (arr, chunkSize = 50){
    var index = 0;
    var arrayLength = arr.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunkSize) {
        myChunk = myArray.slice(index, index+chunkSize);
        tempArray.push(myChunk);
    }
    return tempArray;  
    
};

exports.rand = function (min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};








