const orders=require('../../../models/order');
const jwt_decode=require("jwt-decode");
const moment=require('moment');


exports.getOrderNumber = function(req,res) {
  return new Promise((resolve, reject) => {
    orders.find({}).sort({_id: -1}).limit(1).lean().then((doc) => {
      resolve(parseFloat(doc[0].order_number) + 1);
    }).catch(function(err) {
      utils.logException(err,req,"insertOrder.getOrderNumber");
      reject(err);
    });
  });
};

exports.insertOrder = async (req, res) => {
  try {
    //const value = jwt_decode(req.headers.authorization);\
    var arrproducts = [];
    var products = {};
    products = {
      product_id: "610eee600b5fb14d5872bc10",
      name: "wwww",
      price: 50,
      discount: 10,
      quantity: 2,
      total: 90,
    };
    arrproducts.push(products);
    products = {
      product_id: "610eee600b5fb14d5872bc10",
      name: "eee",
      price: 100,
      discount: 5,
      quantity: 2,
      total: 190,
    };
    arrproducts.push(products); 
    let date = moment().unix().toString();
    var num = await this.getOrderNumber(req);
    var theorder = {
      order_number: num,
      user_id: "5f91cf971ddcbc215c31dc84",
      user_name: "Babar Khan",
      products: arrproducts,
      amount: 290,
      status: 0,
      creation_date: date,
    };    
    var que =  orders.collection.insertOne(theorder);
    if (que) {
      return 1;
    }
    else {
      return null;
    }
    // orders.find({}).sort({_id:-1}).limit(1).lean().then(function(doc) {
    //   var theorder = {
    //     order_number: parseFloat(doc[0].order_number) + 1,
    //     user_id: "5f91cf971ddcbc215c31dc84",
    //     user_name: "Babar Khan",
    //     products: arrproducts,
    //     status: 0,
    //     creation_date: date,
    //   };    
    //   var que =  orders.collection.insertOne(theorder);
    //   if (que) {
    //     return 1;
    //   }
    //   else {
    //     return null;
    //   }
    // }).catch(function(err) {
    //   utils.logException(err,req,"insertOrder.insertOrder.order_number");
    //   return null;
    // });  
  } 
  catch (err) {
    utils.logException(err,req,"insertOrder.insertOrder");
    return null;
  }
}

// exports.updateOrder = (req, res) => {
//   try {
//     //const value = jwt_decode(req.headers.authorization);
//     let date = moment().unix().toString();
//     req.body.updation_date = date;
//     req.body.updatedby = req.user.username; 
//     var theid = req.body.dataid;
//     delete req.body.dataid;
//     var que =  orders.findByIdAndUpdate({_id: theid},req.body, function(err, doc){
//       if(err){
//         return null;
//       }
//     });
//     if (que) {
//       return 1;
//     }
//     else {
//       return null;
//     }
//   } catch (err) {
//     console.log(err);
//     utils.logException(err,req,"insertOrder.updateOrder");
//     return null;
//   }
// }

//#region Apis
exports.insertApiOrder = async (req, res) => {
  try {
    let date = moment().unix().toString();
    req.body.creation_date = date;
    req.body.status = 0;
    var num = await this.getOrderNumber(req);
    req.body.order_number = num;
    await orders.collection.insertOne(req.body)
    res.json({
      success: true,
      data: "Inserted"
    })
  } catch (err) {
    utils.logException(err,req,"getAllProducts.getApiProducts");
    res.json({
      success: false,
      data: err
    })
  }
}
//#endregion Apis

// exports.getOrderNumber = function(req,res) {
//   return new Promise((resolve, reject) => {
//     orders.find({}).sort({_id: -1}).limit(1).lean().then((doc) => {
//       resolve(parseFloat(doc[0].order_number) + 1);
//     }).catch(function(err) {
//       utils.logException(err,req,"insertOrder.getOrderNumber");
//       reject(err);
//     });
//   });
// };

// let getOrderNumber = async () => {
//   let lastDoc = await orders.find({}).sort({_id: -1}).limit(1).lean();
//   console.log(lastDoc);
// };

//  function getOrderNumber () {
//   try {
//       let t =  orders.find({}).sort({_id: -1}).limit(1).lean();
//       console.log(t);
//   } catch (e) {
//       console.error(e)
//   }
// }

// exports.getOrderNumber = (req,res) => orders.find({}).sort({_id:-1}).limit(1).lean().then(function(doc) {
//   return doc.order_number;
// }).catch(function(err) {
//   utils.logException(err,req,"getAllOrders.getOrderNumber");
//   return null;
// });