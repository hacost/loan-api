const { User, UserSchema } = require('./user-model');
const { Customer, CustomerSchema} = require('./customer-model');
const { Role, RoleSchema} = require('./role-model');
const { Status, StatusSchema } = require('./status-model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Status.init(StatusSchema, Status.config(sequelize));

  //Run associates 
  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Role.associate(sequelize.models);
}

module.exports = setupModels;