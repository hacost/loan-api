const express = require('express');
const controller = require('../controllers/users-controller');
const validatorHandler = require('../middleware/validator-handler');
const { createValidator, updateValidator, getValidator } = require('../validators/users-validator');

const router = express.Router();

router.get('/', controller.findAll);
router.get('/:id', validatorHandler(getValidator, 'params'), controller.findById);
router.post('/', validatorHandler(createValidator, 'body'), controller.create);
router.patch('/:id', validatorHandler(getValidator, 'params'), validatorHandler(updateValidator, 'body'), controller.update);
router.delete('/:id', validatorHandler(getValidator, 'params'), controller.delete_);

//query params
//how to use
// http://localhost:3000/users?limit=10&offset=50
//router.get('/', async (req, res, next) => {
  // const { limit, offset } = req.query;
  // if (limit && offset) {
  //   res.json({
  //     limit,
  //     offset
  //   });
  // } else {
  //   res.send('No hay parametros')
  // }
//   try {
//     const users = await service.find();
//     res.json(users);
//   } catch (error) {
//     next(error)
//   }
// })


// router.get('/:id', 
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     res.json(await service.findOne(id));
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/', 
// validatorHandler(createUserSchema, 'body'),
// async (req, res, next) => {
//   try {
//     const body = req.body;
//     const newUser = await service.create(body);
//     res.status(201).json({
//       message: 'Created record',
//       newUser
//     })
//   } catch (error) {
//     next(error)
//   }
// });

// example to update
// router.patch('/:id', 
//   validatorHandler(getUserSchema, 'params'),
//   validatorHandler(updateUserSchema, 'body'),
//   async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const changes = req.body;
//     const user = await service.update(id, changes);
//     res.json({
//       message: 'Update record',
//       user
//     })
//   } catch (error) {
//     next(error);
//   }
// })

// example to delete
// router.delete('/:id', 
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     await service.delete(id);
//     res.json({
//       message: 'Delete record',
//       id
//     }) 
//   } catch (error) {
//     next(error);
//   }
// })

module.exports = router;
