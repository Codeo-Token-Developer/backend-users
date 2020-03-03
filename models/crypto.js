const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema ({

    paypal_email: {
        type: String,
        default: ''
    },
    address_bitcoin: {
        type: String,
        default: ''
    },
    address_ethereum: {
        type: String,
        default: ''
    }

})

const crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = crypto;