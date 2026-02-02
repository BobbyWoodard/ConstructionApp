const express = require('express')
const router = express.Router()
const { authenticateToken } = require('./auth');
const { registerUser } = require('../db-services/user-services.js');

// routes

// Create a new user
router.post('/', async (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const user = await registerUser(username, email, password);
    res.status(201).json(user);
  } catch (error) {
    if (error.message === "Username already exists") {
      return res.status(409).json({ message: error.message });
    }
    else if (error.message === "Email already exists") {
      return res.status(409).json({ message: error.message });
    }
    else {
        return res.status(500).send("Internal Server Error");
    }
  }

});

// register user with organization
// not implemented yet

module.exports = router