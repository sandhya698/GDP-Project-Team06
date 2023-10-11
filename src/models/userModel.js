const mongoose = require('mongoose');

/* By default mongoose with add 's' at the end of collection
 * to nullify that use pluralize as null */ 
mongoose.pluralize(null);

// defining schema for storing user collection
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    cpassword: {
        type: String,
        require: true,
        unique: true
    },
    userType: {
        type: String,
        require: true
    },
    registerDate: {
        type: Date,
        default: Date.now()
    },
    lastLogin: {
        type: Date,
    }
});

// creating a model and exporting
const Users = mongoose.model('Users', userSchema);
module.exports = Users;