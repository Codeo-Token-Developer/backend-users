const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');

const { authenticationPassword } = require('../middlewares/tokenChecking');

function check(req,res,next) {
    console.log(req.params.userId);
    next();
};

Router.get('/:userId', check,authenticationPassword, UserController.updateNewPassword);

module.exports = Router;