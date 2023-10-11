// register route
module.exports.register = (req, res) => {
    res.status(200).send('<h1>registration page</h1>');
}

// login route
module.exports.login = (req,res) => {
    res.status(200).send('<h1>login page</h1>');
}