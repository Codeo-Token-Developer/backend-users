const Account = require("../models/account");
const AccountHistory = require('../models/accountHistory');

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

  static getBalance(req,res,next) {
    let balance = req.myBalance;

  };

  static async getTransactions(req, res, next) {
    
    let myHistory = [];
    let myEvents = req.myEvents;
    let myEth = req.myAccount.ETH;
    
    await myEvents.forEach(function (event) {
      let result = JSON.parse(JSON.stringify(event.returnValues));
      if (result.from === myEth) {
        myHistory.push(event)
      }
    });

    let myNewHistory = myHistory[myHistory.length - 1];
    let myResult = JSON.parse(JSON.stringify(myNewHistory.returnValues));

    AccountHistory.create({      
      transaction_id: myEvents.transactionHash,
      transaction_status: true,
      value: myResult.value,
      to: myResult.to,
      user: req.decoded.id,})
      .then(function (account) {
        console.log(account);
      })
      .catch(next);

    
  }
}

module.exports = TransferController;
