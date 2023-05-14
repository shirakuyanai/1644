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
    items: [{
        Order: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Order',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }],
      total: {
        type: Number,
        required: true
      }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order