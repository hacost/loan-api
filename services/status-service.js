const boom = require('@hapi/boom');
const { models } = require('../configs/db-config');

class StatusService {
  constructor(){
  }

  async findAll(){
    const res = await models.Status.findAll({
      where: { active: true } 
    });
    return res;
  }

  async findById(id) {
    const model = await models.Status.findByPk(id);
    if (!model) {
      throw boom.notFound('Status not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.Status.create(data);
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

module.exports = StatusService;