const RequestHistory = require("../models/requestHistoryModel");
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const typeList = ["donate", "request"];

module.exports.donorRequest = async (req, res) => {
    const { bloodGroup, quantity, userId, disease } = req.body;
    const type = req.params.type;

    const userType = 'donor', status = 'pending';

    // some validations
    if (!typeList.includes(type)) {
        return res.status(422).json({
            success: false,
            message: `Invalid request = ${type}`
        });
    }
    else if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({
            success: false,
            message: `Invalid blood group ${bloodGroup}`
        });
    }

    try {

        const donorHistRec = new RequestHistory({ bloodGroup, quantity, type, disease, status, user: userId, userType });
        const donorRequestHistRec = await donorHistRec.save();
        await donorRequestHistRec.populate({
            path: 'user',
            select: 'name', 
        });
        res.status(201).json({
            success: true,
            message: 'Requested created successfully',
            result: donorRequestHistRec._id 
        });
    }
    catch (error) {
        let message = ''
        if (type === 'donate') {
            message = 'Failed to make blood donation'
        }
        else if (type === 'request') {
            message = 'Failed to make a blood request'
        }
        res.status(422).json({
            success: false,
            message,
            error: error.message
        });
    }
}

module.exports.patientRequest = async (req, res) => {
    const { bloodGroup, quantity, userId, disease } = req.body;

    const type = 'request', userType = 'patient', status = 'pending';

    // some validations
    if (!bloodGroups.includes(bloodGroup)) {
        return res.status(422).json({
            success: false,
            message: `Invalid blood group ${bloodGroup}`
        });
    }

    try {

        const patientHistRec = new RequestHistory({ bloodGroup, quantity, disease, type, status, user: userId, userType });
        const patientRequestHistRec = await patientHistRec.save();
        await patientRequestHistRec.populate({
            path: 'user',
            select: 'name', 
        });
        res.status(201).json({
            success: true,
            message: 'Requested created successfully',
            result: patientRequestHistRec._id
        });
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to make a blood request',
            error: error.message
        });
    }
}