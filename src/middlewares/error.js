const errors = {
  ValidationError: 400,
  InvalidFieldsError: 400,
  TokenValidationError: 401,
  NotFoundError: 404,
  ConflictError: 409,
};

const errorHandler = ({ name, message }, _req, res, _next) => {
  const status = errors[name];
  
  if (!status) return res.status(500).json({ message });
  res.status(status).json({ message });
};

module.exports = errorHandler;