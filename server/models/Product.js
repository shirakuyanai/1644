const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
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
        type: [String],
    },
    colors:{
        type: [String],
    },
    models:{
        type: [String],
    },
    description:{
        type: String,
    },
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product