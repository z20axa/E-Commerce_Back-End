// pacakges and module imports
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags route
router.get('/', async (req, res) => {
  // find all tags and include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });

    res.status(200).json(allTags);

  } catch (err) {
    res.status(400).json(err);
  };
});

// GET a single tag by id route
router.get('/:id', async (req, res) => {
  // find a single tag by its `id` and include its associated Product data
  try {
    const oneTag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: Product, through: ProductTag, as: 'products' }]
    });

    res.status(200).json(oneTag);

  } catch (err) {
    res.status(400).json(err);
  };
});

// CREATE a new tag route
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);

    res.status(200).json(createTag);

  } catch (err) {
    res.status(400).json(err);
  };
});

// UPDATE a tag by id route
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      });

    res.status(200).json(updateTag);

  } catch (err) {
    res.status(400).json(err);
  };
});

// DELETE a tag by its id route
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })

    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    };

    res.status(200).json(deleteTag);

  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
