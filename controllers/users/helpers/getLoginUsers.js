const user=require('../../../models/users');
var utils = require('../../../config/utils');


exports.getLoginUsers = (req,res) => user.findOne({username:req.body.username,password:req.body.password}).lean().then(function(doc) {
  return doc;
}).catch(function(err) {
  utils.logException(err,req,"getLoginUsers.getLoginUsers");
  return null;
});

 //let usrnam = "admin";
// let pass= "13";
// exports.getLoginUsers= user.find({username:usrnam,password:pass}).then(function(doc) {
//          return doc;
//        });  

// async function getLoginUsers(obj){
//   await user.find({username:obj.username,password:obj.password}).then(function(doc) {
//     return doc;
//   }); 
// }
// exports.getLoginUsers = getLoginUsers

// exports.getLoginUsers=(req,res)=>{
//    try{
//     var id = req.body.id;
//   console.log(id);
//   var user = req.body.username;
//   console.log(user);

// }catch(error){

//    console.log(error)
  
//   }
// }




//exports.getLoginUsers = {4:"t",5:"u",6:"v"};

// exports.getLoginUsers=async(req, res) => {
//     try {
//         // let usrnam = "admin";
//         // let pass= "123";
//         // let obj = [];
//         // const arr = await user.find({username:usrnam,password:pass}, function (err, docs) { 
//         //     if (err){ 
//         //         console.log(err); 
//         //     } 
//         //     else{         
//         //         console.log("First function call : ", docs); 
//         //     } 
//         // });
//       res.send([3,4,5])
//     } catch (error) {
//       console.log(error)
//     }
// }

// let usrnam = "admin";
// let pass= "123";
// let obj = [];
// const arr = await user.find({username:usrnam,password:pass}, function (err, docs) { 
//     if (err){ 
//         console.log(err); 
//     } 
//     else{         
//         console.log("First function call : ", docs); 
//     } 
// }); 
// console.log("done");
// console.log(arr);
// exports.getLoginUsers = arr;
// let usrnam = "admin";
// let pass= "123";
// user.find({username:usrnam,password:pass})
// .then(function(doc) {
//     console.log(doc);
//     exports.getLoginUsers = doc;
// })

// exports.getLoginUsers=async(req,res)=>{
//     try{
        
//         //let id=req.params.id
//         let usrnam = "admin";
//         let pass= "123";
//         let newobj=await user.find({username:usrnam,password:pass})

//         res.json({
//             success:true,
//             data:newobj
//         })
//         // if (res !== undefined) {
//         //     res.json({
//         //         success:true,
//         //         data:newobj
//         //     })
//         // }

//     }catch(error){
//         console.log(error);
//         // res.json({
//         //     success:false,
//         //     data:error
//         // })
//     }
// }