const boom = require('@hapi/boom');
const { models } = require('../configs/db-config');
const { hidePassword } = require('./../utils/helper-util');

class CustomersService {

  constructor(){
  }

  async findAll(query){
    const { limit, offset } = query;
    const options = {
      // include data associate
      include: [
        {
          association: 'user',
          include: ['role'],
          where: { active: true }, 
        },
      ]
    }
    // pagination
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const res = await models.Customer.findAll(options);
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
    const newRecord = await models.Customer.create(data, {
      //to create costumer and user 
      include: ['user']
    });
    //hide password 
    hidePassword(newRecord.dataValues.user);
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

module.exports = CustomersService;