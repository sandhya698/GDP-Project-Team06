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

module.exports.getRequestsHistory = async (req, res) => {
    const userId = req.params.id;

    try {
        let tempRequestsList = await RequestHistory.find({ type: 'request', user: userId }).populate({
            path: 'user',
            select: 'name', 
        });
        
        const requestsList = tempRequestsList.map((request) => ({
            _id: request._id,
            name: request.user.name,
            disease: request.disease,
            bloodGroup: request.bloodGroup,
            quantity: request.quantity,
            updatedAt: request.updatedAt,
            status: request.status
        }));
  
        res.status(200).json({
            message: 'Requests list fetched succesfully',
            success: true,
            requestsList
        });
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to fetch requests list',
            success: false,
            error: error.message
        });
    }
}

module.exports.getDonationsHistory = async (req,res) => {
    const userId = req.params.id;
    
    try {
        const donationsList = await RequestHistory.find({ type: 'donate', user: userId }).populate({
            path: 'user',
            select: 'name',
        });
        
        const fomattedDonationsList = donationsList.map((donation) => ({
            _id: donation._id,
            name: donation.user.name,
            bloodGroup: donation.bloodGroup,
            quantity: donation.quantity,
            status: donation.status,
            disease: donation.disease,
            updatedAt: donation.updatedAt
        }));
  
        res.status(200).json({
            message: 'Donations list fetched succesfully',
            success: true,
            donationsList: fomattedDonationsList
        });
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to fetch donations list',
            success: false,
            error: error.message
        });
    }
}