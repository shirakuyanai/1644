const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate:{
        type: Date,
        required: true
    },
    lastUpdate:{
        type: Date,
        required: true
    },
    orderDetail:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderDetail',
      required: true
  },
  status:{
    type: Number,
    required: true
  }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order