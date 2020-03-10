const express = require('express');
const Router = express();
const { authentification } = require('../middlewares/tokenChecking');
const CryptoController = require('../controllers/cryptoController');

Router.get('/', CryptoController.readAll);
Router.post('/', authentification,CryptoController.create);

module.exports = Router;