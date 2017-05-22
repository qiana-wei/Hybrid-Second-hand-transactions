var mongoose = require('mongoose')

var goodSchema = mongoose.Schema({
    name:String,
    img : [],
    price : Number,
    degree : Number,
    type : [],
    description : {},
    create_time : Date,
    view : Number,
    like : Number,
    sold : Boolean,
    sold_time : Date,
    // user_id : Schema.Types.ObjectId,
})

var goodModel = mongoose.model('goods', goodSchema)

module.exports = goodModel;

