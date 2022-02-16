const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');


class LoansService {
  constructor(){
  }

  async findAll(query){
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
    const res = await models.Loan.findAll(options);
    return res;
  }

  async findById(id) {
    const model = await models.Loan.findByPk(id);
    if (!model) {
      throw boom.notFound('Loan not found');
    }
    return model;
  }

  async create(data){
    // get loans
    const loans = await this.findByCustomer(data.customerId);
    // check if the client does not have any active loan without paying
    if (loans.length == 0 ) {
      // calculate 
      data.totalDebt = data.amount * 1.15;
      data.balance = data.totalDebt;
      data.profit = ((data.amount * 15) / 100);
      data.dailyPay = data.totalDebt / 23;
      
      const newRecord = await models.Loan.create(data);   
      return newRecord;   
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

  // Bussiness Logic
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

}

module.exports = LoansService;