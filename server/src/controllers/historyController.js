const DonorRequestHistory = require("../models/donorRequestModel");
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const typeList = ["donate", "request"];

module.exports.donorRequest = async (req, res) => {
    const { bloodGroup, quantity, userId, disease } = req.body;
    const type = req.params.type;

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
        const donorHistRec = new DonorRequestHistory({ bloodGroup, quantity, type, disease, status: 'pending', donor: userId });
        const donorRequestHistRec = await donorHistRec.save();
        res.status(201).json({
            success: true,
            message: 'Requested created successfully',
            result: donorRequestHistRec 
        });
    }
    catch (error) {
        let message = ''
        if (type === 'donate') {
            message = 'Failed to make blood donation'
        }
        else if (type === 'request') {
            message = 'Failed to reqest a blood donor'
        }
        res.status(422).json({
            success: false,
            message,
            error: error.message
        });
    }
}