'use strict';

const { STATUS_TABLE, StatusSchema } = require('./../models/status-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(STATUS_TABLE, StatusSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(STATUS_TABLE)
  }
};
