const express = require('express')
const router = express.Router()
const { authenticateToken } = require('./auth');

// routes

// Create a new site
router.post('/', authenticateToken, (req, res) => {
  
});

module.exports = router