// backend.js

// Libraries and frameworks
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");

// Routes
const auth = require('./routes/auth.js');
const users = require('./routes/users.js');
const organizations = require('./routes/organizations.js');
const sites = require('./routes/sites.js');
const locations = require('./routes/locations.js');
const tools = require('./routes/tools.js');
const checkIns = require('./routes/check-ins.js');
const checkOuts = require('./routes/check-outs.js');
const lookUps = require('./routes/look-ups.js');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    return res.sendStatus(400);
  }
  next(err);
});

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

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