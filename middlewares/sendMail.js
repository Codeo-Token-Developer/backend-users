const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { generateToken } = require('../helpers/jwt');

function sendEmail(req,res,next) {
    let token = generateToken(req.payload);
    let user = req.payload;
    let link = `http://${req.headers.host}/api/auth/verify/${token}`;
    const mailOptions = {
        to: user.email,
        from: process.env.FROM_EMAIL,
        subject: 'Account Verification',
        text: `Hi ${user.name} \n
        Please click on the following link ${link} to verify your account. \n\n 
        If you did not request this, please ignore this email.\n`
    };

    sgMail.send(mailOptions, (error, result) => {
        if (error) {
            res.status(500).json({message: error.message, status})
        }else {
            res.status(200).json({message: 'A verification email has been sent to ' + user.email, status: 200})
        };
    });
};

module.exports = sendEmail;