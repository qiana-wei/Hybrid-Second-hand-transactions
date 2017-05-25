var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    phone:{type:String},
    name: {type:String},
    sex: {type:String,default:'男'},
    admission_time:{type:String},
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