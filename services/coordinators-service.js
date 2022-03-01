const boom = require('@hapi/boom');
const { models } = require('../config/db-config');

class CoordinatorsService {
  constructor(){
  }

  async findAll(){
    const res = await models.Coordinator.findAll({
      //include user data associate
      include:['user'],
      where: { active: true } 
    });
    return res;
  }

  async findById(id) {
    const model = await models.Coordinator.findByPk(id,{
      // get user and wallets data associate
      include:['user', 'wallets']
    });
    if (!model) {
      throw boom.notFound('Coordinator not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.Coordinator.create(data, {
      //to create Coordinator and user 
      include: ['user']
    });
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

module.exports = CoordinatorsService;