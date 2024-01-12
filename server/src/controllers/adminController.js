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

        res.status(200).json({
            success: true,
            message: `donor donation status = ${status}`,
            body: req.body
        });
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