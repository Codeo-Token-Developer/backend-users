const CredirCard = require('../models/creditCard');

class CreditCardController {

    static readAll(req,res,next) {
        CreditCard.find({})
            .then(function(cards) {
                res.status(200).json({cards, status: 200});
            })
            .catch(next);
    };

    static create(req,res,next) {
        let { name, surname, card_name, exp_date, cvc,card_number } = req.body;
        let userId = req.decoded.id;
        CredirCard.findOne({user: userId})
            .then(function (credit) {
                if (credit) {
                    next({message: 'You already have registered your credit card, '})
                }else {
                    return CredirCard.create({name, surname, card_name, exp_date, cvc, card_number})
                        .then(function (card) {
                            res.status(202).json({message: 'Waiting for admin approval', status: 202})
                        })  
                }
            })
            .catch(next); 
   
    };

    static update(req,res,next) {

    };

};

module.exports = CreditCardController;