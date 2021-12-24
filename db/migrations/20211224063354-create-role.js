'use strict';

const { ROLE_TABLE, RoleSchema } = require('./../models/role-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ROLE_TABLE)
  }
};