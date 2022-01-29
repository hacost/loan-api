const { Model, DataTypes} = require('sequelize');
const { ROLE_TABLE } = require('./role-model');
const USER_TABLE = 'users';

// structure in database
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    field: 'last_login',
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Date.now()
  },
  // foreign key 
  roleId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'role_id',
    references: {
      model: ROLE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

// user model
class User extends Model {
  static associate(models){
  // relations with Role table
  this.belongsTo(models.Role, {as: 'role'});
  
    // has one customer
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });

  }
  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { User, UserSchema, USER_TABLE };