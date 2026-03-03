const getId = ((id = 0) => () => ++id)();

// Restrict access to our mock "database" to just this Model file
const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

// Can be used like "fellowModel.create()"
exports.create = (name) => {
  const newFellow = { name, id: getId() };
  fellows.push(newFellow);
  return newFellow;
};

exports.list = () => {
  return [...fellows];
};

exports.find = (id) => {
  const fellow = fellows.find((fellow) => fellow.id === id);
  if (!fellow) {
    return null;
  }
  return { ...fellow };
};

exports.editName = (id, newName) => {
  const fellow = fellows.find((fellow) => fellow.id === id);
  if (!fellow) return null;
  fellow.name = newName;
  return { ...fellow };
};

exports.delete = (id) => {
  const fellowIndex = fellows.findIndex((fellow) => fellow.id === id);
  if (fellowIndex < 0) {
    return false;
  }
  fellows.splice(fellowIndex, 1);
  return true;
};
