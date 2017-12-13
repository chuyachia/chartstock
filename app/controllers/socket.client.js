var socket = (function(){
  var socket = io();
  socket.on('otheradded',function(dataobj){
    var color = datahandler.getColor();
    var name = dataobj['rawdata']['name'];
    var symbol = dataobj['rawdata']['dataset_code'];
    $.notify("Someone just added "+symbol, 
             { position:"bottom left",
               style: 'bootstrap',
                className: 'info'
             }
          );
      chart.draw(dataobj['rawdata'],symbol,name,color)
      stock.addToList(symbol,name,color)
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
