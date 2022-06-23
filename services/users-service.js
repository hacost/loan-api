const boom = require('@hapi/boom');
const { models } = require('../configs/db-config');
const { hidePassword } = require('../utils/helper-util');
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
    hidePassword(newRecord);
    return newRecord;
  }

  async update(id, changes) {
    const model = await this.findById(id);
    const res = await model.update(changes)
    hidePassword(res);
    return res;
  }
  
  async delete(id) {
    const model = await this.findById(id);
    await model.destroy();
    return { id };
  }
  
  // Business logic
  async findByEmail(email) {
    const res = await models.User.findOne({
      where: { email: email, active: true } 
    });
    return res;
  }

}

module.exports = UsersService;