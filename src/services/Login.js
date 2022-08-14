const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const LoginS = {
  async getUserByEmail(userEmail, userPassword) {
    if (!userEmail || !userPassword) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }

    const row = await User.findOne({
      where: {
        email: userEmail,
        password: userPassword,
      },
      attributes: { exclude: ['password'] },
    });

    if (!row) {
      return { code: 400, data: { message: 'Invalid fields' } };
    }
    return { code: 200, data: row };
  },

  generateToken(userEmail, userPassword) {
    const payload = {
      email: userEmail,
      password: userPassword,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
  },
};

module.exports = LoginS;