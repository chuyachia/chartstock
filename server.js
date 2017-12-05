const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      routes = require(process.cwd()+'/app/routes/index.js'),
      http = require('http').Server(app),
      io = require('socket.io')(http);


app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));




mongoose.connect('mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB,
                { useMongoClient: true});

var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('connected to db')
});

routes(app,io);



var listener = http.listen('3000', function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
