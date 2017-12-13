var SearchHandler = require(process.cwd() + '/app/controllers/searchHandler.server.js');

module.exports = function(app,io){
  io.on('connection', function(socket) {
   console.log('A user connected');
    
   socket.on('data',function(dataobj){
     socket.broadcast.emit('otheradded',dataobj)
   })
    
   socket.on('delete',function(id){
     console.log(id)
     socket.broadcast.emit('otherdeleted',id)
   })
    
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
    
  });
  var searchHandler = new SearchHandler(io);
  
  app.get("/",function(req,res){
     res.sendFile(process.cwd() + '/public/index.html');
  })
  
  app.get("/db",searchHandler.getDBdata)
  
  app.get("/search/:symbol",searchHandler.getSearch)

  app.get("/delete/:symbol",searchHandler.deleteDBdata)
  
}