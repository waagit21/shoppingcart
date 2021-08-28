var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

var products = new Schema({
    name: String,
    category: String,
    price: Number,
    discount: Number,
    currency: String,
    overview: String,
    detail: String,
    quantity: Number,
    images: Array,
    status: Number,  
    user_id: String,
    user_name: String,
    creation_date: String,
    createdby: String,
    updation_date: String,
    updatedby: String,
    webid: String //For admin only
}, {collection: 'product'});
products.plugin(mongoosePaginate);
module.exports = mongoose.model('product', products);