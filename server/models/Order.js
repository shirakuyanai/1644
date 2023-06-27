const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    },
    status:{
      type: Number,
      default: 1,
    },
    address:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true
   },
    total :{
      type: Number,
    }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order