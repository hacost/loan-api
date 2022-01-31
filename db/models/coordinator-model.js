const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user-model');
const COORDINATOR_TABLE = 'coordinators';

// structure in database
const CoordinatorSchema = {
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
  // foreign key 
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
  }
}

// coordinator model
class Coordinator extends Model {
  static associate(models){
    // one to one relations with User table
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Wallet, {
      as: 'wallets',
      foreignKey: 'coordinatorId'
    });
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: COORDINATOR_TABLE,
      modelName: 'Coordinator',
      timestamps: false
    }
  }
}

module.exports = { Coordinator, CoordinatorSchema, COORDINATOR_TABLE };
