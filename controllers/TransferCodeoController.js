const Account = require("../models/account");
const AccountHistory = require('../models/accountHistory');
const CodeoTransfer = require('../helpers/TransferCodeo.function');

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
        console.log(account)
        next();
      })
      .catch(next);
  };


  static async TransferAdmin(req,res,next) {
    let { adminValue } = req.body;
    let refValue = req.refValue;
    let refAccount = req.refAccount;
    let adminAccount = req.adminAccount;
    
    const adminTransfer = await CodeoTransfer(adminAccount.ETH, adminValue, req.myAccount);

    if (refValue) {
      
      const refTransfer = await CodeoTransfer(refAccount.ETH, refValue, req.adminAccount);
      console.log('Success Sending Token')
    }else {
      console.log('Ref tidak ada')
    }

    
  };

}

module.exports = TransferController;
