const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor(){
  }

  async findAll(){
    const res = await models.Customer.findAll({
      //include user data associate
      include:['user']
    });
    return res;
  }

  async findById(id) {
    const model = await models.Customer.findByPk(id);
    if (!model) {
      throw boom.notFound('Customer not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.Customer.create(data);
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

module.exports = CustomerService;