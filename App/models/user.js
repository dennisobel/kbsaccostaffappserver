const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    userName:{
        type: String,
        required: false,
        unique: true
    },
    name:{
        type: String,
        required: false
    },
    grade:{
        type: String,
        required: false
    },
    designation:{

    },
    staffNumber:{
        type: String,
        required: false,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true
    },
    accountNumber: {
        type: String,
        required: false,
        unique: true
    },
    otp:{
        type: String,
        required: false
    },
    password:{
        type:String,
        required: false
    },
    role:{
        type:String,
        required: false
    },
    verified:{
        type:Boolean,
        required: false,
        default:false
    },
    canVerifyClaim:{
        type:Boolean,
        default:false
    }    
})

module.exports = mongoose.model("UserSchema", userSchema);