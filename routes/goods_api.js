var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var goodsModel = require('../models/goods')
var commentsModel = require('../models/comments')

// 发布商品
router.post('/',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let Entity = new goodsModel(req.body)
        Entity.save();
        res.status(200).send(Entity) 
    }else{
        res.status(400).send({msg:'not Json'}) 
    }
})
//获取商品
router.get('/details/:id',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let id = req.params.id
        goodsModel.findOne({_id:id})
        .populate('user_id')
        .exec(function (err, goodsModel) {
            if(err){
                res.status(400).send({msg:'error',err}) 
            }else{
                res.status(200).send(goodsModel) 
            }
        })
    }else{
        res.status(400).send({msg:'not Json'}) 
    } 
})
//获取商品列表
router.get('/list',function(req,res) { 
    if(req.xhr || req.accepts('json,html')=='json'){
        goodsModel.find({})
        .populate('user_id')
        .exec(function (err, goodsModel) {
            if(err){
                res.status(400).send({msg:'error',err}) 
            }else{
                res.status(200).send(goodsModel) 
            }
        })
    }else{
        res.status(400).send({msg:'not Json'}) 
    } 
})
//发布留言
router.post('/:id/comment',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let Entity = new commentsModel(req.body)
        Entity.save();
        res.status(200).send(Entity) 
    }else{
        res.status(400).send({msg:'not Json'}) 
    }
})
//获取留言
router.get('/:id/comment',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let id = req.params.id
        commentsModel.find({goods_id:id})
        .populate('user_id')
        .exec(function(err,commentsModel){
            if(err){
                res.status(400).send({msg:'error',err}) 
            }else{
                console.log(commentsModel);
               res.status(200).send(commentsModel) 
            }
        })
    }else{
        res.status(400).send({msg:'not Json'}) 
    }
})

//搜索商品
router.get('/search',function(req,res){
    let key = req.param('key')
    let reg =new RegExp(`${key}`);
    goodsModel.find({goods_name:reg})
        .populate('user_id')
        .exec(function (err, goodsModel) {
            if(err){
                res.status(400).send({msg:'error',err}) 
            }else{
                res.status(200).send(goodsModel) 
            }
        })
    
})

//添加喜爱值
router.patch('/like/:id',function(req,res){
    let id= req.params.id
    let update ={like: req.body.like}
    goodsModel.update({_id:id},update,function(err,result){
        if(err){
            console.log(err);
            res.status(400).send(err)                
        }else{
            console.log(result)
            res.status(200).send(result)                
        }
    })
})

module.exports = router;
