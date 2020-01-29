const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item model
const Order = require("../../models/Order");

// @router GET api/orders
// @desc GET All orders
// @access Private
router.get("/", auth, (req, res) => {
  Order.find()
    .sort({ date: -1 })
    .then(orders => res.json(orders));
});

// @router POST api/orders
// @desc Create an order
// @access Private
router.post("/add", auth, (req, res) => {
  const newOrder = new Order({
    name: req.body.name,
    description: req.body.description,
    quantity: req.body.quantity,
    status: req.body.status,
    rating: req.body.rating,
    place_of_delivery: req.body.place_of_delivery
  });

  newOrder.save().then(order => res.json(order));
});

// @router GET api/orders/:id
// @desc Get an order with specific ID
// @access Public
router.get("/:id", auth, (req, res) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json(`Error : ${err}`));
});

// @router UPDATE api/orders/:id
// @desc Updates an order
// @access Public
router.post("/:id", auth, (req, res) => {
  Order.findById(req.params.id)
    .then(order => {
      (order.name = req.body.name),
        (order.description = req.body.description),
        (order.quantity = req.body.quantity),
        (order.status = req.body.status),
        (order.rating = req.body.rating),
        (order.place_of_delivery = req.body.place_of_delivery);

      order
        .save()
        .then(() => res.json("Order updated!"))
        .catch(err => {
          res.status(400).json(`Error : ${err}`);
        });
    })
    .catch(err => res.status(400).json(`Error : ${err}`));
});

// @router DELETE api/items/:id
// @desc Delete a post
// @access Public
router.delete("/:id", auth, (req, res) => {
  Order.findById(req.params.id)
    .then(order => order.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
