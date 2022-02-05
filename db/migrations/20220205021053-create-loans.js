'use strict';

const { LoanSchema, LOAN_TABLE } = require('./../models/loan-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(LOAN_TABLE, LoanSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(LOAN_TABLE)
  }
};