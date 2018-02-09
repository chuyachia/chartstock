'use strict';

var chart = require('./plot.client.js');
var datahandler = require('./data.client.js');
var Mustache = require('mustache');

var input = (function(){
    var $el = $('#symbolContainer');
    var template = $el.find('#stock-template').html();
    var $input = $el.find('input');
    var $ul = $el.find('#searchlist')

  
  function searchStock(e){
    e.preventDefault();
    
    var newsym = $input.val().toUpperCase();
    $input.val('');
    var stocklist = chart.stockList();
    if(stocklist.indexOf(newsym)==-1){
      datahandler.getNew(newsym,chart.draw,addToList,true,1)     
    } else {
      alert('Stock already added')
    }
  };
  
  function deleteStock(){
    var id = this.id;
    chart.remove(id);
    $(this).parent('li').remove();
    datahandler.removeFromDB(id)

  };
  
  function addToList(symbol,name,color){
    var colorstyle = "border-left-color:"+color;
    $ul.append(Mustache.render(template,{color:colorstyle, name:name, symbol:symbol}));
  }
  
  return {
    addToList:addToList,
    searchStock:searchStock,
    deleteStock:deleteStock
  }
  
})()

module.exports = input;