const Inventory = require("../models/inventoryModel");
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ];

module.exports.manageStock = async (req, res) => {
    let { bloodGroup, quantity, type } = req.body;

    if (!bloodGroup || !quantity ) {
        return res.status(422).json({ message: "Every field must be filled" });
    }
    if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({
            message: `Blood groups allowed are ${bloodGroups}`,
            success: false
        });
    }

    try {

        let updatedInventory = {};
        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity } };
        const updateInit = { $setOnInsert: { bloodGroup, quantity } };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        if (type === "in") {
            updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
        
            // If the increment didn't find a matching document, create one with the specified initial value
            if (!updatedInventory) {
                updatedInventory = await Inventory.findOneAndUpdate(filter, updateInit, options);
            }
        }
        else if (type === "out") {
            updateQuanity = { $inc: { quantity: quantity * -1 } }

            // Retrieve the current document to check the current "quantity" value
            const currentDoc = await Inventory.findOne(filter);

            if (currentDoc && currentDoc.quantity >= quantity) {
                updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
            }
            else {
                throw new Error(`Requested ${quantity} units are not avilable`);
            }
        }

        res.status(201).json({
            message: 'Inventory Updated',
            success: true,
            updatedInventory
        });

    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to update inventory',
            error: error.message
        });
    }
}


module.exports.getStock = async (req, res) => {
    const group = req.query.group || '';

    // Throw error if group is not empty and not valid blood group
    if (group && !bloodGroups.includes(group)) {
        return res.status(422).json({
            message: `Blood groups allowed are ${bloodGroups}`,
            success: false
        });
    }

    try {

        let inventory = {}
        
        if (group) {
            inventory = await Inventory.findOne({ bloodGroup: group });
        } 
        else {
            inventory = await Inventory.find();
        }
        
        res.status(201).json({
            message: 'Fetched stock details from Inventory',
            success: true,
            inventory
        });
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to query stock',
            error: error.message
        });
    }
}