const jwt = require('jsonwebtoken');
const db = require('../config/db');
const SECRET = process.env.JWT_SECRET || 'juhaway';

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' });
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token not provided' });

  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await db('users')
      .where({ id: decoded.id })
      .whereNull('deleted_at')
      .andWhere('is_active', true)
      .first();

    if (!user) {
      return res.status(403).json({ message: 'User not authorized or deleted' });
    }

    req.user = user;

    // 🟡 Check apakah token akan expired dalam 10 menit
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const remainingTime = decoded.exp - currentTimestamp;

    if (remainingTime < 600) {
      // Kurang dari 10 menit, generate token baru
      const newAccessToken = generateAccessToken(user);
      res.locals.newAccessToken = newAccessToken;
    }

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
