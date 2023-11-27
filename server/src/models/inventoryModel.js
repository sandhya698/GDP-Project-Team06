const mongoose = require('mongoose');

/* By default mongoose with add 's' at the end of collection
 * to nullify that use pluralize as null */ 
mongoose.pluralize(null);

// defining schema for storing user collection
const inventorySchema = mongoose.Schema({
    bloodGroup: {
        type: String,
        required: true,
        enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
        type: Number,
        require: true,
    },
}, { timeStamps: true });

// creating a model and exporting
const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = Inventory;