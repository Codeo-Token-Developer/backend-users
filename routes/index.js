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

module.exports = Router;