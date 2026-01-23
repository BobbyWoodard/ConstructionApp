const express = require('express');
import cors from "cors";
const auth = require('../routes/auth.js');

const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})