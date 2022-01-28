const { Model, DataTypes } = require('sequelize');
const LOAN_TABLE = 'loans';

//structure un database
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
  customerId: {

  },
  moneyCollectorId: {

  },
  approvedBy: {

  },
  canceledBy: {

  },
  statusId:{

  }
}

//loan model
class Loan extends Model {
  static associate(){
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

module.exports = {Loan, LoanSchema, LOAN_TABLE}