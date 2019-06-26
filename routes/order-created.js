const express = require('express');
const router = express.Router();
const { updateInventory, deleteBundle } = require('../shopify/shopify-functions.js');

router.post('/order-created', async (req, res) => {
  console.log('================Order Created!================');
  const order = req.body;
  try {
    const updatedInventory = await updateInventory(order.line_items);
    const deletedBundle = await deleteBundle(order.line_items);
    res.end();
  } catch (e) {
    console.log(`Error updating inventory: ${e}`);
    res.sendStatus(400)
  }
});

module.exports = router;
