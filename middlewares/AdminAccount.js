const Account = require('../models/account');
const AccountId = process.env.ADMIN_ID

function adminAccount (req,res,next) {
    Account.findOne({_id: AccountId})
        .then(function(account) {
            req.adminAccount = account;
            next();
        })
        .catch(next)
};

module.exports = adminAccount;