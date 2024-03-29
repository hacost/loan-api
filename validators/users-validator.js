const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const active = Joi.boolean();
const lastLogin = Joi.date();
const roleId = Joi.number().integer();

const createValidator = Joi.object({
  email: email.required(),
  password: password.required(),
  roleId: roleId.required()
});

const updateValidator = Joi.object({
  email: email,
  password: password,
  roleId: roleId,
  active: active,
  lastLogin: lastLogin,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 