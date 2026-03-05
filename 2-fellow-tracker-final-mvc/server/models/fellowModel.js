const getId = ((id = 0) => () => ++id)();

// Restrict access to our mock "database" to just this Model file
const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

// Can be used like "fellowModel.create()"
module.exports.create = (name) => {
  const newFellow = { name, id: getId() };
  fellows.push(newFellow);
  return newFellow;
};

module.exports.list = () => {
  return [...fellows];
};

module.exports.find = (id) => {
  const fellow = fellows.find((fellow) => fellow.id === id);
  if (!fellow) {
    return null;
  }
  return { ...fellow };
};

module.exports.update = (id, fellowName) => {
  const fellow = fellows.find((fellow) => fellow.id === id);
  if (!fellow) return null;
  fellow.name = fellowName;
  return { ...fellow };
};

module.exports.destroy = (id) => {
  const fellowIndex = fellows.findIndex((fellow) => fellow.id === id);
  if (fellowIndex < 0) {
    return false;
  }
  fellows.splice(fellowIndex, 1);
  return true;
};
