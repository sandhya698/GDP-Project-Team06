const mongoose = require('mongoose');

/* By default mongoose with add 's' at the end of collection
 * to nullify that use pluralize as null */ 
mongoose.pluralize(null);

// defining schema for storing user collection
const patientRequestHistorySchema = mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
        enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'rejected']
    }, 
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    disease: String
}, { timeStamps: true });

// creating a model and exporting
const PatientRequestHistory = mongoose.model('PatientRequestHistory', patientRequestHistorySchema);
module.exports = PatientRequestHistory;