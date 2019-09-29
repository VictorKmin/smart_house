const {movingService, constantService} = require('../../service');
const {HOUSE} = require('../../constants');

module.exports = async (req, res) => {
    try {
        const movingObject = req.body;         // TODO validators

        const is_detect = await constantService.getConstantByLabel(HOUSE.IS_DETECT_MOVING);

        if (is_detect.value) {
            // TODO if is_detect_moving === true -> send message to telegram
            console.info('TELEGRAM MESSAGE')
        }

        await movingService.create(movingObject);

        res.json('OK')
    } catch (e) {
        console.error(e.message)
    }
}
