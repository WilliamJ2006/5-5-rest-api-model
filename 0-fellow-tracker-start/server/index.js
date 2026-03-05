const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

// Auto-incrementing ID generator
let id = 1;
const getId = () => id++;

// In Memory Database
const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));

// TODO: Use the express.json() middleware

////////////////////////
// Endpoints
////////////////////////

// GET /api/fellows
const listFellows = (req, res) => {
  res.send(fellows);
};

// POST /api/fellows
const createFellow = (req, res) => {

}

// GET /api/fellows/:id
const findFellow = (req, res) => {

}

// TODO: Create controllers for PATCH and DELETE

app.get('/api/fellows', listFellows);

// TODO: Connect endpoints to controllers



app.use((req, res) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
});

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
