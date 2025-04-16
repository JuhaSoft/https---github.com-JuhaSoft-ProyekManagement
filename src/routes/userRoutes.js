const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/authenticateToken');
const authorizeRoles = require('../middlewares/authorizeRoles');
const verifyToken  = require('../middlewares/verifyToken');
const sendDataWithToken = require('../middlewares/sendDataWithToken') 
const UserModel = require('../models/models/User');
// // Mengambil semua pengguna
// router.get('/', (req, res) => {
//     res.json({ message: 'Ini adalah daftar pengguna' });
//   });
// Endpoint untuk mendapatkan semua user
router.get("/", userController.getAllUsers);

// Endpoint untuk mendapatkan user berdasarkan ID
router.get("/:id", userController.getUserById);

// Endpoint untuk membuat user baru
router.post("/",
    authenticateToken,
    verifyToken,
    sendDataWithToken,
    authorizeRoles('super_admin'),
     userController.createUser);

// Endpoint untuk update user berdasarkan ID
router.put("/:id", userController.updateUser);

// Endpoint untuk menghapus user berdasarkan ID
router.delete("/:id",authenticateToken,
    verifyToken,
    sendDataWithToken, userController.deleteUser);




//     const newToken = response.headers.get('x-access-token');
// if (newToken) {
//   localStorage.setItem('access_token', newToken);
// }


module.exports = router;
