const { Model, DataTypes } = require('sequelize');
const { USER_TABLE } = require('./user-model');
const CUSTOMER_TABLE = 'customers';

// structure in database
const CustomerSchema = {
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
// customer model
class Customer extends Model {
  static associate(models){
    // one to one relations with User table
    this.belongsTo(models.User, {as: 'user'});
    // has one loan
    this.hasOne(models.Loan, {
      as: 'loan',
      foreignKey: 'customer_id'
    });
    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'customer_id'
    });
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = { Customer, CustomerSchema, CUSTOMER_TABLE };

