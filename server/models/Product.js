const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
    },
    colors:{
        type: [String],
    },
    specs:{
        type: [String],
    },
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product