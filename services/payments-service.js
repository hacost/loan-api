const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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

}

module.exports = PaymentsService;