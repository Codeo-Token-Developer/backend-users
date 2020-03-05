const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');
const { authentification, accountAuthorization } = require('../middlewares/tokenChecking');
const sendEmail = require('../middlewares/sendMail');
const sendMailForgotPassword = require('../middlewares/sendMailForgotPassword');
const sendMailChangePassword = require('../middlewares/sendMailChangePassword');

Router.get('/', UserController.readAll);
Router.get('/account', authentification,UserController.readMe);
Router.post('/', UserController.create, sendEmail);
Router.post('/login', UserController.login);
Router.put('/', authentification, accountAuthorization, UserController.updateUserData);
Router.post('/forgotPassword', UserController.forgotPassword, sendMailForgotPassword);
Router.post('/changePassword', authentification,UserController.changePassword, sendMailChangePassword);

module.exports = Router;

