'use strict'
// check if db data is up to date before returning to users

var getNew = function(symbol,callback,emit,n) {
  $(".overlay").show();
   $.ajax({
    url:'/search/'+symbol
  }).done(function(data){
    if (data['dataset']) {
      // emit to server
      if (emit) {
        socket.emit('data',{rawdata:data['dataset']});
      }
      var plotData = shapeData(data['dataset']);
      var plotSymbol = data['dataset']['dataset_code'];
      var name = data['dataset']['name'];
      callback(plotData,plotSymbol,name);
      if (n>1){
        if($( "li" ).length==n){
          $(".overlay").hide(); 
        }
      } else {
        $(".overlay").hide(); 
      }
    }  else {
      alert('No stock found with the provided symbol')
      $(".overlay").hide();
    }
  }).fail(function(data){
    if ( data.responseCode) {console.log( data.responseCode )};
  })
}

var getFromDB = function(callback) {
   $.ajax({
    url:'/db'
  }).done(function(data){
     var toupdate = []
     data.forEach(function(stock){
       if (stock['dataset']['data'].length>0) {
         var plotData = shapeData(stock['dataset']);
         var plotSymbol = stock['dataset']['dataset_code'];
         var name = stock['dataset']['name'];
         callback(plotData,plotSymbol,name);
       } else {
         toupdate.push(stock['dataset']['dataset_code'])
       }
     })
     
     if (toupdate.length>0) {
       toupdate.forEach(function(symbol){
         console.log('getnew')
         getNew(symbol,drawChart,false,toupdate.length)
       })
     } else {   
       $(".overlay").hide(); 
     }
  }).fail(function(data){
    if ( data.responseCode) {console.log( data.responseCode )};
  })
}


