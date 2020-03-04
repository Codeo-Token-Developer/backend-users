const express = require('express');
const Router = express.Router();
const BankController = require('../controllers/bankAccountController');

Router.get('/', BankController.readAll);


module.exports = Router;