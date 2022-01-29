const { Model, DataTypes } = require('sequelize');
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

  },
  paymentCollector:{

  },
  paymentReceivedBy:{

  },
  statusId:{
    
  }
}

// Payment model
class Payment extends Model {
  static associate(){

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