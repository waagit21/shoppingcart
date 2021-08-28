var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var basedata = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,  
  course_category: {type: Array},
}, {collection: 'basedata'});

module.exports = mongoose.model('basedata', basedata);