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

exports.getApiAllBaseData=async(req,res)=>{
  try{  
    let newobj=await basedata.find({});
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
exports.getApiBaseDataByName=async(req,res)=>{
  try{  
    let id=req.params.id 
    let newobj=await basedata.find({}).select(id);
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