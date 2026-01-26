const express = require('express')
const router = express.Router()
const { authenticateToken } = require('./auth');

// routes

// Create a new check-out
router.post('/', authenticateToken, (req, res) => {
  
});

module.exports = router