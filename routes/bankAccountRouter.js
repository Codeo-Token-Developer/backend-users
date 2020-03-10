const express = require('express');
const Router = express.Router();
const BankController = require('../controllers/bankAccountController');
const { authentification } = require('../middlewares/tokenChecking');


Router.get('/', BankController.readAll);
Router.post('/', authentification,BankController.create);


module.exports = Router;