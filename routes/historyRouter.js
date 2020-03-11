const express = require('express');
const Router = express.Router();
const historyController = require('../controllers/historyController');
const { authentification } = require('../middlewares/tokenChecking');

Router.get('/',authentification, historyController.readMe);

module.exports = Router;