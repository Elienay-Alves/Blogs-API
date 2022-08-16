const errors = {
  ValidationError: 400,
  InvalidFieldsError: 400,
  NotFoundError: 404,
};

const errorHandler = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  
  if (!status) return res.sendstatus(500);
  res.status(status).json({ message });
};

module.exports = errorHandler;