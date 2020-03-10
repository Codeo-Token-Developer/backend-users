const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty']
    },
    surname: {
        type: String,
        required: [true, 'Surname cannot be empty']
    },
    card_number: {
        type: String,
        required: [true, 'Card number cannot be empty']
    },
    exp_date: {
        type: Date,
        required: [true, 'Date cannot be emtpy']
    },
    cvc: {
        type: String,
        required: [true, 'CVC cannot be empty']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    approved: {
        type: Boolean,
        default: false
    }
})

const creditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = creditCard;