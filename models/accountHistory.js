const mongoose = require('mongoose');


const accountHistorySchema = new mongoose.Schema ({

    date: {
        type: Date,
        default: new Date
    },
    transaction_id: {
        type: String,
    },
    transaction_status: {
        type: Boolean
    },
    value: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


const accountHistory = mongoose.model('AccountHistory', accountHistorySchema);

module.exports = accountHistory;