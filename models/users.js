var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    phone:String,
    name: String,
    sex: Number,
    admission_time:Date,
    photo:String
})

userSchema.statics.findByTelephone = function (telephone, cb) {
    this.find({
        telephone: new RegExp(telephone, 'i'),
        cb
    });
}

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;