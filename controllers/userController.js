const User = require('../models/user');
const { checkPass } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/jwt');
const { verifyToken } = require('../helpers/jwt');
const { hashPass } = require('../helpers/hashPassword');

class UserController {

    static readAll(req,res,next) {
        User.find({}).populate('account')
            .then(function (users) {
                res.status(200).json({users, status: 200});
            })
            .catch(next);
    };

    static readMe(req,res,next) {
        let userId = req.decoded.id;
        User.findOne({_id: userId}).populate('account')
            .then(function (user) {
                res.status(200).json({user, status: 200});
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
                let payload = { name: user.name, email: user.email };
                req.payload = payload;
                next();
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
            
                    res.status(201).json({message: `Welcome ${user.name}, hope you have a nice day`, token, user, status: 201})
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
                res.status(200).redirect("http://dapp.codeotoken.com")
            })
            .catch(next);
    };

    static forgotPassword(req,res,next) {
        let { email } = req.body;
        User.findOne({email})
            .then(function (user) {
                if (user) {
                    let token = generateToken({id: user.id});
                    req.token = token;
                    req.updateUser = user;
                    next();
                }else {
                    next({message: 'Email not found'})
                }
            })
            .catch(next)
    };

    // static replacePassword(req,res,next) {
    //     let userId = req.decoded.id;
    //     let { password } = req.body;
    //     User.findOne({_id: userId})
    //         .then(function (user) {
    //             if (user) { 
    //                 let hashValue = hashPass(password);
    //                 return User.updateOne({_id: userId}, {password: hashValue})
    //                     .then(function () {
    //                         res.status(200).redirect("http://dapp.codeotoken.com")
    //                     })
    //             }else {
    //                 next({message: 'Users Not found'})
    //             }
    //         })
    //         .catch(next)
    // };

    static updateUserData(req,res,next) {
        let userId = req.decoded.id;
        let { name, email, avatar,  id_country} = req.body;
        User.updateOne({_id: userId}, {name, email, avatar, id_country}, {omitUndefined: true})
            .then(function () {
                res.status(201).json({message: 'Your data has been updated', status: 201})
            })
            .catch(next);
    };

    // static changePassword(req,res,next) {
    //     let { oldPassword, newPassword } = req.body;
    //     let userId = req.decoded.id;
    //     User.findOne({_id: userId})
    //         .then(function (user) {
    //             if (user) {
    //                 if (checkPass(oldPassword, user.password)) {
    //                     let hashing = hashPass(newPassword);
    //                     req.user = user;
    //                     req.hashing = hashing;
    //                     let payload = {
    //                         id: user.id
    //                     };
    //                     req.token = generateToken(payload);
    //                     next();
    //                 }else {
    //                     next({message: 'Your old password didnt match with current password'})
    //                 }
    //             }else {
    //                 next({message: 'User not found'})
    //             }
    //         })
    //         .catch(next)
    // };


    // static updateNewPassword(req,res,next) {
        
    //     let hash = req.params.hashing;
    //     let userId = req.decoded.id;
    //     User.findOne({_id: userId}, {password: hash})
    //         .then(function () { 
    //             res.status(200).redirect("http://dapp.codeotoken.com")
    //         })
    //         .then(next);
    // };

};

module.exports = UserController;