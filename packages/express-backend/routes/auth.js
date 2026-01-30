const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config();
import { authenticateUser } from '../db-services/user-services.js';

// routes

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // authenticate user
  try {
    const user = await authenticateUser(username, password);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }

  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router
module.exports.authenticateToken = authenticateToken;