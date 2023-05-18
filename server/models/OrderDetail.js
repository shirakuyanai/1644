const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderDetailSchema = new Schema({
  order:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity:{
    type: Number,
    required: true
  }
})

const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema)
module.exports = OrderDetail