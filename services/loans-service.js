const boom = require('@hapi/boom');
const { models } = require('../config/db-config');
const { Op } = require('sequelize');
const PaymentsService = require('./payments-service');
const { STATUS, LOAN_CONDITIONS } = require('./constants');

class LoansService {
  constructor(){
    this.paymentsService = new PaymentsService();
  }

  async findAll(query){
    return await models.Loan.findAll( await this.paginationAndFilters(query));
  }

  async findById(id) {
    const model = await models.Loan.findByPk(id);
    // exist
    if (!model) {
      throw boom.notFound('Loan not found');
    }
    // active 
    if (model.active === false) {
      throw boom.notFound('Loan not found');
    }
    return model;
  }

  async create(data){
    const loans = await this.findByCustomer(data.customerId);
    // check if the client does not have any active loan without paying
    if (loans.length == 0 ) {
      return await models.Loan.create(await this.loanCalculate(data));   
    } else {
      throw boom.notAcceptable('Have an active loan...');
    }
  }

  async update(id, changes) {
    const model = await this.findById(id);
    const res = await model.update(changes)
    return res;
  }
  
  async delete(id) {
    const model = await this.findById(id);
    await model.destroy();
    return { id };
  }

  // Business Logic
  async approve(id, changes) {
    let res = null;
    // find loan
    const model = await this.findById(id); 
    // validate loan status
    if (model.statusId === STATUS.requested) {
      // create payments
      await this.paymentsService.createPayments(
        model.dailyPay, 
        model.id, 
        model.customerId,
        model.moneyCollectorId,
        model.coordinatorId
      );
      // approve loan
      changes.statusId = STATUS.passed;
      changes.approveAt = Date.now();
      res = await model.update(changes)     
    } else {
      throw boom.notAcceptable('The loan is not in requested status...');
    }
    return res;
  }

  async findByCustomer(customerId){
    const options = {
      where: {}
    }
    options.where.customerId = customerId,
    options.where.statusId = {
      [Op.notIn]: [STATUS.cancelled, STATUS.paidOut]
    } 
    options.where.active = true;
    const res = await models.Loan.findAll(options);
    return res;
  }

  async loanCalculate(data) {
    // calculate
    data.totalDebt = data.amount * LOAN_CONDITIONS.profitPercentageForTotalDebt;
    data.balance = data.totalDebt;
    data.profit = (data.amount * LOAN_CONDITIONS.profitPercentage) / 100;
    data.dailyPay = data.totalDebt / LOAN_CONDITIONS.paydays;
    return data;
  }

  async paginationAndFilters(query){
    const { limit, offset, amount, statusId } = query;
    const options = {
      // include data associate
      include: [
        {
          association: 'customer',
          // where to customer
          where: {active: true}
        },
      ],
      // where to loan
      where: {}
    }
    // pagination
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    // filters 
    if (amount) {
      options.where.amount = amount;
    }
    if (statusId) {
      options.where.statusId = statusId;
    }
    options.where.active = true;

    return options;
  };

};

module.exports = LoansService;