var mongoose = require('mongoose')

var commentSchema = mongoose.Schema({
    // user_id : Schema.Types.ObjectId,
    // good_id : Schema.Types.ObjectId,
    // comment_pid : Schema.Types.ObjectId,
    comment : String,
    time_stamp : Date
})

var commentModel = mongoose.model('comments', commentSchema)

module.exports = commentModel;
