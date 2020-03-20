const User = require('../models/user');
const { checkPass } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/jwt');
const { verifyToken } = require('../helpers/jwt');
const Password = require('../models/password');
 
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

    static async create(req,res,next) {
        let { full_name, email, password, confirm_password, ref, username } = req.body;
        let newUser = {full_name, email, password, username};
        if (ref) {
            let findRef = await User.findOne({username: ref})
            if (findRef) {
                newUser.ref = findReff.id
            }else {
                next({message: 'Username not found'})                
            }
        }
        if (confirm_password != password) {
            return next({message: "Confirm Password doesn't match with password"})
        }else {
            User.create({
                full_name: newUser.full_name,
                username: newUser.username,
                password: newUser.password,
                referral_address: 'dapp.codeotoken.com/ref/' + newUser.username,
                ref: newUser.ref,
                email: newUser.email
            })
            .then(function(user) {
                let payload = { name: user.username, email: user.email };
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
        
        User.findOneAndUpdate({email: decoded.email}, {verification: true})
            .then(function (user) {
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

    static updateUserData(req,res,next) {
        let userId = req.decoded.id;
        let { name, email, avatar,  id_country} = req.body;
        User.updateOne({_id: userId}, {name, email, avatar, id_country}, {omitUndefined: true})
            .then(function () {
                res.status(201).json({message: 'Your data has been updated', status: 201})
            })
            .catch(next);
    };

    static changePassword(req,res,next) {
        let { oldPassword, newPassword } = req.body;
        let userId = req.decoded.id;
        User.findOne({_id: userId})
            .then(function (user) {
                req.user = user;
                let check = checkPass(oldPassword, user.password);
                if (check) {
                    return Password.findOne({user: userId})
                        .then(function (password) {
                            let pass = newPassword
                            if (password) {
                                return Password.updateOne({_id: userId}, {password: pass})
                                    .then(function () {
                                        next();
                                    })
                            }else { 
                                return Password.create({password: pass, user: userId})
                                    .then(function() {
                                        next();
                                    })
                            }
                        })
                }else {
                    next({message: 'Old Password didnt match with password'})
                }
            })
            .catch(next);
    };

};

module.exports = UserController;