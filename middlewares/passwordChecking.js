function authenticatePassword(req,res,next) {

    console.log(req.params.token)
    res.send('Hallo')

};

module.exports = authenticatePassword;