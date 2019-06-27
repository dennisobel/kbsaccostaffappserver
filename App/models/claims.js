const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const claimSchema = new Schema({
    /*
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema'
    },
    */
    user:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        required: false
    },
    details:{
        type: String,
        required: false
    },
    cost:{
        type: String,
        required: false
    },
    verified:{
        type: Boolean,
        required: false,
        default: false
    },
    verifiedBy:{
        type: String,
        required: false
    },
    approved:{
        type: Boolean,
        required: false,
        default: false
    },
    approvedBy:{
        type: String,
        required: false
    },
    paid:{
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model("ClaimSchema", claimSchema);