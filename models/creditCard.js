const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String,
        default: ''
    },
    card_number: {
        type: String,
        default: ''
    },
    exp_date: {
        type: Date,
    },
    cvc: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const creditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = creditCard;