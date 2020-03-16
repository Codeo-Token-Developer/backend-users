const BankAccount = require('../models/bankAccount');
const User = require('../models/user');

class BankAccoountController {

    static readAll(req,res,next) {
        BankAccount.find({})
            .then(function (banks) {
                res.status(200).json({status: 200, banks})
            })
            .catch(next);
    };

    static create(req,res,next) {
        let userId = req.decoded.id;
        let { bank_name, country, swift_code, account_holder_name, account_number } = req.body;
        BankAccount.findOne({user: userId})
            .then(function(bank) {
                if (bank) {
                    next({message: 'You already submit your bank account information'})
                }else {
                    return BankAccount.create({
                        bank_name, country, swift_code, account_holder_name, account_number, user: userId
                    })
                    .then(function (bank) {
                        res.status(202).json({message: 'Waiting approval our admin', status: 202})                        
                    })
                }
            })
            .catch(next)
    };

    static update(req,res,next) {
        let bankId = req.params.bankId;
        let { bank_name, country, swift_code, account_holder_name, account_number } = req.body;
        BankAccount.updateOne({_id: bankId}, { bank_name, country, swift_code, account_holder_name, account_number }, {
            omitUndefined: true
        } )
            .then(function() {
                res.status(200).json({message: 'Your bank account data success Updated', status: 200})
            })
    };

};

module.exports = BankAccoountController;