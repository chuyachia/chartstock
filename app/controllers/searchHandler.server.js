'use strict'

const https = require('https'),
      querystring = require('querystring'),
      Stocks = require(process.cwd()+'/app/models/stocks.js');


function searchHandler(io){  
 
  this.getDBdata = function(req,res){   
    Stocks.find().exec(function(err,result){
      result.forEach(function(stock){
        var today = new Date().toISOString().split('T')[0]
        if (stock['added'].toISOString().split('T')[0]!= today){
          stock['dataset']['data'] = []
        }
      })
      res.send(result)
    })
  }
  
  this.deleteDBdata = function(req,res){
    //io.sockets.emit('delete',req.params.symbol);
    Stocks.find({symbol:req.params.symbol}).remove().exec(function(err,result){
      if (err) {return err;}
      console.log('Deleted from DB')
      res.send('deleted')
    })
  }
  
  this.getSearch = function(req,res){
    var getParams = querystring.stringify({
        api_key:process.env.SECRET,
        start_date:"2006-01-01",
        order:'asc'
    }) 
    var options = {
        host:"www.quandl.com",
        path:"/api/v3/datasets/WIKI/"+req.params.symbol+".json?"+getParams,
        method:"GET",
    }
    var apireq = https.request(options,function(apires){
      console.log('Status: ' + apires.statusCode);
      var responseString = '';
      apires.on('data',function(data){
        responseString+= data;
      })
      apires.on('end',function(){
        var responseObject = JSON.parse(responseString);
        // save to DB or update existing //////     
        if (responseObject['dataset']){
          var query = {symbol:responseObject['dataset']['dataset_code']};
          var newData = {}
          newData.symbol = responseObject['dataset']['dataset_code'];
          newData.dataset = responseObject['dataset'];
          newData.added = new Date()
          Stocks.findOneAndUpdate(query, newData, {upsert:true}, function(err, doc){
              if (err) return err;
              return console.log("succesfully saved");
          });                    
        }
        //io.sockets.emit('newdata',responseObject);
        res.send(responseObject);        
      })
    })
    apireq.write(getParams);
    apireq.end();   
  }
}

module.exports = searchHandler;