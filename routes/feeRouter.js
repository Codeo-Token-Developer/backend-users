const express = require('express');
const Router = express.Router();
const Fee = require('../models/fee');


Router.get('/', (req,res,next) => {
    Fee.find({})
        .then(function (fee) {
            let currentFee = fee[0]
            res.status(200).json({currentFee, status: 200})
        })
        .catch(next)
})

module.exports = Router;