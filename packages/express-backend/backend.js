// backend.js
// Libraries and frameworks
const express = require('express');
import cors from "cors";

// Routes
const auth = require('../routes/auth.js');
const users = require('../routes/users.js');
const organizations = require('../routes/organizations.js');
const sites = require('../routes/sites.js');
const locations = require('../routes/locations.js');
const tools = require('../routes/tools.js');
const checkIns = require('../routes/check-ins.js');
const checkOuts = require('../routes/check-outs.js');
const lookUps = require('../routes/look-ups.js');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use routes
app.use('/auth', auth);
app.use('/users', users);
app.use('/organizations', organizations);
app.use('/sites', sites);
app.use('/locations', locations);
app.use('/tools', tools);
app.use('/check-ins', checkIns);
app.use('/check-outs', checkOuts);
app.use('/look-ups', lookUps);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})