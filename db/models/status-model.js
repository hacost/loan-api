const { Model, DataTypes } = require('sequelize');
const STATUS_TABLE = 'status';

// structure in database
const StatusSchema = {
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

// status model
class Status extends Model {
  static associate(models){
    this.hasMany(models.Loan, {
      as: 'loans',
      foreignKey: 'status_id'
    });
    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'status_id'
    });     
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: STATUS_TABLE,
      modelName: 'Status',
      timestamps: false
    }
  }
}

module.exports = { Status, StatusSchema, STATUS_TABLE };
