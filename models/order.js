var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var order = new Schema({
    order_number: {type: Number, unique: true},    
    user_id: String,
    user_name: String,
    products: Array,
    amount: Number,
    currency: String,
    status: Number,
    creation_date: String,
    webid: String //For admin only
}, {collection: 'order'});
order.plugin(mongoosePaginate);
module.exports = mongoose.model('order', order);