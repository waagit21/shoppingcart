const bcrypt = require('bcrypt');
const users=require('../../../models/users');
const roles=require('../../../models/roles');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');
var dateFormat = require("dateformat");
//var functions = require('../../../config/functions');
//const roles=require('../../../models/roles');
//const functions=require('../../../config/functions');

exports.getAdmUsers = (req,res) => users.aggregate([    
  {
    $lookup: {
        from: "adm_type", // collection to join
        localField: "admtype",//field from the input documents
        foreignField: "_id",//field from the documents of the "from" collection
        as: "roles"// output array field
    }},{ $match : { type : { $gt: req.user.type } } }
  //,
  // {
  //   $project: { // add all the fields you need from the collection, if you need to omit something from the query results, just don't mention it here
  //       username: "$username",
  //       name: "$name",
  //       email: "$email",
  //       phone: "$phone",
  //       status: "$status",
  //       roles: "$roles",
  //       //dt: "$created".toString(),
  //       created: { $dateToString: { format: "%d/%m/%Y %H:%M", date: "$created", timezone: "+05:00" } } //Asia/Karachi this will return the date in the format "dd/MM/yyyy"
  // }}  
]).exec()
.then(function(doc) {
  doc.forEach(item => { 
    item.created = dateFormat(item.created, "dd mmm, yyyy hh:MM:ss TT");
    item.admid = endecode.encryptstr(item._id);
    //item.created = functions.formatDateTime(item.created);
    //item.roles[0].rlid = endecode.encryptstr(item.roles[0]._id);
  }); 
  // // for (var i = 0; i < doc.length; i++) {
  // //   doc[i].admid = endecode.encryptstr(doc[i]._id);
  // // }
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAdmUsers.getAdmUsers");
  return null;
});
// .then(results => results.forEach(result => getStatus(result.name) ))
// .then(results => ({ results }))
// .catch(err => ({ err })); 

exports.getAdmOnlyUser = (req,res) => users.findOne({_id: endecode.decryptstr(req.usrid)}).lean().then(function(doc) {
  doc.admid = req.usrid;
  doc.enctype = endecode.encryptstr(doc.admtype);
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAdmUsers.getAdmOnlyUser");
  return null;
});

// exports.getAdmOnlyUserId = (req,res) => users.findOne({_id: req.query.usr}).lean().then(function(doc) {
//   doc.admid = endecode.encryptstr(req.query.usr);
//   doc.enctype = endecode.encryptstr(doc.admtype);
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getAdmUsers.getAdmOnlyUserId");
//   return null;
// });

exports.getAdmByUsername = (req,res) => users.findOne({username: req}).lean().then(function(doc) {
  return endecode.encryptstr(doc._id);
}).catch(function(err) {
  utils.logException(err,req,"getAdmUsers.getAdmByUsername");
  return err;
});


exports.getAdmCount = (req,res) => users.countDocuments({type : { $gt: req.user.type } }, function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getAdmUsers.getAdmCount");
  return null;
});

// exports.getAdmCount = users.countDocuments(function(err, count){
//   return count;
// }).catch(function(err) {
//   utils.logException(err,req,"getAdmUsers.getAdmCount");
//   return null;
// });

var _this = this;
exports.getUserOnlyRole = (req,res) => roles.findOne({_id: endecode.decryptstr(req.body.admtype)}).lean().then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getAdmUsers.getUserOnlyRole");
  return null;
});

exports.insAdmUser = function(req,res) {      
  return new Promise(async(resolve, reject) =>  {

    // try {
    //   req.role = await _this.getUserOnlyRole(req,res);        
    // }
    // catch (err) {
    //   utils.logException(err,req,"insAdmUser.getUserOnlyRole");  
    // }
    req.role = await _this.getUserOnlyRole(req,res); 

    let newUser = new users({
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      admtype: endecode.decryptstr(req.body.admtype),
      type: req.role.type,
      created: req.body.created,
      createdby: req.body.createdby,      
      createdby: req.user.username,
      created: new Date()
    });
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          utils.logException(err,req,"getAdmUsers.insAdmUser.bcrypt");
          resolve(null);
        }
        newUser.password = hash;
        newUser.save(function(err, doc){
          if(err){
            utils.logException(err,req,"getAdmUsers.insAdmUser.save");
            resolve(null);
          } 
          else {
            resolve(doc._id);
          }
        });
        // newUser.save().then(function(doc) {
        //   if(err){
        //     return "";
        //   } 
        //   else {
        //     console.log(doc);
        //     console.log(doc._id);
        //     return doc;
        //   }
        // });        
      });
    });
  });
};

exports.updAdmUser = function(req,res) {
  return new Promise(async(resolve, reject) => {
    req.role = await _this.getUserOnlyRole(req,res); 
    if(req.body.password==""){
      let newUser = {
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        admtype: endecode.decryptstr(req.body.admtype),
        type: req.role.type,
        updatedby: req.user.username,
        updated: new Date()
      };
      users.findByIdAndUpdate({_id: endecode.decryptstr(req.body.dataid)},newUser,function(err, doc){
        if(err){
          utils.logException(err,req,"getAdmUsers.updAdmUser.update");
          reject(err);
        } 
        else {
          resolve(doc._id);
        }
      });
    }
    else{
      let newUser = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        admtype: endecode.decryptstr(req.body.admtype),
        type: req.role.type,
        updatedby: req.user.username,
        updated: new Date()
      };
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
          if(err){
            utils.logException(err,req,"getAdmUsers.updAdmUser.bcrypt");
            reject(err);
          }
          newUser.password = hash;
          users.findByIdAndUpdate({_id: endecode.decryptstr(req.body.dataid)},newUser,function(err, doc){
            if(err){
              utils.logException(err,req,"getAdmUsers.updAdmUser.update-password");
              reject(err);
            } 
            else {
              resolve(doc._id);
            }
          });        
        });
      });
    }
  });
};

//  function getRole(req,res) {  roles.findOne({_id: endecode.decryptstr(req.body.admtype)}).lean().then(function(doc) {
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getUserRoles.getUserOnlyRole");
//   return null;
// });
//  }

// exports.updAdmUser = (req,res) => (async function(result){
//   let newUser = new users({
//     _id: req.body._id,
//     username: req.body.username,
//     password: req.body.password,
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     status: req.body.status,
//     created: req.body.created,
//     createdby: req.body.createdby,
//     admtype: req.body.admtype,
//   });
//   await bcrypt.genSalt(10, function(err, salt){
//     bcrypt.hash(newUser.password, salt, function(err, hash){
//       if(err){
//         return ""
//       }
//       newUser.password = hash;
//       newUser.save(function(err, result){
//         if(err){
//           return "";
//         } 
//         else {
//           return result._id;
//         }
//       });
//     });
//   });
// });

// exports.insAdmUser = (req,res) => users.create(req.body).then(function(doc) {
//   return doc._id;
// }).catch(function(err) {
//   return err;
// });

// exports.updAdmUser = (req,res) => users.updateOne({_id: req.body.dataid},req.body).then(function(doc) { 
//   return doc.nModified;
// }).catch(function(err) {
//   return err;
// });

// exports.getAdmUsers = users.aggregate([ {
//   $lookup: {
//       from: "adm_type", // collection to join
//       localField: "type_id",//field from the input documents
//       foreignField: "_id",//field from the documents of the "from" collection
//       as: "roles"// output array field
//   },
// }]).exec()
// .then(results => ({ results }))
// //.then(results => console.log(({ results })))
// .catch(err => ({ err }));

// exports.getAdmUsers = users.aggregate(
//   [
//     // {
//     //   $project: {
//     //      yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$created" } },
//     //   }
//     // },
//     {
//       $lookup: {
//           from: "adm_type", // collection to join
//           let: { "id": "$type_id" },
//           //localField: "type_id",//field from the input documents
//           //foreignField: "_id",//field from the documents of the "from" collection
          
//           pipeline: [
//             { $match: { $expr: { $eq: ["$_id", "$$id"] }}},
//             { $project: { yearMonthDayUTC: { $dateToString: { format: "%Y-%m-%d", date: "$created" } }}}
//           ],
//           as: "roles",// output array field
//       }
//     }
//   ]
// ).exec()
// .then(results => ({ results }))
// //.then(results => console.log(({ results })))
// .catch(err => ({ err }));

// exports.getAdmUsers = users.find({}).populate('roles')
// .exec(function (error, result) {
//     console.log(result);
//     console.log(error);
// });

// exports.getAdmUsers = users.find().then(function(doc) {
//   return doc;
// }).catch(err => {
//   console.log("err");
//   if (err) {
//       console.log(err);
//   } 
// });

  // {
  //   $addFields:
  //   {
  //     message:
  //       { $function:
  //           {
  //             body:  'function(name) { return getStatus()',
  //             args: [ "$name" ],
  //             lang: "js"
  //           }
  //       }
  //    }
  // }, 


// exports.getAdmOnlyUserView = (req,res) => users.aggregate(
// [ { $match : { id : "5fd5255fd240b71aa421ca4e" } }, //{ $match : { "_id": { "$in": mongoose.Types.ObjectId("5fd5255fd240b71aa421ca4e") }  } },
//   { $lookup: { 
//     from: "adm_type", // collection to join
//         localField: "type_id",//field from the input documents
//         foreignField: "_id",//field from the documents of the "from" collection
//         as: "roles"// output array field
//    } },
//    {
//     $project: { // add all the fields you need from the collection, if you need to omit something from the query results, just don't mention it here
//         username: "$username",
//         name: "$name",
//         email: "$email",
//         phone: "$phone",
//         status: "$status",
//         roles: "$roles",
//         created: { $dateToString: { format: "%d/%m/%Y %H:%M", date: "$created", timezone: "+05:00" } } //Asia/Karachi this will return the date in the format "dd/MM/yyyy"
//   }}
//   ]
// ).then(results => console.log(({ results })))
// //.then(results => console.log(({ results })))
// .catch(err => ({ err }));

// exports.getAdmOnlyUser = (req,res) => users.findOne({_id: req.query.id}).then(function(doc) {
//   var created = functions.formatDateTime(doc.created);
//   return doc;
// }).catch(function(err) {
//   return err;
// });

// exports.insAdmUser = (req,res) =>  users.create(req.body, function (err, data) {
//   console.log("body");
//   console.log(req.body);
//   if(err) {
//       console.log('Error occurred while inserting');
//       console.log(err);
//       return 0;
//   } else {
//      console.log('inserted record', data);
//      console.log(data._id);
//      return data._id; 
//   }
// });

// exports.insAdmUser = (req,res) => users.create(req.body, function (err, small) {
//       if(err) {
//           console.log('Error occurred while inserting');
//           console.log(err)
//           return err;
//       } else {
//          console.log('inserted record', response.ops[0]);
//          console.log(response.ops[0]);
//         // return 
//       }
// });

// exports.insAdmUser = (req,res) => users.collection.insertOne(req.body, function (error, response) {
//   if(error) {
//       console.log('Error occurred while inserting');
//       console.log(error);
//       return error;
//   } else {
//      console.log('inserted record', response.ops[0]);
//      console.log(response.ops[0]);
//     // return 
//   }
// });

// exports.getAdmOnlyUser = users.findOne({_id:"5fcd16d03b23b53c78d4ce39"})
// .then(results => ({ results }))
// .catch(err => ({ err }));
  
// exports.getAdmUser = (req,res) => users.findOne({_id:"5fcd16d03b23b53c78d4ce39"})
// .then(results => ({ results }))
// .catch(err => ({ err }));



// exports.getAdmOnlyUser = users.find().then(function(doc) {
//   console.log("doc");
//   console.log(doc);
//   return doc;
// }); 

// exports.getAdmUsers = users.aggregate([ {
//   $lookup: {
//       from: "adm_type", // collection to join
//       localField: "type_id",//field from the input documents
//       foreignField: "_id",//field from the documents of the "from" collection
//       as: "roles"// output array field
//   }
// }]).exec()
// .then(function(doc) {
//   console.log(doc);
//   return doc;
// });

// exports.getAdmUsers = users.aggregate([ {
//   $lookup: {
//       from: "adm_type", // collection to join
//       localField: "type_id",//field from the input documents
//       foreignField: "_id",//field from the documents of the "from" collection
//       as: "roles"// output array field
//   }
// }],function (error, data) {
//   console.log(data);
//   console.log(data[0].name);
//   console.log(data[0].roles);
//   return data;
//   if(error){
//     console.log(error);
//   }
// });

// exports.getUserRoles = roles.find().then(function(doc) {
//   return doc;
// });


// exports.getAdmUsers = users.find().then(function(doc) {
//   return doc;
// }).catch(err => {
//   console.log("err");
//   if (err) {
//       console.log(err);
//   } 
// });
//var prsdata = JSON.parse(JSON.stringify(result));