const boom = require('@hapi/boom');
const { models } = require('../configs/db-config');
const { DOMINGO, STATUS, LOAN_CONDITIONS } = require('./constants');

class PaymentsService {
  constructor(){
  }

  async findAll(){
    const res = await models.Payment.findAll({
      where: { active: true } 
    });
    return res;
  }

  async findById(id) {
    const model = await models.Payment.findByPk(id);
    if (!model) {
      throw boom.notFound('Payment not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.Payment.create(data);
    return newRecord;
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

  // Business logic 
  async createPayments(dailyPay, loanId, customerId, moneyCollectorId, coordinatorId){
    const data = {};
    data.amount = dailyPay;
    data.loanId = loanId;
    data.customerId = customerId;
    data.moneyCollectorId = moneyCollectorId;
    data.coordinatorId = coordinatorId;
    data.statusId = STATUS.pending;
    // create payments
    let paymentDate = new Date(Date.now());
    for (let i = 0; i < LOAN_CONDITIONS.paydays; i++) {
      data.scheduledPaymentAt = await this.addDayOfGrace(paymentDate);
      await this.create(data); 
    }
  };

  async addDayOfGrace(date){
    //add day of grace
    date.setDate(date.getDate() + LOAN_CONDITIONS.daysOfGrace);
    if (date.getDay() === DOMINGO) {
      date.setDate(date.getDate() + LOAN_CONDITIONS.daysOfGrace);
    }
    return date;
  }
}

module.exports = PaymentsService;