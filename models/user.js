const mongoose = require('mongoose');
const { hashPass } = require('../helpers/hashPassword')

const UserSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: [true, 'Full Name cannot be empty']
    },
    username: {
        type: String,
        required: [true, 'Username cannot be empty'],
        validate: {
            validator: function (value) {
                return this.model('User').findOne({username: value})
                    .then(function (user) {
                        if (user) {
                            return false;
                        }else {
                            return true
                        }
                    })
            },
            message: props => `${props.value} already taken`
        }
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty']
    },
    avatar: {
        type: String,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    id_country: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date()
    },
    verification: {
        type: Boolean,
        default: false
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    referral_address: {
        type: String,
    },
    approval_verified: {
        type: Boolean,
        default: false
      }
});

UserSchema.pre('save', function (next) {
    let pass = this.password;
    this.password = hashPass(pass);
    next();
})

const user = mongoose.model('User', UserSchema);

module.exports = user;



