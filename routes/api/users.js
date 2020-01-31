const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @router GET api/users
// @desc GET All users
// @access Private
router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @router GET api/users/:id
// @desc Get an user with specific ID
// @access Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(`Error : ${err}`));
});

// @router UPDATE api/users/:id
// @desc Updates an user
// @access Public
router.post("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      (user.name = req.body.name),
        (user.email = req.body.email),
        (user.password = req.body.password),
        (user.firstName = req.body.firstName),
        (user.lastName = req.body.lastName),
        (user.address = req.body.address),
        (user.favoriteFood = req.body.favoriteFood);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save().then(user => {
            jwt.sign(
              { id: user.id },
              config.get("jwtSecret"),
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    favoriteFood: user.favoriteFood
                  }
                });
              }
            );
          });
        });
      });
    })
    .catch(err => res.status(400).json(`Error : ${err}`));
});

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  const {
    name,
    email,
    password,
    firstName,
    lastName,
    address,
    favoriteFood
  } = req.body;

  // Simple validation
  if (!name || !email || !password || !firstName || !lastName) {
    return res.status(400).json({ msg: "Please enter all mandatory fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      firstName,
      lastName,
      address,
      favoriteFood
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  favoriteFood: user.favoriteFood
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
