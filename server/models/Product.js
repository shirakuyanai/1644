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
    stock:{
        type: Number,
        required: true
    },
    image:{
        type: String,
    },
    description:{
        type: String,
    },
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product