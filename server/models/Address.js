const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address_1:{ // Street/ ally/ house number
        type: String,
        required: true
    },
    address_2:{ // Prenict
        type: String,
        required: true
    },
    address_3:{ // District
        type: String,
        required: true
    },
    address_4:{ // City
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