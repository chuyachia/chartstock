'use strict'

var datahandler = (function(){
  //cache DOM
  var $loadpage = $(".overlay");
  // helper function
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  function callAPI(symbol,chart,list,emit,n) {
    $loadpage.show();
     $.ajax({
      url:'/search/'+symbol
    }).done(function(data){
      if (data['dataset']) {
        // emit to server
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
  
  function searchDB(chart,list) {
    $loadpage.show();
     $.ajax({
      url:'/db'
    }).done(function(data){
       var toupdate = []
       data.forEach(function(stock){
         if (stock['dataset']['data'].length>0) {
           var plotData = stock['dataset'];
           var plotSymbol = stock['dataset']['dataset_code'];
           var name = stock['dataset']['name'];
           var color = getRandomColor();
           chart(plotData,plotSymbol,name,color);
           list(plotSymbol,name,color);

         } else {
           toupdate.push(stock['dataset']['dataset_code'])
         }
       })

       if (toupdate.length>0) {
         toupdate.forEach(function(symbol){
           console.log('getnew')
           callAPI(symbol,chart.draw,false,toupdate.length)
         })
       } else {   
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
    getNew:callAPI,
    getFromDB:searchDB,
    removeFromDB:removeDB,
    getColor: getRandomColor
  }
  
})()
