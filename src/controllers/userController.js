const Users = require('../models/userModel');

// register route
module.exports.register = async (req, res) => {
    // object destructuring
    const { name, email, phone, password, cpassword, userType } = req.body;

    // basic validation
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ message: "Every field must be filled" });
    }
    else if (password !== cpassword) {
        return res.status(422).json({ message: "password and confirm password must be same" });
    }

    try {
        // Find a user by email if exists throw error
        const duplicateUser = await Users.findOne({ email });
        if (duplicateUser) {
            return res.status(406).json({ message: 'A user already exists with same email', error: duplicateUser });
        }

        const user = new Users({ name, email, phone, password, cpassword, userType });
        const registerdUser = await user.save();

        res.status(201).json({ message: 'User registered', data: registerdUser });
    }
    catch (err) {
        if (err.name === "MongoError" || err.name === "MongoServerError") {
            // MongoDB-related error
            console.log("MongoDB Error:", err.message);
            res.status(422).json({
                message: 'Error occured while registering',
                error: err.message
            });
        } else {
            // Other types of errors
            console.log("Generic Error:", err);
            res.status(422).json({
                message: 'unknown error',
                error: err
            });
        }
    }
}

// login route
module.exports.login = (req,res) => {
    res.status(200).send('<h1>login page</h1>');
}
