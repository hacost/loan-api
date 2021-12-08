const express = require('express');
const ProductsService = require('./../services/productsService');
const validatorHandler = require('../middleware/validator-handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../validators/productsSchema');

const router = express.Router();
const productsService = new ProductsService();
// return a list of products
// how to use
// http://localhost:3000/products?size=5
router.get('/', async (req, res) => {
  //const { size } = req.query;
  res.json( await productsService.find());
});

router.get('/filter', (req, res) => {
  res.send('estoy en el router filter');
});

//return one product by id
//how to use
//http://localhost:3000/products/43
router.get('/:id', 
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    res.json(await productsService.findOne(id));
  } catch (error) {
    next(error);
  }
});

// example to create 
router.post('/', 
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await productsService.create(body);
  res.status(201).json({
    message: 'Created record',
    newProduct
  })
});

// example to update
router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await productsService.update(id, body);
    res.json({
      message: 'Update record',
      product
    })
  } catch (error) {
    next(error);
  }
})

// example to delete
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await productsService.delete(id);
    res.json({
      message: 'Delete record',
      productId
    }) 
  } catch (error) {
    next(error);
  }
})

module.exports = router;
