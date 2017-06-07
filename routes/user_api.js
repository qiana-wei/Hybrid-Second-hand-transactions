var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var goodsModel = require('../models/goods')
var commentsModel = require('../models/comments')

var TopClient = require('../sms_sdk/topClient').TopClient;
var client = new TopClient({
    'appkey': '23857185',
    'appsecret': '46ef27b2d553383ba4fdef1322a610fd',
    'REST_URL': 'http://gw.api.taobao.com/router/rest'
});

let code = ''

//获取验证码
router.post('/checkcode',function(req,res){
    let phone = req.body.phone;
    code = Math.floor(Math.random() * (9999 - 1000));
    if(req.xhr || req.accepts('json,html')=='json'){
        userModel.find({phone:phone},function(err,users){
            if(users.length > 0){
                client.execute('alibaba.aliqin.fc.sms.num.send', {
                    'extend':'123456',
                    'sms_type':'normal',
                    'sms_free_sign_name':'ST二手交易',
                    'sms_param':'{\"code\":'+'\"' +code + '\"}',
                    'rec_num':req.body.phone,
                    'sms_template_code':'SMS_68230009'
                }, function(error, response) {
                    if (!error){
                        console.log(response)
                        res.send(200,{response})
                    }else {
                        console.log(error)
                        res.send(400,{error})
                    }
                })
            }else{
                console.log('注册验证码');
                client.execute('alibaba.aliqin.fc.sms.num.send', {
                    'extend':'123456',
                    'sms_type':'normal',
                    'sms_free_sign_name':'ST二手交易',
                    'sms_param':'{\"code\":'+'\"' +code + '\"}',
                    'rec_num':req.body.phone,
                    'sms_template_code':'SMS_68115022'
                }, function(error, response) {
                    if (!error){
                        console.log(response)
                        res.send(200,{response})
                    }else {
                        console.log(error)
                        res.send(400,{error})
                    }
                })
            }
        })   
    }else{
        res.send(400,{msg:'not JSON'})
    }
})

//登陆注册
router.post('/register',function(req,res){
    let phone = req.body.phone;
    let check_code = req.body.check_code;
    if(req.xhr || req.accepts('json,html')=='json'){
        //todo
        if(check_code == code){
            // if(check_code == '1234'){
                userModel.find({phone:phone},function(err,users){
                    if(users.length > 0){
                        res.send(200,{userInfo:users[0],changeCurrentView:'home'})
                    }else{
                        let Entity = new userModel({
                            phone:phone
                        })
                        Entity.save();
                    res.send(201,{userInfo:Entity,changeCurrentView:'supplement'})
                    }
                })
        }else{
            res.send(400,{msg:'验证码不匹配'})
        }
    }else{
        res.send(400,{msg:'not JSON'})
    }
})

//补充、修改、完善用户信息
router.patch('/info',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let {
            _id,
            username,
            sex,
            admission_time
        } = req.body
        let update = {}
        username ? update.name = username : ''
        sex ? update.sex = sex : ''
        admission_time ? update.admission_time = admission_time : ''
        userModel.update({_id:_id},update,function(err,result){
            if(err){
                console.log(err);
                res.status(400).send(err)                
            }else{
                console.log(result)
                res.status(200).send(result)                
            }
        })

    }else{
        res.status(400).send({msg:'Not JSON'})
    }
})
//获取用户信息
router.get('/:id',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let userId = req.path.split('/').pop()
        userModel.find({_id:userId},function(err,users){
            if(users.length>0){
                res.status(200).send(users[0])
            }
        })
    }else{
        res.status(400).send({msg:'Not JSON'})
    }
})

//获取用户发布的商品
router.get('/goods/:id',function(req,res){
    let userId = req.params.id
    goodsModel.find({user_id:userId},function(err,goods){
        if(goods.length>0){
            res.status(200).send(goods)
        }else{
            res.status(200).send()
        }
    })
})

module.exports = router;
