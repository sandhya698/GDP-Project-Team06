const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');

// register route
module.exports.register = async (req, res) => {
    // object destructuring
    const { name, email, password, cpassword, userType } = req.body;

    // basic validation
    if (!name || !email || !password || !cpassword || !userType) {
        return res.status(422).json({
            message: "Every field must be filled", success: false
        });
    }
    else if (password !== cpassword) {
        return res.status(422).json({
            message: "password and confirm password must be same", success: false
        });
    }

    try {
        // Find a user by email if exists throw error
        const duplicateUser = await Users.findOne({ email });
        if (duplicateUser) {
            return res.status(406).json({
                message: 'A user already exists with same email',
                error: duplicateUser,
                success: false``
            });
        }

        const user = new Users({ name, email, password, cpassword, userType });
        const registerdUser = await user.save();

        res.status(201).json({
            message: 'User registered',
            data: registerdUser,
            success: true
        });
    }
    catch (err) {
        if (err.name === "MongoError" || err.name === "MongoServerError") {
            // MongoDB-related error
            console.log("MongoDB Error:", err.message);
            res.status(422).json({
                message: 'Error occured while registering',
                success: false,
                error: err.message
            });
        } else {
            // Other types of errors
            console.log("Generic Error:", err);
            res.status(422).json({
                message: 'unknown error',
                success: false,
                error: err
            });
        }
    }
}

// login route
module.exports.login = async (req, res) => {
    // object destructuring
    const { email, password } = req.body;

    // validation
    if (!email || !password ) {
        return res.status(422).json({
            message: "email and password are required", success: false
        });
    }

    try {
        const loginUser = await Users.findOne({ email });
        if (loginUser) {
            // comparing user password with hashed password
            // returns true if both hash values are matched
            const hashOk = await bcrypt.compare(password, loginUser.password);

            if (!hashOk) {
                return res.status(401).json({
                    message: "Invalid Credentials.", success: false
                });
            }

            const token = await loginUser.generateJsonWebToken();
            
            const twelveHours = 12 * 60 * 60 * 1000; // Convert 12 hours to milliseconds
            const expirationDate = new Date(Date.now() + twelveHours);

            res.cookie('bloodToken', token, {
                expires: expirationDate,
                httpOnly: true
            });

            res.status(200).json({
                message: "Login success", success: true
            });
        }
        else {
            return res.status(401).json({
                message: "Invalid Credentials.", success: false
            });
        }

    }
    catch (err) {
        res.status(422).json({
            message: 'unknown error',
            success: false,
            error: err.message
        });
    }
}

// authnetication route
module.exports.auth = (req,res) => {
    res.status(200).json({
        message: "user logged in",
        user: req.user,
        success: true
    });
}

// logout route
module.exports.logout = async (req,res) => {
    try {
        // console.log('logging out from all devices');
        const userId = req.params.id;
        const user = await Users.findOneAndUpdate({ _id: userId }, {
            tokens: []
        })
        res.clearCookie('bloodToken', { path: '/' });
        res.status(200).json({
            message: 'user logged out', success: true
        });
    }
    catch (err) {
        // console.log(err);
        res.status(422).json({
            message: 'Logout failed!!',
            success: false,
            error: err.message
        });
    }
}