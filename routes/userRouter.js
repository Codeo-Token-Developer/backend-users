const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');
const { authentification } = require('../middlewares/tokenChecking');
const sendEmail = require('../middlewares/sendMail');
const sendMailChangePassword = require('../middlewares/sendMailChangePassword');

Router.get('/', UserController.readAll);
Router.get('/account', authentification,UserController.readMe);
Router.post('/', UserController.create, sendEmail);
Router.post('/login', UserController.login);
Router.post('/changePassword', UserController.updatePassword, sendMailChangePassword);



module.exports = Router;