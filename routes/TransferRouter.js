const express = require("express");
const Router = express.Router();
const TransferController = require("../controllers/TransferCodeoController");
const TransferCodeo = require("../middlewares/TransferCodeo");
const Transaction = require('../models/TransactionHistory');

const { authentification } = require("../middlewares/tokenChecking");

Router.post('/',authentification, TransferController.getMyAccount, TransferCodeo, TransferController.getTransactions);
Router.get("/", TransferController.getTransactions);
Router.get('/all', (req,res,next) => {
    Transaction.find({})
        .then(function(trs) {
            res.status(200).json(trs)
        })
        .catch(next)
})


module.exports = Router;
