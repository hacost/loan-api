const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const active = Joi.boolean();

const createValidator = Joi.object({
  name: name.required(),
});

const updateValidator = Joi.object({
  name: name,
  active: active,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 