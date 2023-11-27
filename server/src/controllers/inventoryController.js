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

        const filter = { bloodGroup };
        const updateQuanity = { $inc: { quantity } }
        const options = { new: true };

        let  updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);

        res.status(201).json({
            message: 'Inventory Updated',
            success: true,
            updatedInventory
        });

    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Error in updating inventory',
            error
        });
    }
}