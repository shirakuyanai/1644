const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
        required: true // ?
    },
    role:{
        type: Number,
        default: 1,
        // 1: customer
        // 2: staff
        // 3: manager
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
        // true: active
        // false: suspended
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User