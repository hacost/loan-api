'use strict';

const { WalletSchema, WALLET_TABLE } = require('./../models/wallet-model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(WALLET_TABLE, WalletSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(WALLET_TABLE)
  }
};