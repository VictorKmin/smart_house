const Joi = require('joi');

module.exports = Joi.object().keys({
    room_id: Joi.string().alphanum().min(2).max(255).required(),
    temperature: Joi.required()
    // TODO
});
