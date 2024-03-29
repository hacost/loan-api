const boom = require('@hapi/boom');
const { models } = require('../configs/db-config');

class WalletsService {
  constructor(){
  }

  async findAll(){
    const res = await models.Wallet.findAll({
      //get coordinator data associate
      include:['coordinator'],
      where: { active: true }    
    });
    return res;
  }

  async findById(id) {
    const model = await models.Wallet.findByPk(id, {
      // get coordinator data associate
      include: [
        {
          association: 'coordinator',
          include: ['user']
        }
      ]
    });
    if (!model) {
      throw boom.notFound('Wallet not found');
    }
    return model;
  }

  async create(data){
    const newRecord = await models.Wallet.create(data);
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

module.exports = WalletsService;