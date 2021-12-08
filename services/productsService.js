const boom = require('@hapi/boom');
const sequelize = require('./../libs/sequelize');

class ProductsService {

  constructor () {
    this.products = [];
  }

  async create(data){
    data
  }

  async find(){
    const query = 'Select * from task';
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound('Product not found...');
    } 
     return product; 
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found...');
    } else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      };
      return this.products[index];
    }
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found...');
    } else {
      this.products.splice(index, 1);
      return id;
    }
  }

}

module.exports = ProductsService;