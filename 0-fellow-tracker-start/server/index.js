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
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

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
  const { fellowName } = req.body;
  if (!fellowName) {
    res.status(400).send({ message: `Invalid Name` });
    return;
  }
  const newFellow = { name: fellowName, id: getId() };
  fellows.push(newFellow);
  res.status(201).send(newFellow);
};

// GET /api/fellows/:id
const findFellow = (req, res) => {
  const id = req.params.id;
  if (fellows.some((fellow) => fellow.id === Number(id))) {
    res.send(fellows.find((fellow) => fellow.id === Number(id)));
    return;
  }
  res.status(404).send({ message: `ID not found` });
};

// TODO: Create controllers for PATCH and DELETE

const updateFellow = (req, res) => {
  const { fellowName } = req.body;
  if (!fellowName) {
    res.status(400).send({ message: `Invalid Name` });
    return;
  }
  const id = req.params.id;
  if (!fellows.some((fellow) => fellow.id === Number(id))) {
    res.status(404).send({ message: `ID not found` });
    return;
  }
  const fellow = fellows.find((fellow) => fellow.id === Number(id));
  fellow.name = fellowName;
  res.send(fellowName);
};

const deleteFellow = (req, res) => {
  const id = req.params.id;
  const fellowIndex = fellows.findIndex((fellow) => fellow.id === Number(id));
  if (fellowIndex < 0) {
    res.status(404).send({ message: `Fellow not found` });
  }
  fellows.splice(fellowIndex, 1);
  res.sendStatus(204);
};

app.get('/api/fellows', listFellows);
app.post('/api/fellows', createFellow);
app.get('/api/fellows/:id', findFellow);
app.patch('/api/fellows/:id', updateFellow);
app.delete('/api/fellows/:id', deleteFellow);

// TODO: Connect endpoints to controllers

app.use((req, res) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` });
});

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
