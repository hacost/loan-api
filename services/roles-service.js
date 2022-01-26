const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class RolesService {
  constructor(){
  }

  async findAll(){
    const res = await models.Role.findAll({
     // include:['user']   
    });
    return res;
  }

  async findById(id) {
    const model = await models.Role.findByPk(id);
    if (!model) {
      throw boom.notFound('Role not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.Role.create(data);
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

module.exports = RolesService;