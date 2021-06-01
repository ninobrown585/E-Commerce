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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCAtegory = await Plant.create({
      ...req.body,
      id: req.session.id,
    });

    res.status(200).end();
  } catch (err) {
    res.status(400).json(err);
  }
  
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
   
   Category.update(
    {
      // All the fields you can update and the data attached to the request body.
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      // Sends the updated Category as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
       // user_id: req.session.user_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
