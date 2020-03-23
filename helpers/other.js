function referralGenerator(username) {
    let check = true;
    let reff = ''
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            check = false;
        };
        if (check) {
            reff += email[i]
        };
    }
    return reff
};

module.exports = { referralGenerator }