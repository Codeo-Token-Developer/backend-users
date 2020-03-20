const User = require('../models/user');
const Account = require('../models/account');

function checkReferral(req,res,next) {
    let { adminValue } = req.body;
    let userId = req.decoded.id;
    User.findOne({_id: userId})
        .then(function(user) {
            if (user.ref) {
               return Account.findOne({user: userId})
                    .then(function (account) {
                        let refValue = dividedValue(adminValue);
                        req.refValue = refValue;
                        req.refAccount = account;
                        next();
                    })
            }else {
                next();
            }
        })
        .catch(next);

};

function dividedValue(adminValue) {
    let refValue = 0.2 * adminValue;
    return refValue;
};


module.exports = checkReferral;