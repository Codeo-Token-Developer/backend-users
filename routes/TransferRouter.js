const express = require("express");
const Router = express.Router();
const TransferController = require("../controllers/TransferCodeo");
const TransferCodeo = require("../middlewares/TransferCodeo");

const { authentification } = require("../middlewares/tokenChecking");

// Router.post('/',authentification, TransferController.getMyAccount, TransferCodeo);
Router.post("/", TransferCodeo);

module.exports = Router;
