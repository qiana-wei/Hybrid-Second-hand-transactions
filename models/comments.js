var mongoose = require('mongoose')

var commentSchema = mongoose.Schema({
    user_id : {type:mongoose.Schema.Types.ObjectId,ref:"users"},
    goods_id : {type:mongoose.Schema.Types.ObjectId,ref:"goods"},
    comment_pid : {type:mongoose.Schema.Types.ObjectId,ref:"comments"},
    comment : {type:String},
    time_stamp : {type:Date,default:new Date()}
})

var commentModel = mongoose.model('comments', commentSchema)

module.exports = commentModel;
