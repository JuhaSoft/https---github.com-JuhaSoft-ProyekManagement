const AuthService = require('../services/AuthService');
const { logActivity } = require('../services/logService');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AuthService.login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
console.log("Logout request received:", refreshToken); // Debugging log
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }

  try {
    await AuthService.logout(refreshToken);
    res.status(200).json({ message: "Logout successful. Token revoked." });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  login,
  logout, // ← tambahkan ini
};
