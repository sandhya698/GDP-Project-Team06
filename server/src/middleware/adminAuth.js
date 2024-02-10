const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

const adminAuth = async (req,res,next) => {
    try {
        
        // token = 'bloodToken' is stored in request
        const token = req.cookies.bloodToken;
        
        // verifying the token using the secret key
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        
        // verifing user with the token saved in cookie with our secret key
        const user = await Users.findOne({ _id: verifyUser._id, "tokens.token": token });

        if (!user) {
            throw new Error("User not authenticated");
        }

        if (user.userType !== 'admin') {
            throw new Error("You are not an Admin");
        }

        req.token = token;
        req.userId = user._id;
        req.user = user;

        next();

    }
    catch (err) {
        // console.log(err);
        res.status(401).json({
            message: err.message,
            error: err,
            success: false
        });
    }
}

module.exports = adminAuth;