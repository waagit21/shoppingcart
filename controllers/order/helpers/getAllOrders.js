const orders = require('../../../models/order');
var utils = require('../../../config/utils');
var endecode = require('../../../config/endecode');
var dateFormat = require("dateformat");
const configkeys = require("../../../config/default.json");
const moment=require('moment');

exports.getAllOrders = function(req,res) {
  return new Promise((resolve, reject) => {
    var input = {};
    if (req.query.usr !== undefined && req.query.usr !== "") {
      input = { user_id: (endecode.decryptstr(req.query.usr))};
    }
    orders.find(input).lean().then(function(doc) { //.sort({creation_date:-1})
        doc.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
          item.webid = endecode.encryptstr(item.user_id);
        }); 
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllOrders.getAllOrders");
        reject(err);
      });      
  });
};

exports.getOrders = function(req,res) {
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
    //orders.find({}).lean().then(function(doc) { //.sort({creation_date:-1})
    orders.paginate(input, options, function (err, doc) {
        if(err){
          utils.logException(err,req,"getAllOrders.getOrders");
        }
        doc.docs.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
          item.webid = endecode.encryptstr(item.user_id);
        });        
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getAllOrders.getOrders");
        reject(err);
      });      
  });
};

exports.getMoreOrders = async(req,res) => {
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
    let response = await orders.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllOrders.getMoreOrders");
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
    // let response = await orders.paginate({}, options).then(function (result) {
    //   res.json({
    //     success:true,
    //     data:result
    // })
    // });
  }catch(err){
      utils.logException(err,req,"getAllOrders.getMoreOrders");
      res.json({
          success:false,
          data:err
      })
  }
}

exports.getSearchOrders = async(req,res) => {
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
    let response = await orders.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getAllOrders.getSearchOrders");
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
      utils.logException(err,req,"getAllOrders.getSearchOrders");
      res.json({
          success:false,
          data:err
      })
  }
}

// exports.getAllOrders = (req,res) => orders.find({}).sort({creation_date:-1}).lean().then(function(doc) {
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getAllOrders.getAllOrders");
//   return null;
// });

exports.getOrderById = (req,res) => orders.findOne({_id: req.query.id}).lean().then(function(doc) {
  doc.creation_date = dateFormat(new Date(doc.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  doc.webid = endecode.encryptstr(doc.user_id);
  if(doc.updation_date!="" && doc.updation_date!=null){
    doc.updation_date = dateFormat(new Date(doc.updation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
  }
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAllOrders.getOrderById");
  return null;
});

exports.getOrdersCount = orders.countDocuments(function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getAllOrders.getOrdersCount");
  return null;
});

exports.getOrderNumber = (req,res) => orders.find({}).sort({_id:-1}).limit(1).lean().then(function(doc) {
  return doc.order_number;
}).catch(function(err) {
  utils.logException(err,req,"getAllOrders.getOrderNumber");
  return null;
});


// exports.getMoreOrders=async(req,res)=>{
//   try{    
//     let newobj=await orders.find({}).sort({creation_date:-1});
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
//   //     let resnewobjponse = await orders.find({}).sort({creation_date:-1})(function (err){

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
//   //     utils.logException(err,req,"updOrder.updPrdDel");
//   //     res.json({
//   //         success:false,
//   //         data:err
//   //     })
//   // }
// }
