
class GenericsService {
  constructor(){}

  async findAll(){
    return '';
  }

  async findById(id) {
    return { id };
  }

  async create(data){
    return data;
  }
  
  async update(id, changes) {
    return { id, changes };
  }
  
  async delete(id) {
    return { id };
  }

}

module.exports = GenericsService;