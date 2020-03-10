const express = require('express');
const Router = express.Router();
const CreditCardController = require('../controllers/creditCardController');
const { authentification } = require('../middlewares/tokenChecking');

Router.get('/', authentification, CreditCardController.readAll);
Router.post('/', authentification, CreditCardController.create);

module.exports = Router;