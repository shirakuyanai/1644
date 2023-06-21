const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  status: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  total: {
    type: Number,
    required: true
  }
})

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order


// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const OrderSchema = new Schema({
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     createdAt:{
//         type: Date,
//         required: true
//     },
//     updatedAt:{
//         type: Date,
//         required: true
//     },
//     status:{
//       type: Number,
//       required: true
//     },
//     address:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Address',
//       required: true
//    },
//     total :{
//       type: Number,
//     }
// })

// const Order = mongoose.model('Order', OrderSchema)
// module.exports = Order