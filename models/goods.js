var mongoose = require('mongoose')
var users = require('./users')

var goodSchema = mongoose.Schema({
    name:{type:String},
    img : {type:[]},
    price : {type:Number},
    degree : {type:Number},
    type : {type:[]},
    description : {type:{}},
    create_time : {type:Date,default:new Date()},
    view : {type:Number,default:1},
    like : {type:Number,default:1},
    sold : {type:Boolean,default:false},
    sold_time : {type:Date},
    user_id : {type:mongoose.Schema.Types.ObjectId,ref:'users'}
})

var goodModel = mongoose.model('goods', goodSchema)

module.exports = goodModel;

