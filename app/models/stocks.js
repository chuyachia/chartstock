'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({symbol:String,dataset:{},added:Date})
module.exports = mongoose.model('Stock',Stock)