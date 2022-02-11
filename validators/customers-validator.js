const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const active = Joi.boolean();

// data user
const email = Joi.string().email();
const password = Joi.string().min(8);
const roleId = Joi.number().integer();
const userId = Joi.number().integer();
// pagination 
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createValidator = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  // to create customer and user
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
  userId: userId,
});

const getValidator = Joi.object({
  id: id.required(),
});

const queryParamsValidator = Joi.object({
  limit,
  offset
})


module.exports = {createValidator, updateValidator, getValidator, queryParamsValidator}; 