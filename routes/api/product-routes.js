// pacakges and module imports
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products route
router.get('/', async (req, res) => {
  // find all products and include its associated Category and Tag data
  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'tags'}]
    });

    res.status(200).json(allProducts);

  } catch (err) {
    res.status(400).json(err);
  };
});

// GET a single product by id route
router.get('/:id', async (req, res) => {
  // find a single product by its `id` and include its associated Category and Tag data
  try {
    const oneProduct = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Category }, { model: Tag, through: ProductTag, as: 'tags'}]
    });

    res.status(200).json(oneProduct);

  } catch (err) {
    res.status(400).json(err);
  };
});

// CREATE a new product route
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE a product by its id route
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a product by its id route
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deleteProduct = await Product.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deleteProduct) {
      res.status(404).json({message: 'No product found with that id!'});
      return;
    };

    res.status(200).json(deleteProduct);

  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
