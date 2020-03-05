const express = require('express');
const Router = express.Router();
const User = require('../models/user');
const passwordController = require('../controllers/PasswordController');

const authenticate = (req,res,next) => {
    let userId = req.params.userId;
    User.findOne({_id: userId})
        .then(function (user) {
            if (user) {
                res.redirect("https://www.google.com")
            }else {
                next({message: 'Email not found'})
            }
        })
        .catch(next);
};

const userChecking = (req,res,next) => {
    let userId = req.params.userId;
    User.findOne({_id: userId})
        .then(function (user) {
            if (user) {
                next();
            }else {
                next({message: 'User not found'})
            }
        })
        .catch(next);
};



Router.get('/forgotPassword/:userId',authenticate);
Router.get('/changePassword/:userId' )
Router.post('/:userId',userChecking, passwordController.updateForgotPassword )

module.exports = Router;