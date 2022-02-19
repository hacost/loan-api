const Joi = require('joi');

const id = Joi.number().integer();
const amount = Joi.number().precision(2);
// dates
const paymentAt = Joi.date().timestamp();
const paymentReceivedAt = Joi.date().timestamp();
const scheduledPaymentAt = Joi.date().timestamp();
// foreign keys
const loanId = Joi.number().integer();
const customerId = Joi.number().integer();
const moneyCollectorId = Joi.number().integer();
const coordinatorId = Joi.number().integer();
const statusId = Joi.number().integer();
// boolean 
const paidOut = Joi.boolean();
const active = Joi.boolean();

const createValidator = Joi.object({
  amount: amount.required(),
  scheduledPaymentAt: scheduledPaymentAt.required(),
  // foreign keys
  loanId: loanId.required(),
  customerId: customerId.required(),
  moneyCollectorId: moneyCollectorId.required(),
  coordinatorId: coordinatorId.required(),
  statusId: statusId.required(),
});

const updateValidator = Joi.object({
  amount:amount,
  // dates
  paymentAt: paymentAt,
  paymentReceivedAt: paymentReceivedAt,
  scheduledPaymentAt: scheduledPaymentAt,
  // foreign keys
  loanId: loanId,
  customerId:customerId,
  moneyCollectorId: moneyCollectorId,
  coordinatorId:coordinatorId,
  statusId: statusId,
  //boolean
  paidOut: paidOut,
  active: active
});

const getValidator = Joi.object({
  id: id.required(),
});

module.exports = {createValidator, updateValidator, getValidator}; 