'use strict'

var getRandomColor = require('../common/getRandomColor.js');
var io = require('socket.io-client');
var chart = require('./plot.client.js');
var Mustache = require('mustache');

var socket = (function(){
  var $el = $('#symbolContainer');
  var $ul = $el.find('#searchlist');
  var template = $el.find('#stock-template').html();
  var socket = io();
  socket.on('otheradded',function(dataobj){
    var color = getRandomColor();
    var name = dataobj['rawdata']['name'];
    var symbol = dataobj['rawdata']['dataset_code'];
    $.notify("Someone just added "+symbol, 
             { position:"bottom left",
               style: 'bootstrap',
                className: 'info'
             }
          );
      chart.draw(dataobj['rawdata'],symbol,name,color)
      var colorstyle = "border-left-color:"+color;
      $ul.append(Mustache.render(template,{color:colorstyle, name:name, symbol:symbol}));
  })
  
  socket.on('otherdeleted',function(id){
    $.notify("Someone else just removed "+id, 
         { position:"bottom left",
           style: 'bootstrap',
            className: 'info'
         }
      );
    $('#'+id).parent('li').remove();
    chart.remove(id);
  })
  
  return {socket:socket}

})();

module.exports= socket;