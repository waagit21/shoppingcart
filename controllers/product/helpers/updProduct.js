const products =require('../../../models/product');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');

exports.updPrdDel=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await products.findByIdAndDelete(id, function (err){

            if(err){
                res.json({
                    success:true,
                    data:0
                })
            }
            else{
                res.json({
                    success:true,
                    data:1
                })
            }    
        })

    }catch(err){
        utils.logException(err,req,"updProduct.updPrdDel");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updPrdBlk=async(req,res)=>{
    try{
        let id= req.params.id;
        console.log(id);
        let response = await products.findByIdAndUpdate(id,{"status": "1"}, function(err, result){

            if(err){
                res.json({
                    success:true,
                    data:0
                })
            }
            else{
                res.json({
                    success:true,
                    data:1
                })
            }    
        })

    }catch(err){
        utils.logException(err,req,"updProduct.updPrdBlk");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updPrdRsm=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await products.findByIdAndUpdate(id,{"status": "0"}, function(err, result){

            if(err){
                res.json({
                    success:true,
                    data:0
                })
            }
            else{
                res.json({
                    success:true,
                    data:1
                })
            }    
        })

    }catch(err){
        utils.logException(err,req,"updProduct.updPrdRsm");
        res.json({
            success:false,
            data:err
        })
    }
}