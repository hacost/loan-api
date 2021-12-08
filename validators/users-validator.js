const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(4);

const createValidator = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateValidator = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 