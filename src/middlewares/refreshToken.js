// src/middlewares/refreshToken.js
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const SECRET = process.env.JWT_SECRET || 'juhaway';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, { expiresIn: '7d' });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
