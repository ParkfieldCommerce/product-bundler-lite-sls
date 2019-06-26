const Shopify = require('shopify-node-api');
const config = {
  shop: process.env.SHOP_NAME,
  shopify_api_key: process.env.API_KEY,
  access_token: process.env.PASSWORD
};

const shopify = new Shopify(config);

async function createBundle(items) {
  const stack = items.stack;
  const sku = items.sku;
  const price = items.price;
  const image = items.imgSrc;
  const productsWithVariants = items.products.map(p => {
    return {
      title: p.productTitle,
      variant: p.variantName,
      productId: p.productId,
      variantId: p.variantId
    }
  });
  const postData = {
    product: {
      title: `${stack} Bundle`,
      product_type: "Bundled Product",
      vendor: "Test Bundle",
      body_html: JSON.stringify(productsWithVariants),
      variants: [{ price, sku }],
      images: [{ src: image }]
    }
  };
  try {
    const returnData = await shopifyPost('/admin/products.json', postData);
    return returnData;
  } catch (e) {
    console.log(`Error creating product: ${e}`);
  }
}

async function deleteBundle(lineItems) {
  try {
    lineItems.forEach(async item => {
      if (item.vendor.indexOf('Bundle') > -1) {
        await deleteProduct(item.product_id)
          .catch(e => console.log(e));
      }
    })
  } catch (e) {
    console.log(`Error deleting product: ${id}`);
  }
}

async function updateInventory(lineItems) {
  try {
    lineItems.forEach(async item => {
      const location = await shopifyGet('/admin/locations.json');
      const location_id = location.locations[0].id;
      let properties = item.properties;
      let qty = item.quantity;
      let variants = [];
      for (let i = 0, pLen = properties.length; i < pLen; i++) {
        if (properties[i].name.indexOf('_') > -1) {
          variants.push(await shopifyGet(`/admin/variants/${properties[i].value}.json`));
        }
      }
      if (variants.length > 0) {
        for (let i = 0, vLen = variants.length; i < vLen; i++) {
          let inventory_item_id = variants[i].variant.inventory_item_id;
          let invAdj = {
            location_id,
            inventory_item_id,
            available_adjustment: qty*-1
          }
          shopifyPost('/admin/inventory_levels/adjust.json', invAdj)
            .then(res => console.log(res))
            .catch(e => console.log(e));
        }
      }
    })
  } catch (e) {
    console.log(`Error updating inventory A: ${e}`);
  }
}

function shopifyGet(url, query = {}) {
  return new Promise((resolve, reject) => {
    shopify.get(url, query, (err, data, headers) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  })
}

function shopifyPost(url, data = {}) {
  return new Promise((resolve, reject) => {
    shopify.post(url, data, (err, data, headers) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    })
  })
}

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    shopify.delete(`/admin/products/${id}.json`, (err, data, headers) => {
      if (err) {
        reject(err);
      }
      resolve(id);
    });
  });
}

module.exports = { createBundle, deleteBundle, updateInventory };
