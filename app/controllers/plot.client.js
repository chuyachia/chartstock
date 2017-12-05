'use strict'
var chart;

var shapeData = function(resobj){
  var retdata = [];
  for (var i = 0;i<resobj.data.length;i++){
    retdata.push([new Date(resobj.data[i][0]),resobj.data[i][8],resobj.data[i][9],resobj.data[i][10],resobj.data[i][11]])
  }
  return retdata
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var drawChart = function(data,symbol,name){
  var color = getRandomColor()
  if (!chart) {
      chart = new Highcharts.StockChart({
         chart: {
             renderTo: 'chartContainer',
             type: 'candlestick',
             margin: [20, 20,20, 20],
             zoomType:'xy'
         },
         plotOptions: {
                series: {
                    dataGrouping: {
                      approximation: 'ohlc',
                      forced:true
                    }
                }
        },
        title: {
          text: 'Chart the Stock Market'
        },
         rangeSelector: {
            selected: 4
        },
         scrollbar: {
             enabled: true
         },
         navigator: {
             enabled: false
         },
         series: [{
             id:symbol,
             name:symbol,
             type: 'candlestick',
             color: color,
             data: data,
         }]
     });
  } else {
    chart.addSeries({
      id:symbol,
      name:symbol,
      type: 'candlestick',
      color: color,
      data: data,
    });
  }
 addSymbol(symbol,color,name);
}

var addSymbol = function(symbol,color,name){
  $('<span>').attr({
    class:'glyphicon glyphicon-remove remove',
    id:symbol
  })
  .appendTo($("<li>").css('border-left-color',color).
            append('<span class="createdLi" data-toggle="tooltip" data-placement="bottom" title="'+name+'">'+symbol+'</span>')
  .appendTo('#searchlist')); 
}



