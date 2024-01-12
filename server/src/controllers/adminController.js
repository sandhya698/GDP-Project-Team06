module.exports.adminControls = async (req, res) => {
    const { user, type, status } = req.params;
    const userList = ['donor', 'patient'];
    const typeList = ['donate', 'request'];
    const statusList = ['accept', 'reject'];

    if (!userList.includes(user)) {
        return res.status(422).json({
            success: false,
            message: `Invalid user = ${user}`
        });
    }
    else if (!typeList.includes(type)) {
        return res.status(422).json({
            success: false,
            message: `Invalid request = ${type}`
        }) 
    }
    else if (!statusList.includes(status)) {
        return res.status(422).json({
            success: false,
            message: `Invalid status = ${status}`
        }) 
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


        res.status(200).json({
            success: true,
            message: `donor donation status = ${status}`,
            body: req.body
        });
};

const donorRequest = async (status, req, res) => {


    res.status(200).json({
        success: true,
        message: `donor request status = ${status}`,
        body: req.body
    });
};

const patientRequest = async (status, req, res) => {


    res.status(200).json({
        success: true,
        message: `patient request status = ${status}`,
        body: req.body
    });
};
