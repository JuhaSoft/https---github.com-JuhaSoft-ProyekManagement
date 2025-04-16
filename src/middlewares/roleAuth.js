// middleware/roleAuth.js
const roleAuth = (roles) => {
    return (req, res, next) => {
      const user = req.user; // Asumsi user sudah ada di request (setelah auth)
      
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      
      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" }); // Forbidden jika role tidak sesuai
      }
  
      next();
    };
  };
  
  module.exports = roleAuth;
  