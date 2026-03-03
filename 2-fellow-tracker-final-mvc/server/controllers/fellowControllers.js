const fellowModel = require('../models/fellowModel.js');

/*
These controllers take incoming requests and utilize the
methods provided by fellowModel before sending a
response back to the client (or an error message).
*/

// Get All (Read)
exports.listFellows = (req, res) => {
  const fellowsList = fellowModel.list();
  res.send(fellowsList);
};

// Get One (Read)
exports.findFellow = (req, res) => {
  const { id } = req.params;
  const fellow = fellowModel.find(Number(id));

  if (!fellow) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }
  res.send(fellow);
};

// Create
exports.createFellow = (req, res) => {
  const { fellowName } = req.body;
  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const newFellow = fellowModel.create(fellowName);
  res.send(newFellow);
};

// Update
exports.updateFellow = (req, res) => {
  const { fellowName } = req.body;

  if (!fellowName) {
    return res.status(400).send({ message: "Invalid Name" });
  }

  const { id } = req.params;
  const updatedFellow = fellowModel.editName(Number(id), fellowName);

  if (!updatedFellow) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }

  res.send(updatedFellow);
};

// Delete
exports.deleteFellow = (req, res) => {
  const { id } = req.params;
  const didDelete = fellowModel.delete(Number(id));

  if (!didDelete) {
    return res.status(404).send({
      message: `No fellow with the id ${id}`
    });
  }

  res.sendStatus(204);
};
