const mongoose = require('mongoose');
const { hashPass } = require('../helpers/hashPassword');

const passwordSchema = new mongoose.Schema({
    password: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

passwordSchema.pre('save', function(next) {
    let pass = hashPass(this.password);
    this.password = pass;
    next();
})

const password = mongoose.model('Password', passwordSchema);

module.exports = password;