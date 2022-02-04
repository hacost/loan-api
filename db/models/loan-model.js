const { Model, DataTypes } = require('sequelize');
const { COORDINATOR_TABLE } = require('./coordinator-model');
const { WALLET_TABLE } = require('./wallet-model');
const { CUSTOMER_TABLE } = require('./customer-model');
const { MONEY_COLLECTOR_TABLE } = require('./money-collector-model');
const { STATUS_TABLE } = require('./status-model');
const LOAN_TABLE = 'loans';

//structure in database
const LoanSchema = {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2)
  },
  profit:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2),
  },
  totalDebt:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2),
    field: 'total_debt'
  },
  dailyPay:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2),
    field:'daily_pay'
  },
  //saldo pendiente
  balance:{
    allowNull:false,
    type: DataTypes.DECIMAL(10,2),
  },
  //total abonado
  totalPaid:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2),
    field:'total_paid',
    defaultValue: 0
  },
  approveReason:{
    allowNull: false,
    type:DataTypes.TEXT,
    field:'approve_reason'
  },
  cancellationReason:{
    allowNull: false,
    type:DataTypes.TEXT,
    field:'cancellation_reason'
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  //dates
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Date.now()
  },
  requestAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'request_at',
    defaultValue: Date.now()
  },
  approveAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'approve_at',
    defaultValue: Date.now()
  },
  cancelAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'cancel_at',
    defaultValue: Date.now()
  },
  // foreign keys 
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
  },
  customerId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  moneyCollectorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'money_collector_id',
    references: {
      model: MONEY_COLLECTOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  // add this field to coordinator can see and aprove or not to Loan
  coordinatorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'coordinator_id',
    references: {
      model: COORDINATOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  approvedBy: {
    type: DataTypes.INTEGER,
    field: 'approved_by',
    references: {
      model: COORDINATOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  canceledBy: {
    type: DataTypes.INTEGER,
    field: 'canceled_by',
    references: {
      model: COORDINATOR_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  statusId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'status_id',
    references: {
      model: STATUS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL' 
  }
}

//loan model
class Loan extends Model {
  static associate(models){
    this.belongsTo(models.Wallet, {as: 'wallet'});
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsTo(models.MoneyCollector, {as: 'money-collector'});
    this.belongsTo(models.Coordinator, {as: 'coordinator'});
    this.belongsTo(models.Coordinator, {as: 'approved-by'});
    this.belongsTo(models.Coordinator, {as: 'canceled-by'});
    this.belongsTo(models.Status, {as: 'status'});

    this.hasMany(models.Payment, {
      as: 'payments',
      foreignKey: 'loanId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: LOAN_TABLE,
      modelName: 'Loan',
      timestamps: false
    }
  }
}

module.exports = {Loan, LoanSchema, LOAN_TABLE};