const express = require("express");
const Router = express.Router();
const TransferController = require("../controllers/TransferCodeoController");
const TransferCodeo = require("../middlewares/TransferCodeo");


const { authentification } = require("../middlewares/tokenChecking");

Router.post('/',authentification, TransferController.getMyAccount, TransferCodeo, TransferController.getTransactions);
Router.get("/", TransferController.getTransactions);

module.exports = Router;
