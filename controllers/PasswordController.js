const User = require('../models/user');
const { hashPass } = require('../helpers/hashPassword');

class PasswordController {


    static updateForgotPassword(req,res,next) {

        let userId = req.params.userId;
        let { newPassword } = req.body;
        let hashing = hashPass(newPassword);

        User.updateOne({_id: userId}, {password: hashing})
            .then(function() {
                res.status(201).redirect('http://dapp.codeotoken.com').json({message: "Your password has been changed"})
            })
            .catch(next)

    };

    


};


module.exports = PasswordController;