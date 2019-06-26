const express = require('express');
const router = express.Router();
const { createBundle } = require('../shopify/shopify-functions.js');

router.post('/build-product', async (req, res) => {
  console.log('==============Building Product!==============');
  const items = req.body;
  try {
    const createdProduct = await createBundle(items);
    res.send(createdProduct)
  } catch (e) {
    console.log(`Error building product: ${e}`);
    res.sendStatus(400)
  }
});


module.exports = router;
