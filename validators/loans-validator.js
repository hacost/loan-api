const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().precision(2).min(1000);
const approveReason = Joi.string().min(10);
const cancellationReason = Joi.string().min(10);
// dates
const approveAt = Joi.date().timestamp();
const cancelAt = Joi.date().timestamp();
// foreign keys
const walletId = Joi.number().integer();
const customerId = Joi.number().integer();
const moneyCollectorId = Joi.number().integer();
const coordinatorId = Joi.number().integer();
const approvedId = Joi.number().integer();
const canceledId = Joi.number().integer();
const statusId = Joi.number().integer();

const active = Joi.boolean();
//pagination
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createValidator = Joi.object({
  amount: amount.required(),
  // foreign keys
  walletId: walletId.required(),
  customerId: customerId.required(),
  moneyCollectorId: moneyCollectorId.required(),
  coordinatorId: coordinatorId.required(),
  statusId: statusId.required(),
});

const updateValidator = Joi.object({
  amount:amount,
  approveReason: approveReason,
  cancellationReason: cancellationReason,
  // dates
  approveAt: approveAt,
  cancelAt: cancelAt,
  // foreign keys
  walletId: walletId,
  customerId:customerId,
  moneyCollectorId: moneyCollectorId,
  coordinatorId:coordinatorId,
  approvedId: approvedId,
  canceledId: canceledId,
  statusId: statusId,
  active: active
});

const getValidator = Joi.object({
  id: id.required(),
});

const queryParamsValidator = Joi.object({
  amount: amount,
  statusId: statusId,
  limit: limit,
  offset: offset
})

module.exports = {createValidator, updateValidator, getValidator, queryParamsValidator}; 