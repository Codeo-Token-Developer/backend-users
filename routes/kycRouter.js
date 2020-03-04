const express = require('express');
const Router = express.Router();
const KYC = require('../controllers/kycController');
const { authentification, kycAuthentication, kycAuthorization } = require('../middlewares/tokenChecking');

Router.get('/', KYC.readAll);
Router.post('/', authentification, KYC.create);
Router.put('/', authentification, kycAuthentication, kycAuthorization, KYC.updateKyc);

module.exports = Router;