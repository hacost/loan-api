const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const walletId = Joi.number().integer();

const active = Joi.boolean();
// data user
const email = Joi.string().email();
const password = Joi.string().min(8);
const userId = Joi.number().integer();
const roleId = Joi.number().integer();

const createValidator = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  walletId: walletId.required(),

  // to create money collector and user
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    roleId: roleId.required()
  })
});

const updateValidator = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  active: active,
  walletId: walletId,
  userId: userId,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 