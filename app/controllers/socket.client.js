var socket;

$(function(){
  socket = io();

  socket.on('otheradded',function(dataobj){
    var plotSymbol = dataobj['rawdata']['dataset_code'];
    $.notify("Someone just added "+plotSymbol, 
             { position:"bottom left",
               style: 'bootstrap',
                className: 'info'
             }
            );

      var plotData = shapeData(dataobj['rawdata']);
      var name = dataobj['rawdata']['name'];
      drawChart(plotData,plotSymbol,name)
  })
  socket.on('otherdeleted',function(id){
    $.notify("Someone else just removed "+id, 
         { position:"bottom left",
           style: 'bootstrap',
            className: 'info'
         }
        );
    $('#'+id).parent('li').remove();
    chart.get(id).remove();
   
  })
})