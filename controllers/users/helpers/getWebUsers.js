const user = require('../../../models/user');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');
var dateFormat = require("dateformat");
const configkeys = require("../../../config/default.json");
//var functions = require('../../../config/functions');
var moment = require('moment');

exports.getAllWebUsers = (req,res) => user.find().lean().then(function(doc) {
  doc.forEach(item => { 
    //item.created = functions.formatDateTime(item.created);
    item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
    //item.creation_date = moment(new Date(item.creation_date * 1000)).format('DD MMM, yyyy hh:mm:ss A');
    item.webid = endecode.encryptstr(item._id);
  }); 
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getAllWebUsers");
  return null;
});

exports.getWebUsers = function(req,res) {
  return new Promise((resolve, reject) => {
    const options = {
      page: 1,
      limit: configkeys.pagelimit,
    };
    user.paginate({}, options, function (err, doc) {
        if(err){
          utils.logException(err,req,"getWebUsers.getWebUsers");
        }
        var i = 0;
        //doc.docs.webid = doc.toObject();
        doc.docs.forEach(item => { 
          item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
          item.webid = endecode.encryptstr(item._id);
        }); 
        console.log(doc);
        resolve(doc);        
      }).catch(function(err) {
        utils.logException(err,req,"getWebUsers.getWebUsers");
        reject(err);
      });      
  });
};

exports.getMoreWebUsers = async(req,res) => {
  try{
    let id= req.params.id;
    const options = {
      page: parseInt(id) || 1,
      limit: configkeys.pagelimit,
    };
    let response = await user.paginate({}, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getWebUsers.getMoreWebUsers");
            res.json({
                success:true,
                data:null
            })
        }
        else{
            doc.docs.forEach(item => { 
              item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
              item.webid = endecode.encryptstr(item._id);
            });
            res.json({
                success:true,
                data:doc
            })
        }    
    })
  }catch(err){
      utils.logException(err,req,"getWebUsers.getMoreWebUsers");
      res.json({
          success:false,
          data:err
      })
  }
}

exports.getSearcheWebUsers = async(req,res) => {
  try{
    var input = {}; 
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
    };
    let response = await user.paginate(input, options, function (err, doc) {
        if(err){
            utils.logException(err,req,"getWebUsers.getSearcheWebUsers");
            res.json({
                success:true,
                data:null
            })
        }
        else{
            doc.docs.forEach(item => { 
              item.creation_date = dateFormat(new Date(item.creation_date * 1000), "dd mmm, yyyy hh:MM:ss TT");
              item.webid = endecode.encryptstr(item._id);
            });
            res.json({
                success:true,
                data:doc
            })
        }    
    })
  }catch(err){
      utils.logException(err,req,"getWebUsers.getSearcheWebUsers");
      res.json({
          success:false,
          data:err
      })
  }
}

exports.getWebOnlyUser = (req,res) => user.findOne({_id: endecode.decryptstr(req.usrid)}).lean().then(function(doc) {
  doc.admid = req.usrid;
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebOnlyUser");
  return null;
});

exports.getWebByUsername = (req,res) => user.findOne({username: req}).lean().then(function(doc) {
  return endecode.encryptstr(doc._id);
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebByUsername");
  return err;
});

exports.getWebCount = user.countDocuments(function(err, count){
  return count;
}).catch(function(err) {
  utils.logException(err,req,"getWebUsers.getWebCount");
  return null;
});

//#region Apis

//#endregion Apis