const express = require("express");
const Router = express.Router();
const { authentification } = require("../middlewares/tokenChecking");

// Require the controllers
const { logHistory } = require('../controllers/userController')

const history = require('../models/logHistory');

// create a new accounts
Router.post("/", authentification, logHistory);
// Router.get("/", AccountController.readAll);
// Router.get("/myLogHistory", authentification, function (req,res,next) {
//     let user = req.decoded.id;
//     history.find({user})
//         .then(function (myHistorys) {
//             res.status(200).json(myHistorys)
//         })
//         .catch(next);
// });

module.exports = Router;
