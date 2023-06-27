const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ward:{ // Street/ ally/ house number
        type: String,
        required: true
    },
    province:{ // Province
        type: String,
        required: true
    },
    district:{ // District
        type: String,
        required: true
    },
    city:{ // City
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        required: true,
    }
})

const Address = mongoose.model('Address', AddressSchema)
module.exports = Address