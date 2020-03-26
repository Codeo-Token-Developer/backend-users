const express = require("express");
const Router = express.Router();
const { authentification } = require("../middlewares/tokenChecking");

// Require the controllers
const AccountController = require("../controllers/logHistory");

// create a new accounts
Router.post("/add", authentification, AccountController.addHistory);
Router.get("/", AccountController.readAll);
Router.get("/myhistory", authentification, AccountController.readOne);

module.exports = Router;
