const express = require("express");
const Router = express.Router();
const TransferController = require("../controllers/TransferCodeoController");
const TransferCodeo = require("../middlewares/TransferCodeo");
// const Transaction = require('../models/TransactionHistory');
const checkReferral = require('../middlewares/checkReferral');
const { authentification } = require("../middlewares/tokenChecking");
const adminAccount = require('../middlewares/AdminAccount');


Router.post('/', authentification,checkReferral, adminAccount,TransferController.getMyAccount, TransferCodeo, TransferController.getTransactions,TransferController.TransferAdmin);


// Router.post('/', authentification, checkReferral, function (req,res,next) {
//     console.log(req.refValue);
//     console.log(req.adminValue);
//     res.status(200).json(req.refAccount)
// })

// Router.get("/", TransferController.getTransactions);
// Router.get('/all', (req,res,next) => {
//     Transaction.find({})
//         .then(function(trs) {
//             res.status(200).json(trs)
//         })
//         .catch(next)
// })

module.exports = Router;
