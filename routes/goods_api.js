var express = require('express');
var router = express.Router();

var userModel = require('../models/users')
var goodsModel = require('../models/goods')
var commentsModel = require('../models/comments')

router.post('/',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let Entity = new goodsModel(req.body)
        Entity.save();
        res.status(200).send(Entity) 
    }else{
        res.status(400).send({msg:'not Json'}) 
    }
})

router.get('/details/:id',function(req,res){
    if(req.xhr || req.accepts('json,html')=='json'){
        let id = req.path.split('/').pop()
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



module.exports = router;
