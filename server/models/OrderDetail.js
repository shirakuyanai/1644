const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderDetailSchema = new Schema({
  order:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true
  },
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity:{
    type: Number,
    // required: true
  },
  total:{
    type: Number,
  },
})

const OrderDetail = mongoose.model('OrderDetail', OrderDetailSchema)
module.exports = OrderDetail