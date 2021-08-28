var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/test');
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


var Schema = mongoose.Schema;

var roles = new Schema({
  //_id:mongoose.Schema.Types.ObjectId,
  type: Number,
  name: String,
  roles: String,
  color: String,
}, {collection: 'adm_type'});

module.exports = mongoose.model('roles', roles);