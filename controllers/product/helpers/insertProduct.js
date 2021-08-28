const products=require('../../../models/product');
const jwt_decode=require("jwt-decode");
const moment=require('moment');


exports.insertProduct =  (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);
    let date = moment().unix().toString();
    req.body.creation_date = date;
    req.body.createdby = req.user.username; 
    req.body.user_id = req.user.id;
    req.body.price = parseFloat(req.body.price);
    req.body.discount = parseFloat(req.body.discount);
    req.body.quantity = parseInt(req.body.quantity);
    req.body.status = parseInt(req.body.status);
    delete req.body.dataid;
    var que =  products.collection.insertOne(req.body);
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } 
  catch (err) {
    console.log(err);
    utils.logException(err,req,"insertProduct.insertProduct");
    return null;
  }
}

exports.updateProduct = (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);
    let date = moment().unix().toString();
    req.body.updation_date = date;
    req.body.updatedby = req.user.username; 
    req.body.price = parseFloat(req.body.price);
    req.body.discount = parseFloat(req.body.discount);
    req.body.quantity = parseInt(req.body.quantity);    
    req.body.status = parseInt(req.body.status);
    var theid = req.body.dataid;
    delete req.body.dataid;
    var que =  products.findByIdAndUpdate({_id: theid},req.body, function(err, doc){
      if(err){
        return null;
      }
    });
    if (que) {
      return 1;
    }
    else {
      return null;
    }
  } catch (err) {
    console.log(err);
    utils.logException(err,req,"insertProduct.updateProduct");
    return null;
  }
}