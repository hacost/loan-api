const { Model, DataTypes } = require('sequelize');
const { LOAN_TABLE } = require('./loan-model');
const { COORDINATOR_TABLE } = require('./coordinator-model');
const { CUSTOMER_TABLE } = require('./customer-model');
const { MONEY_COLLECTOR_TABLE } = require('./money-collector-model');
const { STATUS_TABLE } = require('./status-model');
const PAYMENT_TABLE = 'payments';

//structure in database
const PaymentSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount:{
    allowNull: false,
    type: DataTypes.DECIMAL(10,2)
  },
  // pagado
  paidOut: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'paid_out',
    defaultValue: false
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  // dates
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Date.now()
  },
  scheduledPaymentDate:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'scheduled_payment_date'
  },
  paymentDate:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'payment_date'
  },
  paymentReceivedDate:{
    allowNull: false,
    type: DataTypes.DATE,
    field: 'payment_received_date'
  },
  // foreign keys 
  loanId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'loan_id',
    references: {
      model: LOAN_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL' 
  },
  customerId:{
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
  moneyCollectorId:{
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
  // payment received by
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

// Payment model
class Payment extends Model {
  static associate(models){
    this.belongsTo(models.Loan, {as: 'loan'});
    this.belongsTo(models.Customer, {as: 'customer'});
    this.belongsTo(models.MoneyCollector, {as: 'money-collector'});
    this.belongsTo(models.Coordinator, {as: 'coordinator'});
    this.belongsTo(models.Status, {as: 'status'});
  }
  static config(sequelize){
    return {
      sequelize,
      tableName: PAYMENT_TABLE,
      modelName: 'Payment',
      timestamps: false
    }
  }
}

module.exports = { Payment, PaymentSchema, PAYMENT_TABLE }