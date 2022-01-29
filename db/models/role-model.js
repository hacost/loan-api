const { Model, DataTypes } = require('sequelize');
const ROLE_TABLE = 'roles';

// structure in database
const RoleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
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
}

// role model
class Role extends Model {
  static associate(models){
    this.hasMany(models.User, {
      as: 'users',
      foreignKey: 'roleId'
    })
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}

module.exports = { Role, RoleSchema, ROLE_TABLE };
