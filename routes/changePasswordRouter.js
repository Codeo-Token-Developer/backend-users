const express = require('express');
Router = express.Router();
const UserController = require('../controllers/userController');
const User = require('../models/user');

function getUserId(req,res,next) {
    User.findOne({_id: req.params.id})
        .then(function(user) {
            res.status(200).json(user)

            res.send('Hallo')
        })
        .catch(next)
};

Router.post('/:token',getUserId,UserController.replacePassword);

module.exports = Router;