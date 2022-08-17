const errorHandler = (name, message) => {
  const err = new Error(message);
  err.name = name;
  throw err;
};
module.exports = {
  errorHandler,
};