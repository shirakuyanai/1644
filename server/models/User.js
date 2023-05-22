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
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true // ?
    },
    email:{
        type: String,
        required: true // ?
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    roles:{
        type: Number,
        default: 1,
        // 1: customer
        // 2: admin
        // 3: manager
    },
})

const User = mongoose.model('User', UserSchema)
module.exports = User