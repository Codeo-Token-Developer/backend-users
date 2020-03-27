const Loghistory = require("../models/logHistory");
const User = require("../models/user");

class LogHistory {
  static async addHistory(req, res, next) {
    let userId = req.decoded.id;
    return Loghistory.create({ history: req.body.history })
      .then(function(loghistory) {
        User.findOneAndUpdate(
          { _id: userId },
          { $push: { loghistory: Loghistory._id } },
          { new: true }
        ).then(function() {
          res.status(202).json({
            message: "history has been add",
            Loghistory,
            status: 202
          });
        });
      })
      .catch(next);
  }


  

  static readAll(req, res, next) {
    Loghistory.find({})
      .then(function(loghistory) {
        res.status(200).json(loghistory);
      })
      .catch(next);
  }

  static readOne(req, res, next) {
    let userId = req.decoded.id;
    Loghistory.findOne({ user: userId })
      .then(function(loghistory) {
        res.status(200).json({ loghistory, status: 200 });
      })
      .catch(next);
  }
}

module.exports = LogHistory;
