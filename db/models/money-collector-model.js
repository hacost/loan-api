const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user-model');
const { WALLET_TABLE } = require('./wallet-model');
const MONEY_COLLECTOR_TABLE = 'money_collectors';

// structure in database
const MoneyCollectorSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  active: {
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
  userId: { 
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'user_id',
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  walletId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'wallet_id',
    references: {
      model: WALLET_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }

}
// MoneyCollector model
class MoneyCollector extends Model {
  static associate(models){
    // one to one relations with User table
    this.belongsTo(models.User, {as: 'user'});
    this.belongsTo(models.Wallet, {as: 'wallet'});
    this.hasMany(models.Loan, {
      as: 'loans',
      foreignKey: 'moneyCollectorId'
    });
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: MONEY_COLLECTOR_TABLE,
      modelName: 'MoneyCollector',
      timestamps: false
    }
  }
}

module.exports = { MoneyCollector, MoneyCollectorSchema, MONEY_COLLECTOR_TABLE };

