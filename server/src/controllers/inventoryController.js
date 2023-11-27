const Inventory = require("../models/inventoryModel");

module.exports.addStock = async (req, res) => {
    let { bloodGroup, quantity, type } = req.body;

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ];

    if (!bloodGroup || !quantity ) {
        return res.status(422).json({ message: "Every field must be filled" });
    }
    if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({ message: `Blood groups allowed are ${bloodGroups}` });
    }

    try {

        let updatedInventory = {};
        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity } };
        const updateInit = { $setOnInsert: { bloodGroup, quantity } };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
    
        // If the increment didn't find a matching document, create one with the specified initial value
        if (!updatedInventory) {
            updatedInventory = await Inventory.findOneAndUpdate(filter, updateInit, options);
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