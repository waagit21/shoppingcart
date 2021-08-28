const users=require('../../../models/users');
const user=require('../../../models/user');
var endecode = require('../../../config/endecode');
var utils = require('../../../config/utils');

exports.updAdmDel=async(req,res)=>{
    try{
        let id= endecode.decryptstr(req.params.id);
        let response = await users.findByIdAndDelete(id, function (err){

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
        utils.logException(err,req,"updAdm.updAdmDel");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updAdmBlk=async(req,res)=>{
    try{
        let id= endecode.decryptstr(req.params.id);
        console.log(id);
        let response = await users.findByIdAndUpdate(id,{"status": "1"}, function(err, result){

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
        utils.logException(err,req,"updAdm.updAdmBlk");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updAdmRsm=async(req,res)=>{
    try{
        let id= endecode.decryptstr(req.params.id);
        let response = await users.findByIdAndUpdate(id,{"status": "0"}, function(err, result){

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
        utils.logException(err,req,"updAdm.updAdmRsm");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updWebBlk=async(req,res)=>{
    try{
        let id= endecode.decryptstr(req.params.id);
        let response = await user.findByIdAndUpdate(id,{"status": "1"}, function(err, result){

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
        utils.logException(err,req,"updAdm.updWebBlk");
        res.json({
            success:false,
            data:err
        })
    }
}

exports.updWebRsm=async(req,res)=>{
    try{
        let id= endecode.decryptstr(req.params.id);
        let response = await user.findByIdAndUpdate(id,{"status": "0"}, function(err, result){

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
        utils.logException(err,req,"updAdm.updWebRsm");
        res.json({
            success:false,
            data:err
        })
    }
}