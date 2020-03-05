const express = require('express');
Router = express.Router();
const UserController = require('../controllers/userController');

Router.post('/:token',UserController.replacePassword);

module.exports = Router;