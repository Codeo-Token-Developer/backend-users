const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    bank_name: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    swift_code: {
        type: String,
        default: ''
    },
    account_holder_name: {
        type: String,
        default: ''
    },
    account_number: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const bankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = bankAccount