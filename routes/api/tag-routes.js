// pacakges and module imports
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags route
router.get('/', (req, res) => {
  // find all tags and include its associated Product data
});

// GET a single tag by id route
router.get('/:id', (req, res) => {
  // find a single tag by its `id` and include its associated Product data
});

// CREATE a new tag route
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(data => res.json(data));
});

// UPDATE a tag by id route
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then (data => res.json(data));
});

// DELETE a tag by its id route
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    }})
  .then (data => res.json(data));
});

module.exports = router;
