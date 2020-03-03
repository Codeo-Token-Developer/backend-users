const express = require('express');
Router = express.Router();
const UserController = require('../controllers/userController');
const { authenticationPassword } = require('../middlewares/tokenChecking');

Router.post('/:token', authenticationPassword,UserController.replacePassword);

module.exports = Router;