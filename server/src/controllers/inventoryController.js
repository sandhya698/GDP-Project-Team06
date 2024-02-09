const DonorRequestHistory = require("../models/donorRequestModel");
const Inventory = require("../models/inventoryModel");
const PatientRequestHistory = require("../models/patientRequestModel");
const Users = require("../models/userModel");
const { addStock, subtractStock } = require("../utils/inventoryOperations");

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-" ];

module.exports.manageStock = async (req, res) => {
    let { bloodGroup, quantity } = req.body;
    const type = req.params.type;
    
    if (!['in','out'].includes(type)) {
        return res.status(422).json({
            message: `Invalid type ${type}`,
            success: false
        });
    }
    if (!bloodGroup || !quantity) {
        return res.status(422).json({
            message: "Every field must be filled",
            success: false
        });
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

module.exports.miscStats = async (req,res) => {
    const miscStats = {}
    const group = {
        _id: null,
        totalQuantity: { $sum: '$quantity' }
    };

    try {
        
        const donors = await Users.find({ userType: 'donor' }).countDocuments();
        const patients = await Users.find({ userType: 'patient' }).countDocuments();
        const donorAccepted = await DonorRequestHistory.aggregate([
            {
                $match: { $and: [{ status: "accepted" }, { type: "request" }] }
            },
            {
                $group: group
            }
        ]);

        const patientAccepted = await PatientRequestHistory.aggregate([
            {
              $match: { status: 'accepted' }
            },
            {
              $group: group
            }
        ]);

        const donorRejected = await DonorRequestHistory.aggregate([
            {
                $match: { $and: [{ status: "rejected" }, { type: "request" }] }
            },
            {
                $group: group
            }
        ]);

        const patientRejected = await PatientRequestHistory.aggregate([
            {
                $match: { status: "rejected" }
            },
            {
                $group: group
            }
        ]);

        const bloodStock = await Inventory.aggregate([{ $group: group }]);

        miscStats.donors = donors;
        miscStats.patients = patients;
        miscStats.accepted = (donorAccepted[0]?.totalQuantity ?? 0) + (patientAccepted[0]?.totalQuantity ?? 0);
        miscStats.rejected = (donorRejected[0]?.totalQuantity ?? 0) + (patientRejected[0]?.totalQuantity ?? 0);
        miscStats.totalBlood = bloodStock[0]?.totalQuantity ?? 0;

        res.status(200).json({
            success: true,
            message: 'fetched misc stats successfully',
            miscStats
        });
    }
    catch (error) {
        res.status(422).json({
            success: false,
            message: 'Failed to get misc stats',
            error: error.message
        });
    }
}