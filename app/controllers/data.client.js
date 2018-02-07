'use strict'

var getRandomColor = require('../common/getRandomColor.js');
var socket = require('./socket.client.js');
var chart = require('./plot.client.js');

var datahandler = (function(){
  var $loadpage = $(".overlay");
  
  function getNew(symbol,chart,list,emit,n) {
    $loadpage.show();
      $.ajax({
        url:'/search/'+symbol
      }).done(function(data){
      if (data['dataset']) {
        if (emit) {
          socket.socket.emit('data',{rawdata:data['dataset']});
        }
        var plotData = data['dataset'];
        var plotSymbol = data['dataset']['dataset_code'];
        var name = data['dataset']['name'];
        var color = getRandomColor();
        chart(plotData,plotSymbol,name,color);
        list(plotSymbol,name,color);
        
        if (n>1){
          if($( "li" ).length==n){
            $loadpage.hide(); 
          }
        } else {
          $loadpage.hide(); 
        }
      }  else {
        alert('No stock found with the provided symbol')
        $loadpage.hide();
      }
    }).fail(function(data){
      if ( data.responseCode) {console.log( data.responseCode )};
    })
  }
  
  function removeDB(id){
    $.ajax({
      url:'/delete/'+id
    }).done(function(data){
      socket.socket.emit('delete',id);
    }).fail(function(data){
      if ( data.responseCode) {console.log( data.responseCode )};
    })
  }
  
  return {
    getNew:getNew,
    removeFromDB:removeDB
  }
  
})()

module.exports=datahandler;