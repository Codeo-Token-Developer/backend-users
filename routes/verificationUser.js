const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.get('/:token', userController.updateVerification);

module.exports = Router;