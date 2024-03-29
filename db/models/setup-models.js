const { User, UserSchema } = require('./user-model');
const { Customer, CustomerSchema} = require('./customer-model');
const { Role, RoleSchema} = require('./role-model');
const { Status, StatusSchema } = require('./status-model');
const { Coordinator, CoordinatorSchema } = require('./coordinator-model');
const { Wallet, WalletSchema} = require('./wallet-model');
const { MoneyCollector, MoneyCollectorSchema } = require('./money-collector-model');
const { Loan, LoanSchema } = require('./loan-model');
const { Payment, PaymentSchema } = require('./payment-model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Status.init(StatusSchema, Status.config(sequelize));
  Coordinator.init(CoordinatorSchema, Coordinator.config(sequelize));
  Wallet.init(WalletSchema, Wallet.config(sequelize));
  MoneyCollector.init(MoneyCollectorSchema, MoneyCollector.config(sequelize));
  Loan.init(LoanSchema, Loan.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));

  //Run associates 
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Role.associate(sequelize.models);
  Status.associate(sequelize.models);
  Coordinator.associate(sequelize.models);
  Wallet.associate(sequelize.models);
  MoneyCollector.associate(sequelize.models);
  Loan.associate(sequelize.models);
  Payment.associate(sequelize.models);
}

module.exports = setupModels;