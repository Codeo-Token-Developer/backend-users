const Account = require("../models/account");
const TransactionHistory = require("../models/TransactionHistory");
const transId = process.env.TRANSACTIONS_DATABASE;

class TransferController {
  static getMyAccount(req, res, next) {
    let userId = req.decoded.id;
    Account.findOne({ user: userId })
      .then(function(Account) {
        req.myAccount = Account;
        next();
      })
      .catch(next);
  }

  static updateHistoryTransactions(req, res, next) {
    let events = req.myEvents;
    console.log(events);
    console.log("Success Token Sending");
    // TransactionHistory.updateOne({_id: transId}, {transactions: events})
    //     .then(function () {

    //     })
    //     .catch(next);
  }

  static getTransactions(req, res, next) {
    TransactionHistory.find({})
      .then(function(transactions) {
        res.status(200).json(transactions);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = TransferController;
