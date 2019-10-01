const Joi = require('joi');

module.exports = Joi.object().keys({
    label: Joi.string().alphanum().min(2).max(255).required(),
    value: Joi.required()
});
