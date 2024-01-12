module.exports.adminControls = async (req, res) => {
    const { user, type, status } = req.params;

    try {
        if (user === 'donor') {
            if (type === 'donate') {
                console.log(`In ${user} and ${type}`);
            } 
            else if (type === 'request') {
                console.log(`In ${user} and ${type}`);
            }
        }
        else if (user === 'patient') {
            if (type === 'request') {
                console.log(`In ${user} and ${type}`);
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