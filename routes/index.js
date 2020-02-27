const express = require('express');
const Router = express.Router();
const userRouter = require('./userRouter');
const accountUser = require('./accountRouter');
const verifyUser = require('./verificationUser');

Router.use('/users', userRouter);
Router.use('/accounts', accountUser);
Router.use('/api/auth/verify', verifyUser);

module.exports = Router;