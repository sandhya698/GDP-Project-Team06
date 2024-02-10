const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const authenticate = async (req,res,next) => {
    try {
        
        // console.log('authenticating')
        // token = 'bloodToken' is stored in request
        const token = req.cookies.bloodToken;
        
        // verifying the token using the secret key
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        
        // verifing user with the token saved in cookie with our secret key
        const user = await Users.findOne({ _id: verifyUser._id, "tokens.token": token });

        if (!user) {
            throw new Error("User not authenticated");
        }

        req.token = token;
        req.userId = user._id;
        req.user = user;

        next();

    }
    catch (err) {
        // console.log(err);
        // console.log('user not found');
        res.status(401).json({
            message: "Unauthorized user",
            error: err.message,
            success: false
        });
    }
}

module.exports = authenticate;