const {movingService} = require('../../service')

module.exports = async (req, res) => {
    try {

        // TODO validators
        // TODO constants table where will be stored all constants like is_detect_moving

        const movingObject = req.body;

       await movingService.create(movingObject);
       // TODO if is_detect_moving === true -> send message to telegram

        res.json('OK')
    } catch (e) {
        console.error(e.message)
    }
}
