var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var basedata = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,  
  categories: {type: Array},
  countries: {type: Array},
  currencies: {type: Array},
  languages: {type: Array},
}, {collection: 'basedata'});

module.exports = mongoose.model('basedata', basedata);