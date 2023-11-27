const mongoose = require('mongoose');

/* By default mongoose with add 's' at the end of collection
 * to nullify that use pluralize as null */ 
mongoose.pluralize(null);

// defining schema for storing user collection
const donorRequestHistorySchema = mongoose.Schema({
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
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    disease: String
}, { timeStamps: true });

// creating a model and exporting
const DonorRequestHistory = mongoose.model('DonorRequestHistory', donorRequestHistorySchema);
module.exports = DonorRequestHistory;