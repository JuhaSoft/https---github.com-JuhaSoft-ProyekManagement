// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { generateAccessToken } = require('../middlewares/refreshToken');
const rateLimit = require('express-rate-limit'); // Import rate limiter
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 menit
    max: 5, // Maksimum 5 request per IP
    message: 'Terlalu banyak percakapan login dari IP ini. Coba lagi setelah 15 menit.',
    standardHeaders: true,
    legacyHeaders: false,
  });
// Login Endpoint
router.post('/login',loginLimiter, AuthController.login);
router.post('/logout', AuthController.logout);
// Refresh Token Endpoint
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    // Verifikasi refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // Cek user aktif di database
    const user = await db('users')
      .where({ id: decoded.id })
      .whereNull('deleted_at')
      .andWhere('is_active', true)
      .first();

    if (!user) {
      return res.status(403).json({ message: 'User not found or inactive' });
    }

    // Generate access token baru
    const newAccessToken = generateAccessToken(user);

    // Kirim access token baru ke client
    res.json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
});

module.exports = router;
