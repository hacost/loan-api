const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const amount = Joi.number().precision(2);
const active = Joi.boolean();
const coordinatorId = Joi.number().integer();

const createValidator = Joi.object({
  name: name.required(),
  amount: amount.required(),
  coordinatorId: coordinatorId.required(),
});

const updateValidator = Joi.object({
  name: name,
  amount: amount,
  coordinatorId: coordinatorId,
  active: active,
});

const getValidator = Joi.object({
  id: id.required(),
});


module.exports = {createValidator, updateValidator, getValidator}; 