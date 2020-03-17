const { verifyToken } = require('../helpers/jwt');
const User = require('../models/user');
const kyc = require('../models/kyc');

function authentification(req,res,next) {
    if (req.headers.jwttoken) {       
        const decoded = verifyToken(req.headers.jwttoken);
        req.decoded = decoded;
        next();
    }else {
        res.status(404).json({message: 'You must login first as user'}); 
    };
};

function accountAuthorization(req,res,next) {
    let userId = req.decoded.id;
    let accountId = req.params.accountId;
    
    User.findOne({_id: userId})
        .then(function (user) {
            if (user.id !== userId) {
                next({message: `You don't have authorized to do that`})
            };
        })
        .catch(next);
};

function authenticationPassword(req,res,next) {
    let token = req.params.token;
    let decoded = verifyToken(token);
    req.decoded = decoded;
    next();
};

function kycAuthentication(req,res,next) {
    let userId = req.decoded.id;
    User.findOne({_id: userId})
        .then(function (user) {
            if(user) {
                req.kycId = user.kyc;
                next();
            }else {
                next({message: 'User not found'})
            }
        })
        .catch(next);
};

function kycAuthorization(req,res,next) {
    let kycId = req.kycId;
    let userId = req.decoded.id;
    kyc.findOne({_id: kycId})
        .then(function (kyc) {
            if (kyc) {
                if (kyc.user === userId) {
                    next();
                }
            }else{
                next({message: 'You dont authorize to do that'})
            }
        })
};

module.exports = {
    authentification,
    accountAuthorization,
    authenticationPassword,
    kycAuthentication,
    kycAuthorization
};