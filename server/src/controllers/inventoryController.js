const Inventory = require("../models/inventoryModel");

module.exports.addStock = async (req, res) => {
    const { bloodGroup, quantity } = req.body;

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