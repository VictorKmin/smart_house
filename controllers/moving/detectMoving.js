const Joi = require('joi');

const {movingService, constantService, telegramService} = require('../../service');
const {HOUSE} = require('../../constants');
const {movingValidator} = require('../../validators');

module.exports = async (req, res) => {
    try {
        const movingObject = req.body;
        const movingValidiry = Joi.validate(movingObject, movingValidator);

        if (movingValidiry.error) {
            console.error(movingValidiry.error.details[0].message);
            return
        }

        const is_detect = await constantService.getConstantByLabel(HOUSE.IS_DETECT_MOVING);

        if (is_detect.value) {
            console.info('TELEGRAM MESSAGE');
            telegramService.sendMessage() // TODO
        }

        await movingService.create(movingObject);

        res.json('OK')
    } catch (e) {
        console.error(e.message)
    }
}
