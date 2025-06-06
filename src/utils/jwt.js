// src/utils/jwt.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'juhaway';

const generateToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = {
  generateToken,
  verifyToken
};
