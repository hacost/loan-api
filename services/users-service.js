const boom = require('@hapi/boom');

const { models } = require('../config/db-config');

class UsersService {
  constructor(){
  }

  async findAll(){
    const res = await models.User.findAll({
      include: ['customer'],
      where: { active: true } 
    });
    return res;
  }

  async findById(id) {
    const model = await models.User.findByPk(id, {
      // get role and customer data associate
      include:['role', 'customer']
    });
    if (!model) {
      throw boom.notFound('User not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.User.create(data);
    //Delete password to don't send it when created
    delete newRecord.dataValues.password;
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

module.exports = UsersService;