var stock = (function(){
  // initialization
  var stocks = [];
  datahandler.getFromDB(chart.draw,addToList);
  $('body').tooltip({selector: '.createdLi'});
  
  // cache dom
  var $el = $('#symbolContainer');
  var template = $el.find('#stock-template').html();
  var $input = $el.find('input');
  var $ul = $el.find('#searchlist')
  var $existingsyms = $ul.find("span");
  
  // bind events
  $('form').on('submit',searchStock);
  $ul.delegate('span.remove', 'click', deleteStock);
  
  
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
    //remove from chart
    chart.remove(id);
    // remove from list
    $(this).parent('li').remove();
    // remove from DB
    datahandler.removeFromDB(id)

  };
  
  function addToList(symbol,name,color){
    var colorstyle = "border-left-color:"+color;
    $ul.append(Mustache.render(template,{color:colorstyle, name:name, symbol:symbol}));
  }
  
  return {addToList:addToList}
  
})()
