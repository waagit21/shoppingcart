var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var user = new Schema({
  //_id: mongoose.Schema.Types.ObjectId,  
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true},
  phone: {type: String, required: true},
  address: {type: String, required: true},  
  city: {type: String, required: true},
  state: {type: String, required: true},
  country: {type: String, required: true},
  zipcode: {type: String, required: true},
  status: {type: Number, required: true},  
  creation_date: {type: String},
  webid: {type: String},
}, {collection: 'users'});
user.plugin(mongoosePaginate);
module.exports = mongoose.model('user', user);