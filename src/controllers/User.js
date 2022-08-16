const UserS = require('../services/User');
const LoginS = require('../services/Login');

const UserC = {
  async create(req, res) {
    await UserS.validateBody(req.body);
    await UserS.getUser(req.body);

    const newUser = UserS.create(req.body);
    const token = await LoginS.generateToken(newUser);

    res.status(201).json({ token });
  },
};

module.exports = UserC;