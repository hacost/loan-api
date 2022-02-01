const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class MoneyCollectorsService {
  constructor(){
  }

  async findAll(){
    const res = await models.MoneyCollector.findAll({
      //include user data associate
      include:['user']
    });
    return res;
  }

  async findById(id) {
    const model = await models.MoneyCollector.findByPk(id,{
      // get payments data associate
      include:['user', 'wallet']  
    });
    if (!model) {
      throw boom.notFound('Money Collector not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.MoneyCollector.create(data, {
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

module.exports = MoneyCollectorsService;