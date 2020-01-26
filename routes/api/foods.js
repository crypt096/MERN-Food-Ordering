const express = require('express');
const router = express.Router();

// Item model
const Food = require('../../models/Food');

// @router GET api/food
// @desc GET All food items
// @access Public
router.get('/', (req, res) => {
  Food.find()
    .sort({ _id: -1 })
    .then(foods => res.json(foods));
});

module.exports = router;
