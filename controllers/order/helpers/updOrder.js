const orders =require('../../../models/order');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');

exports.updOrdDel=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await orders.findByIdAndDelete(id, function (err){

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
        utils.logException(err,req,"updOrder.updOrdDel");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updOrdBlk=async(req,res)=>{
    try{
        let id= req.params.id;
        console.log(id);
        let response = await orders.findByIdAndUpdate(id,{"status": "1"}, function(err, result){

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
        utils.logException(err,req,"updOrder.updOrdBlk");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updOrdRsm=async(req,res)=>{
    try{
        let id= req.params.id;
        let response = await orders.findByIdAndUpdate(id,{"status": "0"}, function(err, result){

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
        utils.logException(err,req,"updOrder.updOrdRsm");
        res.json({
            success:false,
            data:err
        })
    }
}