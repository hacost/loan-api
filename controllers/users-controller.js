const UsersService = require('../services/users-service');

const service = new UsersService();

  const findAll = async (req, res, next) => {
    try {
      const users = await service.findAll();
      res.json(users);
    } catch (error) {
      next(error)
    }
  };

  const findById = async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await service.findById(id));
    } catch (error) {
      next(error);
    }
  }
  
  const create = async (req, res, next) => {
   try {
     const body = req.body;
     const newRecord = await service.create(body);
     res.status(201).json({
       message: 'Created record',
       newRecord
     })
   } catch (error) {
     next(error)
   }
  }
  
  const update = async (req, res, next) => {
   try {
     const { id } = req.params;
     const changes = req.body;
     const record = await service.update(id, changes);
     res.json({
       message: 'Update record',
       record
     })
   } catch (error) {
     next(error);
   }
  }
  
  const delete_ = async (req, res, next) => {
   try {
     const { id } = req.params;
     await service.delete(id);
     res.json({
       message: 'Delete record',
       id
     }) 
   } catch (error) {
     next(error);
   }
  }


module.exports = {findAll, findById, create, update, delete_};
