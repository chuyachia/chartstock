'use strict'

var getRandomColor = require('../common/getRandomColor.js');
var datahandler = require('./data.client.js');
var chart = require('./plot.client.js');
var input = require('./input.client.js');

$(document).ready(function () { 
    // cache dom
    var $loadpage = $(".overlay");
    var $el = $('#symbolContainer');
    var $ul = $el.find('#searchlist')
    
    function searchDB(draw,list) {
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
             // chart and add to list
             draw(plotData,plotSymbol,name,color);
             list(plotSymbol,name,color);

           } else {
             toupdate.push(stock['dataset']['dataset_code'])
           }
         })

         if (toupdate.length>0) {
           toupdate.forEach(function(symbol){
             datahandler.getNew(symbol,chart.draw,input.addToList,false,toupdate.length);
           })
         } else {   
           $loadpage.hide(); 
         }
      }).fail(function(data){
        if ( data.responseCode) {console.log( data.responseCode )};
      })
    }
  
    // bind events
    $('form').on('submit',input.searchStock);
    $ul.delegate('span.remove', 'click', input.deleteStock);
   
    searchDB(chart.draw,input.addToList);
    $('body').tooltip({selector: '.createdLi'});
})