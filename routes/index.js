const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
const accountUser = require('./accountRouter');
const verifyUser = require('./verificationUser');
const KYCRouter = require('./kycRouter');
const bankAccountRouter = require('./bankAccountRouter');
const passwordRouter = require('./PasswordRouter');
const Password = require('../models/password');

Router.use('/users', userRouter);
Router.use('/accounts', accountUser);
Router.use('/api/auth/verify', verifyUser);
Router.use('/api/auth/password/', passwordRouter);
Router.use('/kyc', KYCRouter);
Router.use('/bankAccount', bankAccountRouter);




module.exports = Router;