'use strict';

const { MoneyCollectorSchema, MONEY_COLLECTOR_TABLE } = require('./../models/money-collector-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(MONEY_COLLECTOR_TABLE, MoneyCollectorSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(MONEY_COLLECTOR_TABLE)
  }
};