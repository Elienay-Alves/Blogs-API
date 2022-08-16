const LoginS = require('../services/Login');

const LoginC = {
  async login(req, res) {
    const data = await LoginS.validateBody(req.body);
    const user = await LoginS.getUserByEmail(data);
    const token = LoginS.generateToken(user);
    
    res.status(200).json({ token });
  },
};

module.exports = LoginC;