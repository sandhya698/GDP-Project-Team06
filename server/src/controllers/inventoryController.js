const Inventory = require("../models/inventoryModel");
const { addStock, subtractStock } = require("../utils/inventoryOperations");
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ];

module.exports.manageStock = async (req, res) => {
    let { bloodGroup, quantity } = req.body;
    const type = req.params.type;

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

        if (type === "in") {
            updatedInventory = await addStock(bloodGroup, quantity);
        }
        else if (type === "out") {
            updatedInventory = await subtractStock(bloodGroup, quantity);
        }
        else {
            throw new Error(`Invalid operation ${type}`);
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
            message: error.message,
            error: error
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