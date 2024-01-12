const Inventory = require("../models/inventoryModel");

module.exports.addStock = async (bloodGroup, quantity) => {
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

        return updatedInventory;
    }
    catch (error) {
        throw new Error(`Failed to update inventory`);
    }
   
}

module.exports.subtractStock = async (bloodGroup, quantity) => {
    try {

        let updatedInventory = {};
        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity: quantity * -1 } }
        const options = { new: true };

        // Retrieve the current document to check the current "quantity" value
        const currentDoc = await Inventory.findOne(filter);

        if (currentDoc && currentDoc.quantity >= quantity) {
            updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
        }
        else {
            throw new Error(`Requested ${quantity} units are not avilable`);
        }

        return updatedInventory;
    }
    catch (error) {
        throw new Error(`Failed to update inventory`);
    }
   
}