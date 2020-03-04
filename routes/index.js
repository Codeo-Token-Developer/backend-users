const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
const accountUser = require('./accountRouter');
const verifyUser = require('./verificationUser');
const changePasswordRouter = require('./changePasswordRouter');
const KYCRouter = require('./kycRouter');
const bankAccountRouter = require('./bankAccountRouter');
const updatePasswordRouter = require('./updatePasswordRouter');

Router.use('/users', userRouter);
Router.use('/accounts', accountUser);
Router.use('/api/auth/verify', verifyUser);
Router.use('/api/auth/password/', changePasswordRouter);
Router.use('/api/auth/updatepassword/', updatePasswordRouter);
Router.use('/kyc', KYCRouter);
Router.use('/bankAccount', bankAccountRouter);

module.exports = Router;