const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');
const PaymentsService = require('./payments-service');

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
      throw boom.notAcceptable('Have Loan active...');
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

    // validar que el prestamo exista y activo = true
    const model = await this.findById(id); 
    //validar que el prestamo sea status 3 = Solicitado para aprobar
    // si no es status 3, retornar error de no permitido.

    changes.statusId = 4;
    changes.approveAt = Date.now();
    


    // create 23 payments
    const data = {};
    data.amount = model.dailyPay;
    data.loanId = model.id;
    data.customerId = model.customerId;
    data.moneyCollectorId = model.moneyCollectorId;
    data.coordinatorId = model.coordinatorId;
    data.statusId = 2;
    
    let date = new Date(Date.now());
    for (let i = 1; i < 24; i++) {
      //sum one day
      date.setDate(date.getDate() + 1);
      if (date.getDay() === 0) {
        date.setDate(date.getDate() + 1);
      }
      data.scheduledPaymentAt = date;
      await this.paymentsService.create(data); 
    }

    const res = await model.update(changes)
    return res;
  }

  async findByCustomer(customerId){
    const options = {
      where: {}
    }
    options.where.customerId = customerId,
    options.where.statusId = {
      [Op.notIn]: [1, 7]
    } 
    options.where.active = true;
    const res = await models.Loan.findAll(options);
    return res;
  }

  async loanCalculate(data) {
    // calculate
    data.totalDebt = data.amount * 1.15;
    data.balance = data.totalDebt;
    data.profit = (data.amount * 15) / 100;
    data.dailyPay = data.totalDebt / 23;
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
  }
}

module.exports = LoansService;