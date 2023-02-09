// pacakges and module imports
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  // find all categories and include its associated Products
  try {
    const allCategories = await Category.findAll({
    include: [Product]
    })
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET a single category by its id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value and include its associated Products
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE a new category
router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(data => res.json(data));
});

// UPDATE a new category by its id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then (data => res.json(data));
});

// DELETE a new category by its id
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }})
  .then (data => res.json(data));
});

module.exports = router;
