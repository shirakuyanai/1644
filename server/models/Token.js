const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
    value : {
        type: String,
        default: 1,
    },
    revoked : {
        type: Boolean,
        default: false,
    },
})

const Token = mongoose.model('Token', TokenSchema)
module.exports = Token