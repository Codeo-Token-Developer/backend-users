const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');
const { authentification, accountAuthorization } = require('../middlewares/tokenChecking');
const sendEmail = require('../middlewares/sendMail');
const sendMailChangePassword = require('../middlewares/sendMailChangePassword');
const sendMailUpdatePassword = require('../middlewares/sendMailUpdatePassword');

Router.get('/', UserController.readAll);
Router.get('/account', authentification,UserController.readMe);
Router.post('/', UserController.create, sendEmail);
Router.post('/login', UserController.login);
Router.post('/forgotPassword', UserController.updatePassword, sendMailChangePassword);
Router.put('/', authentification, accountAuthorization, UserController.updateUserData);
Router.post('/changePassword', authentification, UserController.changePassword, sendMailUpdatePassword);

module.exports = Router;

