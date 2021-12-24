const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const active = Joi.boolean();
const lastLogin = Joi.date();
const role = Joi.number().integer();

const createValidator = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateValidator = Joi.object({
  email: email,
  password: password,
  role: role,
  active: active,
  lastLogin: lastLogin,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 