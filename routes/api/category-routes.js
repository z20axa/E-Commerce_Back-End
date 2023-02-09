// pacakges and module imports
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories route
router.get('/', async (req, res) => {
  // find all categories and include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{model: Product}]
    });

    res.status(200).json(allCategories);

  } catch (err) {
    res.status(400).json(err);
  }
});

// GET a single category by its id route
router.get('/:id', async (req, res) => {
  // find one category by its `id` value and include its associated Products
  try {
    const oneCategory = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: Product}]
    });

    res.status(200).json(oneCategory);

  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE a new category route
router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);

    res.status(200).json(createCategory);

  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a new category by its id route
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      });

    res.status(200).json(updateCategory);

  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a new category by its id route
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    };

    res.status(200).json(deleteCategory);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
