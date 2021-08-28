const products = require('../../../models/product');
var utils = require('../../../config/utils');
var endecode = require('../../../config/endecode');
var dateFormat = require("dateformat");
const configkeys = require("../../../config/default.json");
const moment=require('moment');

exports.getAllProducts = function(req,res) {
  return new Promise((resolve, reject) => {
    var input = {};
    if (req.query.usr !== undefined && req.query.usr !== "") {
      input = { owner_id: (endecode.decryptstr(req.query.usr))};
    }
    products.find(input).lean().then(function(doc) { //.sort({creation_date:-1})
        doc.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
          item.webid = endecode.encryptstr(item.user_id);
        }); 
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllProducts.getAllProducts");
        reject(err);
      });      
  });
};

// exports.getAllProducts = (req,res) => products.find({}).sort({_id:-1}).lean().then(function(doc) {
//   doc.forEach(item => { 
//     item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
//   }); 
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getAllProducts.getAllProducts");
//   return null;
// });

exports.getProducts = function(req,res) {
  return new Promise((resolve, reject) => {
    const options = {
      //page: parseInt(req.pg.page) || 1,
      page: 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    var input = {};
    if (req.query.usr !== undefined && req.query.usr !== "") {
      input = { user_id: (endecode.decryptstr(req.query.usr))};
    }
    //products.find({}).lean().then(function(doc) { //.sort({creation_date:-1})
    products.paginate(input, options, function (err, doc) {
        if(err){
          utils.logException(err,req,"getAllProducts.getProducts");
        }
        doc.docs.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
          item.webid = endecode.encryptstr(item.user_id);
        }); 
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllProducts.getProducts");
        reject(err);
      });      
  });
};

exports.getMoreProducts = async(req,res) => {
  try{
    let id= req.params.id;
    const options = {
      page: parseInt(id) || 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    var input = {};
    if (req.query.usr !== undefined && req.query.usr !== "") {
      input = { user_id: (endecode.decryptstr(req.query.usr))};
    }
    let response = await products.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllProducts.getMoreProducts");
            res.json({
                success:true,
                data:null
            })
        }
        else{
            doc.docs.forEach(item => { 
              item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
              item.webid = endecode.encryptstr(item.user_id);
            });  
            res.json({
                success:true,
                data:doc
            })
        }    
    })
    // const options = {
    //   page: parseInt(id) || 1,
    //   limit: configkeys.pagelimit,
    //   sort: { creation_date: -1 },
    // };
    // let response = await products.paginate({}, options).then(function (result) {
    //   res.json({
    //     success:true,
    //     data:result
    // })
    // });
  }catch(err){
      utils.logException(err,req,"getAllProducts.getMoreProducts");
      res.json({
          success:false,
          data:err
      })
  }
}

exports.getSearchProducts = async(req,res) => {
  try{
    var input = {};
    if (req.query.usr !== undefined && req.query.usr !== "") {
      input = { user_id: (endecode.decryptstr(req.query.usr))};
    } 
    if(req.body.startingDate!="" && req.body.endingDate!=""){
      var ts1 = moment(req.body.startingDate, "YYYY/MM/DD").unix();
      var ts2 = moment(req.body.endingDate, "YYYY/MM/DD").unix();
      input = { creation_date: {$gt : ts1, $lt : ts2} };
    }   
    if(req.body.status!=""){
      input['status'] = req.body.status;
    }
    let id= req.params.id;
    const options = {
      page: parseInt(id) || 1,
      limit: configkeys.pagelimit,
      sort: { _id: -1 },
    };
    let response = await products.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllProducts.getSearchProducts");
            res.json({
                success:true,
                data:null
            })
        }
        else{
            doc.docs.forEach(item => { 
              item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
              item.webid = endecode.encryptstr(item.user_id);
            });  
            res.json({
                success:true,
                data:doc
            })
        }    
    })
  }catch(err){
      utils.logException(err,req,"getAllProducts.getSearchProducts");
      res.json({
          success:false,
          data:err
      })
  }
}

// exports.getAllProducts = (req,res) => products.find({}).sort({creation_date:-1}).lean().then(function(doc) {
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getAllProducts.getAllProducts");
//   return null;
// });

exports.getProductById = (req,res) => products.findOne({_id: req.query.id}).lean().then(function(doc) {
  doc.creation_date = dateFormat(new Date(doc.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  doc.webid = endecode.encryptstr(doc.user_id);
  if(doc.updation_date!="" && doc.updation_date!=null){
    doc.updation_date = dateFormat(new Date(doc.updation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  }
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAllProducts.getProductById");
  return null;
});

exports.getProductsCount = products.countDocuments(function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getAllProducts.getProductsCount");
  return null;
});

//#region Apis
exports.getApiAllProducts=async(req,res)=>{
  try{  
    let newobj=await products.find({}).sort({creation_date:-1});
    res.json({
        success:true,
        data:newobj
    })
  }catch(err){
    utils.logException(err,req,"getAllProducts.getApiAllProducts");
    res.json({
        success:false,
        data:err
    })
  }
}
exports.getApiProductsByCategory=async(req,res)=>{
  try{
    let id=req.params.id 
    let newobj=await products.find({category:{ $regex : new RegExp(id, "i") }})
    res.json({
        success:true,
        data:newobj
    })
  }catch(error){
    utils.logException(err,req,"getAllProducts.getApiProducts");
    res.json({
        success:false,
        data:error
    })
  }
}
exports.getApiProducts=async(req,res)=>{
  try{
    let id=req.params.id 
    let newobj=await products.find({_id:id})
    res.json({
        success:true,
        data:newobj
    })
  }catch(error){
    utils.logException(err,req,"getAllProducts.getApiProducts");
    res.json({
        success:false,
        data:error
    })
  }
}
exports.getApiSrhProducts=async(req,res)=>{
  try{
    var input = {};
    if(req.body.name!="" && req.body.name!=null){
      input['name'] = req.body.name;
    }
    if(req.body.category!="" && req.body.category!=null){
      input['category'] = req.body.category;
    }
    if(req.body.price!="" && req.body.price!=null){
      input['price'] = req.body.price;
    }
    if(req.body.discount!="" && req.body.discount!=null){
      input['discount'] = req.body.discount;
    }
    let newobj=await products.find(input).sort({creation_date:-1});
    res.json({
        success:true,
        data:newobj
    })
  }catch(err){
    utils.logException(err,req,"getAllProducts.getApiSrhProducts");
    res.json({
        success:false,
        data:err
    })
  }
}
//#endregion Apis

// exports.getMoreProducts=async(req,res)=>{
//   try{    
//     let newobj=await products.find({}).sort({creation_date:-1});
//     res.json({
//         success:true,
//         data:newobj
//     })
//   }catch(err){
//     res.json({
//         success:false,
//         data:err
//     })
//   }
//   // try{
//   //     let id= req.params.id;
//   //     let resnewobjponse = await products.find({}).sort({creation_date:-1})(function (err){

//   //         if(err){
//   //             res.json({
//   //                 success:true,
//   //                 data:err
//   //             })
//   //         }
//   //         else{
//   //             res.json({
//   //                 success:true,
//   //                 data:newobj
//   //             })
//   //         }    
//   //     })

//   // }catch(err){
//   //     utils.logException(err,req,"updProduct.updPrdDel");
//   //     res.json({
//   //         success:false,
//   //         data:err
//   //     })
//   // }
// }
