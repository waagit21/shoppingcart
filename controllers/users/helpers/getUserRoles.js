const roles=require('../../../models/roles');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');
//var functions = require('../../../config/functions');


exports.getUserRoles = roles.find().lean().then(function(doc) {
  doc.forEach(element => { 
    element.rlid = endecode.encryptstr(element._id);
  }); 
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getUserRoles.getUserRoles");
  return null;
});

exports.getRoles = (req,res) => roles.find({ type : { $gt: req.user.type } }).lean().then(function(doc) {
  doc.forEach(element => { 
    element.rlid = endecode.encryptstr(element._id);
  }); 
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getUserRoles.getUserRoles");
  return null;
});

// exports.getUserOnlyRole = (req,res) => roles.findOne({_id: endecode.decryptstr(req)}).lean().then(function(doc) {
//   return doc;
// }).catch(function(err) {
//   utils.logException(err,req,"getUserRoles.getUserOnlyRole");
//   return null;
// });

exports.getUserOnlyRole = (req,res) => roles.findOne({_id: endecode.decryptstr(req)}).lean().then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getUserRoles.getUserOnlyRole");
  return null;
});