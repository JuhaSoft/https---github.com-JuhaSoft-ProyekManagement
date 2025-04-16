const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'rahasia_super_aman';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // disimpan untuk dipakai di route berikutnya
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authenticateToken;
