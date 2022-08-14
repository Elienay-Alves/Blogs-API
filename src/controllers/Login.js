const LoginS = require('../services/Login');

const LoginC = {
  async post(req, res) {
    const { email, password } = req.body;
    const { code, data } = await LoginS.getUserByEmail(email, password);

    if (code === 200) {
      const token = LoginS.generateToken(data);

      return res.status(code).json({ token });
    }
    
    res.status(code).json(data);
  },
};

module.exports = LoginC;