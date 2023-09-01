const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: ({ id, email }) => {
    return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_KEY);
  },
  verifyToken: (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
  },
};
