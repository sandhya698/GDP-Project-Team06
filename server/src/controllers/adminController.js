const DonorRequestHistory = require("../models/donorRequestModel");
const Inventory = require("../models/inventoryModel");
const PatientRequestHistory = require("../models/patientRequestModel");

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

    const bodyValidationError = bodyValidation(req.body);
    if (bodyValidationError){
        return res.status(422).json({
            status: false,
            message: bodyValidationError
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

    const { bloodGroup, quantity, histRecId } = req.body;

    try {

        let updatedInventory = {};
        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity } };
        const updateInit = { $setOnInsert: { bloodGroup, quantity } };
        const options = { new: true };
        let donorHistRec = {};
        let message = '';
        let body = {};

        if (status === 'accept') {
            updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
        
            // If the increment didn't find a matching document, create one with the specified initial value
            if (!updatedInventory) {
                updatedInventory = await Inventory.findOneAndUpdate(filter, updateInit, options);
            }

            donorHistRec = await DonorRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'accepted' }, options);
            message = 'Donor donation accepted';
            body['updatedInventory'] = updatedInventory;
            body['donorHistRec'] = donorHistRec;
        }
        else if (status === 'reject') {
            donorHistRec = await DonorRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'rejected' }, options);

            message = 'Donor donation rejected';
            body['donorHistRec'] = donorHistRec;
        } 

        res.status(200).json({
            success: true,
            message,
            body
        });
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

    const { bloodGroup, quantity, histRecId } = req.body;
    
    try {

        let updatedInventory = {};
        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity } };
        const options = { new: true };
        let donorHistRec = {};
        let message = '';
        let body = {};

        if (status === 'accept') {
            updateQuanity = { $inc: { quantity: quantity * -1 } }

            // Retrieve the current document to check the current "quantity" value
            const currentDoc = await Inventory.findOne(filter);

            if (currentDoc && currentDoc.quantity >= quantity) {
                updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
            }
            else {
                throw new Error(`Requested ${quantity} units are not avilable`);
            }

            donorHistRec = await DonorRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'accepted' }, options);
            message = 'Donor request accepted';
            body['updatedInventory'] = updatedInventory;
            body['donorHistRec'] = donorHistRec;
        }
        else if (status === 'reject') {
            donorHistRec = await DonorRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'rejected' }, options);

            message = 'Donor request rejected';
            body['donorHistRec'] = donorHistRec;
        } 

        res.status(200).json({
            success: true,
            message,
            body
        });
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to accept donor request',
            error: error.message
        });
    }
};

const patientRequest = async (status, req, res) => {

    const { bloodGroup, quantity, histRecId } = req.body;

    try {

        let updatedInventory = {};
        const filter = { bloodGroup };
        let updateQuanity = { $inc: { quantity } };
        const options = { new: true };
        let patientHistRec = {};
        let message = '';
        let body = {};

        if (status === 'accept') {
            updateQuanity = { $inc: { quantity: quantity * -1 } }

            // Retrieve the current document to check the current "quantity" value
            const currentDoc = await Inventory.findOne(filter);

            if (currentDoc && currentDoc.quantity >= quantity) {
                updatedInventory = await Inventory.findOneAndUpdate(filter, updateQuanity, options);
            }
            else {
                throw new Error(`Requested ${quantity} units are not avilable`);
            }

            patientHistRec = await PatientRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'accepted' }, options);
            message = 'Patient request accepted';
            body['updatedInventory'] = updatedInventory;
            body['patientHistRec'] = patientHistRec;
        }
        else if (status === 'reject') {
            patientHistRec = await PatientRequestHistory.findOneAndUpdate({ _id: histRecId }, { status: 'rejected' }, options);

            message = 'Patient reject rejected';
            body['patientHistRec'] = patientHistRec;
        } 

        res.status(200).json({
            success: true,
            message,
            body
        });
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to accept donor request',
            error: error.message
        });
    }
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

const bodyValidation = (body) => {
    const { bloodGroup, quantity, histRecId } = body;
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    
    if (!bloodGroup || !quantity || !histRecId) {
        return `Request body doesn't contain requried information`;
    }
    if (!bloodGroups.includes(bloodGroup)) {
        return `Invalid blood group ${bloodGroup}`;
    }
}