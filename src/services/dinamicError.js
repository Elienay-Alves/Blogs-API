const errorHandler = (name, message) => {
  const err = new Error(message);
  err.name = name;
  throw err;
};

// const alreadyExists = (message) => {
//   const error
// }

module.exports = {
  errorHandler,
};