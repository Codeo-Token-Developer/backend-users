const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema ({

    paypal_email: {
        type: String,
        required: [true, 'Paypal email cannot be empty']
    },
    address_bitcoin: {
        type: String,
        required: [true, 'Bitcoin address cannot be empty']
    },
    address_ethereum: {
        type: String,
        required: [true, 'Ethereum address cannot be empty']
    },
    approved: {
        type: Boolean,
        defualt: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

const crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = crypto;