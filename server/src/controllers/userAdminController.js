const Users = require("../models/userModel");

// user status update route
module.exports.statusUpdate = async (req,res) => {
    const { status, id } = req.params;
    try {
        const updatedUser = await Users.findOneAndUpdate({ _id: id }, { status });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        res.status(200).json({
            success: true,
            message: `User status updated to ${status}`
        })
    }
    catch (error) {
        res.status(422).json({
            message: 'Failed to update user status',
            error: err.message
        });
    }
}