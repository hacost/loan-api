const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().precision(2);
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
const approvedBy = Joi.number().integer();
const canceledBy = Joi.number().integer();
const statusId = Joi.number().integer();

const active = Joi.boolean();

const createValidator = Joi.object({
  amount: amount.required(),
  // foreign keys
  walletId: walletId.required(),
  customerId: customerId.required(),
  moneyCollectorId: moneyCollectorId.required(),
  coordinatorId: coordinatorId.required(),
  statusId: statusId.required(),
  active: active.required()
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
  approvedBy: approvedBy,
  canceledBy: canceledBy,
  statusId: statusId,
  active: active
});

const getValidator = Joi.object({
  id: id.required(),
});

module.exports = {createValidator, updateValidator, getValidator}; 