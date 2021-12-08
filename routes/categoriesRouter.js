const express = require('express');
const router = express.Router();

//Endpoint with two params
//how to use
// http://localhost:3000/categories/555/products/43
router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId
  });
})

module.exports = router;
