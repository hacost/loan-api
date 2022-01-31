'use strict';

const { CoordinatorSchema, COORDINATOR_TABLE } = require('./../models/coordinator-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(COORDINATOR_TABLE, CoordinatorSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(COORDINATOR_TABLE)
  }
};