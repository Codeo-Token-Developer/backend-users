const User = require('../models/user');
const { checkPass } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/jwt');
const { verifyToken } = require('../helpers/jwt');

class UserController {

    static readAll(req,res,next) {
        User.find({}).populate('account')
            .then(function (users) {
                res.status(200).json(users);
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let userId = req.decoded.id;
        User.findOne({_id: userId}).populate('account')
            .then(function (user) {
                res.status(200).json(user);
            })
            .catch(next);
    };

    static create(req,res,next) {
        let { name, email, password, confirm_password } = req.body;
        if (confirm_password != password) {
            return next({message: "Confirm Password doesn't match with password"})
        }else {
            User.create({
                name,
                email,
                password
            })
            .then(function(user) {
                console.log('Masuk then create')
                let payload = { name: user.name, email: user.email };
                req.payload = payload;
                next();
                // res.status(202).json({message: `Thank you for registering ${name}, please verify your email first`})
            })
            .catch(next);
        };
    };

    static login(req,res,next) {
        let { email, password } = req.body;
        User.findOne({
            email
        })
        .then(function (user) {        
            if (user) {
                if (checkPass(password, user.password)) {
                   if (user.verification) {
                    let payload = {
                        id: user.id,
                        email: user.email,
                    }
                    let token = generateToken(payload);
                    res.status(201).json({message: `Welcome ${user.name}, hope you have a nice day`, token, user})
                   }else {
                       next({message: `Please verify your email first`});
                   }
                }else {
                    next({message: 'Invalid email / password'});
                }
            }else {
                next({message: 'Invalid email / password'});
            };
        })
        .catch(next)
    };

    static updateVerification(req,res,next) {
        let decoded = verifyToken(req.params.token);
        User.updateOne({email: decoded.email}, {verification: true})
            .then(function () {
                res.status(200).redirect("https://www.google.com")
            })
            .catch(next);
    };
};

module.exports = UserController;