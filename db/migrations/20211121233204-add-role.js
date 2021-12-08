'use strict';
const { UserSchema, USER_TABLE } = require('./../models/users-model')
// example to add a colum
module.exports = {
  up: async (queryInterface) => {
   await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
