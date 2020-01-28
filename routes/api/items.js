const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


// Item model
const Item = require('../../models/Item');

// @router GET api/items
// @desc GET All items
// @access Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @router POST api/items
// @desc Create a post
// @access Public
router.post('/add', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @router DELETE api/items/:id
// @desc Delete a post
// @access Public
router.delete('/:id', auth , (req, res) => {
    Item.findById(req.params.id)
      .then(item => item.remove().then(() => res.json({ success: true })))
      .catch(err => res.status(404).json({ success: false }));
  });

module.exports = router;
