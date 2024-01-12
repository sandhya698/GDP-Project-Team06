const DonorRequestHistory = require("../models/donorRequestModel");
const Inventory = require("../models/inventoryModel");

module.exports.adminControls = async (req, res) => {
    const { user, type, status } = req.params;
    
    // validation
    const paramValidationError = paramsValidation(user, type, status);
    if (paramValidationError) {
        return res.status(422).json({
            success: false,
            message: paramValidationError
        });
    }
    
    try {
        if (user === 'donor') {
            if (type === 'donate') {
                await donorDonation(status, req, res);
            } 
            else if (type === 'request') {
                await donorRequest(status, req, res);
            }
        }
        else if (user === 'patient') {
            if (type === 'request') {
                await patientRequest(status, req, res);
            }
        }
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Error occured',
            error: error.message
        });
    }
}

const donorDonation = async (status, req, res) => {
    const { bloodGroup, quantity, histRecId } = body;
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    
    if (!bloodGroup || !quantity || !histRecId) {
        return res.status(422).json({
            success: false,
            message: `Request body doesn't contain requried information`
        }) ;
    }
    if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({
            success: false,
            message: `Invalid blood group ${bloodGroup}`
        }) ;
    }

    try {

        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity } };
        const updateInit = { $setOnInsert: { bloodGroup, quantity } };
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        if (status === 'accept') {
            const updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
            
            // If the increment didn't find a matching document, create one with the specified initial value
            if (!updatedInventory) {
                updatedInventory = await Inventory.findOneAndUpdate(filter, updateInit, options);
            }

            const donorHistRec = await DonorRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'accepted' }, options);

            return res.status(200).json({
                success: true,
                message: `donor donation status = ${status}`,
                body: {updatedInventory, donorHistRec}
            });
        }
        else if (status === 'reject') {
            const donorHistRec = await DonorRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'accepted' }, options);
            return res.status(200).json({
                success: true,
                message: `donor donation status = ${status}`,
                donorHistRec
            });
        } 
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to accept donation request',
            error: error.message
        });
    }

};

const donorRequest = async (status, req, res) => {
    const { bloodGroup, quantity, histRecId } = body;
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    
    if (!bloodGroup || !quantity || !histRecId) {
        return res.status(422).json({
            success: false,
            message: `Request body doesn't contain requried information`
        }) ;
    }
    if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({
            success: false,
            message: `Invalid blood group ${bloodGroup}`
        }) ;
    }

    res.status(200).json({
        success: true,
        message: `donor request status = ${status}`,
        body: req.body
    });
};

const patientRequest = async (status, req, res) => {
    const { bloodGroup, quantity, histRecId } = body;
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    
    if (!bloodGroup || !quantity || !histRecId) {
        return res.status(422).json({
            success: false,
            message: `Request body doesn't contain requried information`
        }) ;
    }
    if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({
            success: false,
            message: `Invalid blood group ${bloodGroup}`
        }) ;
    }

    res.status(200).json({
        success: true,
        message: `patient request status = ${status}`,
        body: req.body
    });
};

const paramsValidation = (user, type, status) => {
    const userList = ['donor', 'patient'];
    const typeList = ['donate', 'request'];
    const statusList = ['accept', 'reject'];

    if (!userList.includes(user)) {
        return `Invalid user = ${user}`
    }
    else if (!typeList.includes(type)) {
        return `Invalid request = ${type}`
    }
    else if (!statusList.includes(status)) {
        return `Invalid status = ${status}`
    }
}