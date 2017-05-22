var express = require('express');
var router = express.Router();
var userModel = require('../models/users')



//form 表单提交
// router.post('/',function(req,res){
//   console.log('Name(from querystring):'+req.body.name)
//   console.log('studentNum(from querystring):'+req.body.studentNum)
//   console.log('sex(from querystring):'+req.body.sex)
//   console.log('telephone(from querystring):'+req.body.telephone)
//   console.log('file:'+req.body.files);
//     userModel.find({telephone:req.body.telephone},function(err,user){
//         if(user.length > 0){
//             console.log(user.telephone);                
//             res.send(401,{error:
//                 {
//                     msg:'telephone 重复',
//                     userPhone:user.telephone,
//                     reqPhone:req.body.telephone
//                 }
//             })
//         }else{
//             //存数据
//             new userModel({
//                 name:req.body.name,
//                 studentNum:req.body.studentNum,
//                 sex:req.body.sex,
//                 telephone:req.body.telephone
//             }).save();
//             res.send({success:true})
//         }
//     });
// })

//ajax提交
router.post('/',function(req,res){
    console.log('Name(from querystring):'+req.body.name)
    console.log('studentNum(from querystring):'+req.body.studentNum)
    console.log('sex(from querystring):'+req.body.sex)
    console.log('telephone(from querystring):'+req.body.telephone)
    if(req.xhr || req.accepts('json,html')=='json'){
        userModel.find({telephone:req.body.telephone},function(err,user){
            if(user.length > 0){
                console.log(user.telephone);                
                res.send(401,{error:
                    {
                        msg:'telephone 重复',
                        userPhone:user.telephone,
                        reqPhone:req.body.telephone
                    }
                })
            }else{
                //存数据
                new userModel({
                    name:req.body.name,
                    studentNum:req.body.studentNum,
                    sex:req.body.sex,
                    telephone:req.body.telephone
                }).save();
                res.send({success:true})
            }
        });
    }else{
        res.send(400,{error:'error'})
    }
})
module.exports = router;
