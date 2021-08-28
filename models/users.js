var mongoose = require('mongoose');
//mongoose.connect('localhost:27017/test');
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});


var Schema = mongoose.Schema;

var users = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  username: {type: String, required: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  email: {type: String, unique: true},
  phone: {type: String, unique: true},
  status: {type: Number, required: true},  
  created: {type: Date},
  updated: {type: Date},
  createdby: {type: String},  
  updatedby: {type: String},
  type: {type: Number},
  admtype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
    required: true
  }
}, {collection: 'adm_user'});

module.exports = mongoose.model('users', users);