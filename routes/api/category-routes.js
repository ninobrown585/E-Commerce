const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategory =  await Category.findAll();
    res.status(200).json(allCategory);
  }
  catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    })
    .then((answer) => res.json(answer))
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
