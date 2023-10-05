const Joi = require("joi");

const messageSchema = Joi.object({
  text: Joi.string().required(),
});

module.exports = messageSchema;