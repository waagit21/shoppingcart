const basedata = require('../../../models/basedata');

exports.getAllBaseData = (req,res) => basedata.find({}).lean().then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getBaseData.getAllBaseData");
  return null;
});

exports.getBaseDataByName = (req,res) => basedata.find({}).select(req.clmnam + ' -_id').then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getBaseData.getBaseDataByName");
  return null;
});