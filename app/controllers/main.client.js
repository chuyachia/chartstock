$(function() {
  $(".overlay").show();
  getFromDB(drawChart)  
  $('form').on('submit',function(e){
    e.preventDefault();
    var input = $('#symbol').val().toUpperCase();
    $('#symbol').val('');
    var IDs = [];
    $("ul").find("span").each(function(){ IDs.push(this.id); });
    if(IDs.indexOf(input)==-1){
      $(".overlay").show();
      getNew(input,drawChart,true,1)
    } else {
      alert('Stock already added')
    }
  })  
});

$(document).on("click", ".remove", function(){
   var id = this.id;
   chart.get(this.id).remove();
   $.ajax({
      url:'/delete/'+id
    }).done(function(data){
      // emit to server
       socket.emit('delete',id);
    }).fail(function(data){
      if ( data.responseCode) {console.log( data.responseCode )};
    })
   $(this).parent('li').remove();
});

$('body').tooltip({
    selector: '.createdLi'
});