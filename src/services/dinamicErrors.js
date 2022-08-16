const invalidField = () => {
  const err = new Error('Invalid fields');
  err.name = 'InvalidFieldsError';
  throw err;
};

module.exports = {
  invalidField,
};