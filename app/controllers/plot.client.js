'use strict'

var chart = (function(){
  var chart;
  var stocks = [];

  function shapeData(resobj){
    var retdata = [];
    for (var i = 0;i<resobj.data.length;i++){
      retdata.push([new Date(resobj.data[i][0]),resobj.data[i][8],resobj.data[i][9],resobj.data[i][10],resobj.data[i][11]])
    }
    return retdata
  }
  
  function returnstocklist(){
    return stocks;
  }

  function draw(data,symbol,name,color){
     stocks.push(symbol);
     var data = shapeData(data)
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
        tooltip:{
          valueDecimals:2
        },
        subtitle: {
        text: '* Prices are adjusted for dividends, splits and other events',
        align: 'right',
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
    };
  
  function remove(id){
    stocks.pop(stocks.indexOf(id));
    chart.get(id).remove();
  }
    
    return {
      draw:draw,
      stockList:returnstocklist,
      remove:remove
    };  
})()


