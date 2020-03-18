const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
const accountUser = require('./accountRouter');
const verifyUser = require('./verificationUser');
const KYCRouter = require('./kycRouter');
const bankAccountRouter = require('./bankAccountRouter');
const passwordRouter = require('./PasswordRouter');
const tranferRouter = require('./TransferRouter');
const creditCardRouter = require('./creditCardRouter');
const cryptoRouter = require('./cryptoRouter');
const historyRouter = require('./historyRouter');
const feeRouter = require('./feeRouter');

Router.use('/users', userRouter);
Router.use('/accounts', accountUser);
Router.use('/api/auth/verify', verifyUser);
Router.use('/api/auth/password/', passwordRouter);
Router.use('/kyc', KYCRouter);
Router.use('/bankAccount', bankAccountRouter);
Router.use('/transfer', tranferRouter);
Router.use('/credit-card', creditCardRouter);
Router.use('/crypto', cryptoRouter);
Router.use('/history', historyRouter);
Router.use('/fee', feeRouter);

const User = require('../models/user');
const Account = require('../models/account');

Router.delete('/delete/:userId', function (req,res,next) {
    let userId = req.params.userId;
    User.deleteOne({_id: userId})
        .then(function () {
            res.status(200).json({message: 'User already deleted'})
        })
        .catch(err => console.log(err))
})

module.exports = Router;