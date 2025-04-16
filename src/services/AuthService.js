const db = require('../config/db'); // pastikan menggunakan knex dari config/db.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logActivity } = require('../services/logService');

const SECRET = process.env.JWT_SECRET || 'juhaway';

const login = async (email, password) => {
  try {
    // Mengambil data user berdasarkan email
    const user = await db('users') // Menggunakan knex untuk query ke tabel users
      .where({ email })
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    // Memeriksa kecocokan password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    await logActivity(user.id, 'LOGIN', 'User logged in successfully.');
    // Membuat token JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      SECRET,
      { expiresIn: '1h' }
    );

    // Jangan kembalikan password dan informasi sensitif lainnya
    const {
      password: pw,
      device_hash_1,
      device_hash_2,
      deleted_at,
      ...safeUser
    } = user;

    return { token, user: safeUser };
  } catch (error) {
    throw new Error(error.message);
  }
};
const logout = async (refreshToken) => {
  await db('refresh_tokens') // ← nama tabel sesuai yang kamu pakai
    .where({ token: refreshToken })
    .del();
};
module.exports = {
  login,logout
};
