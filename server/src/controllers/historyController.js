const DonorRequestHistory = require("../models/donorRequestModel");

module.exports.donorRequest = async (req, res) => {
    const { bloodGroup, quantity, userId, disease } = req.body;
    const type = req.params.type;

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
        res.status(422).json({
            success: false,
            message,
            error: error.message
        });
    }
}