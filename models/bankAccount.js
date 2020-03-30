const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    bank_name: {
        type: String,
        required: [true, 'Bank name cannot be empty']
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
    },
    approved_status: {
        type: Boolean,
    }
})

const bankAccount = mongoose.model('BankAccount', bankAccountSchema);

module.exports = bankAccount