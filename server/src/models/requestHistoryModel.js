const mongoose = require('mongoose');

/* By default mongoose with add 's' at the end of collection
 * to nullify that use pluralize as null */ 
mongoose.pluralize(null);

const requestHistorySchema = mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
        enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['donate', 'request']
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    userType: {
        type: String,
        enum: ['admin', 'donor', 'patient'],
        required: true
    },
    disease: String
}, { timestamps: true });

const RequestHistory = mongoose.model('RequestHistory', requestHistorySchema);
module.exports = RequestHistory;