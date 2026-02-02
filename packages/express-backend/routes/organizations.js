const express = require('express')
const router = express.Router()
const { authenticateToken } = require('./auth');
const { registerOrganization } = require('../db-services/organization-services.js');
const { getUserByUsername } = require('../db-services/user-services.js');

// routes

// Create a new organization
router.post('/', authenticateToken, (req, res) => {
    const name = req.body.name;
    registerOrganization(name, req.user._id)
        .then(organization => {
            res.status(201).json({ organization });
        })
        .catch(error => {
            return res.status(500).send("Internal Server Error");
        });
});

module.exports = router