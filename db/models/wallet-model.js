const { Model, DataTypes } = require('sequelize');
const { COORDINATOR_TABLE } = require('./coordinator-model');
const WALLET_TABLE = 'wallets';

//structure in database
const WalletSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true, 
    type: DataTypes.INTEGER
  },
  name:{
    allowNull: false,
    type: DataTypes.STRING
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL(10,2)
  },
  active:{
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Date.now()
  },
   // foreign keys
   // addressId
   coordinatorId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'coordinator_id',
    references: {
      model: COORDINATOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
   }
}

//wallet model
class Wallet extends Model {
  static associate(models){
    this.belongsTo(models.Coordinator, {as: 'coordinator'})
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: WALLET_TABLE,
      modelName: 'Wallet',
      timestamps: false
    }
  }
}

module.exports = {Wallet, WalletSchema, WALLET_TABLE};