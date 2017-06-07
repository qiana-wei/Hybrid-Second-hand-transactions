var express = require('express');
var router = express.Router();
var fs = require("fs");
var userModel = require('../models/users')
var goodsModel = require('../models/goods')
var commentsModel = require('../models/comments')

// 发布商品
router.post('/',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let Entity = new goodsModel(req.body)
        Entity.save();
        var base64Data = [];
        let user_id = req.body.user_id
        let goods_id = Entity._id
        let picPath = []
        let path =`www/pictures/goods/${goods_id}`           
        fs.mkdir(path,function(err){
            if(err){
                console.log(err);
            }else{
                req.body.picSrc.forEach(function(src,index) {
                    let base64Data = src.replace(/^data:image\/\w+;base64,/, "");
                    var dataBuffer = new Buffer(base64Data, 'base64');
                    let imgName = req.body.pictureFileList[index] + '.jpg'
                    let imgPath=`${path}/${imgName}`
                    picPath.push(imgPath)
                        fs.writeFile(imgPath, dataBuffer, function(err){
                            if(err){
                                console.log(err);
                            }else{
                                console.log('保存成功');
                            }
                        })
                }, this);
                picPath[0] = picPath[0] ? picPath[0].replace('www','') : '/img/normal.png'
                picPath[1] = picPath[1] ? picPath[1].replace('www','') : '/img/normal.png'
                picPath[2] = picPath[2] ? picPath[2].replace('www','') : '/img/normal.png' 
                let update = {
                    img:picPath
                }
                goodsModel.update({_id:goods_id},update,function(err,result){
                    if(err){
                        res.status(400).send(err)                
                    }else{
                        goodsModel.find({_id:goods_id},function(err,goods){
                            console.log(goods);
                            res.status(200).send(goods[0]) 
                        })               
                    }
                })
            }
        }) 
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
        .sort({'create_time':-1})
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
router.get('/list/like',function(req,res) { 
    if(req.xhr || req.accepts('json,html')=='json'){
        goodsModel.find({})
        .sort({'like':-1})
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
            res.status(400).send(err)                
        }else{
            res.status(200).send(result)                
        }
    })
})

module.exports = router;
