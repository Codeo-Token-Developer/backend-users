const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
const accountUser = require('./accountRouter');
const verifyUser = require('./verificationUser');
const KYCRouter = require('./kycRouter');
const bankAccountRouter = require('./bankAccountRouter');
const passwordRouter = require('./PasswordRouter');
const Password = require('../models/password');
const tranferRouter = require('./TransferRouter');


Router.use('/users', userRouter);
Router.use('/accounts', accountUser);
Router.use('/api/auth/verify', verifyUser);
Router.use('/api/auth/password/', passwordRouter);
Router.use('/kyc', KYCRouter);
Router.use('/bankAccount', bankAccountRouter);
Router.use('/transfer', tranferRouter);

// Router.post('/arrays', function (req,res,next) {
//     array.create({

//     })
//         .then(function(arrays) {
//             res.status(200).json(arrays);
//         })
//         .catch(next);
// })

// Router.get('/arrays', function (req,res,next) {
//     array.find({})
//         .then(function (arrays) {
//             res.status(200).json(arrays)
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })


module.exports = Router;