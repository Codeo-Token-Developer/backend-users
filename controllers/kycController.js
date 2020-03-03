const KYC = require('../models/kyc');
const User = require('../models/user');


class KycController {

    static create(req,res,next) {

        let userId = req.decoded.id;

        let { 
            id_number,
            document_type,
            country_issued,
            document_image,
            home_address,
            city,
            zip_code,
            phone_number1,
            phone_number2,
         } = req.body;

        KYC.create({
            id_number,
            document_type,
            country_issued,
            document_image,
            home_address,
            city,
            zip_code,
            phone_number1,
            phone_number2,
            user: userId
        })
        .then(function (kyc) {
            let kycId = kyc.id;
            return User.updateOne({_id: userId}, {kyc: kycId})
                .then(function() {
                    res.status(202).json({message: 'Your KYC Data has been added', status: 202})
                })
        })
        .catch(next);
    };

    static updateKyc(req,res,next) {

        let kycId = req.kycId;

        let { id_number,
            document_type,
            country_issued,
            document_image,
            home_address,
            city,
            zip_code,
            phone_number1,
            phone_number2
        } = req.body;

        KYC.updateOne({_id: kycId}, {
            id_number,
            document_type,
            country_issued,
            document_image,
            home_address,
            city,
            zip_code,
            phone_number1,
            phone_number2
        }, {omitUndefined: true})
            .then(function () {   
                res.status(201).json({message: 'Your data has been updated', status: 201})
            })
            .catch(next)


    };



};

module.exports = KycController;