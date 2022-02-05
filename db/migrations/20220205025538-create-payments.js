'use strict';

const { PaymentSchema, PAYMENT_TABLE } = require('./../models/payment-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PAYMENT_TABLE, PaymentSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PAYMENT_TABLE)
  }
};