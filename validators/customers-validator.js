const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const email = Joi.string().email();
const password = Joi.string().min(8);
const roleId = Joi.number().integer();
const userId = Joi.number().integer();

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
  userId: userId,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 