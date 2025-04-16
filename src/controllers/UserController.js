const userService = require('../services/UserService');
const roleAuth = require('../middlewares/roleAuth');
const sendDataWithToken = require('../middlewares/sendDataWithToken')
const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
  
      const safeUsers = users.map(user => {
        const {
          password, // jangan disertakan
          device_hash_1,
          device_hash_2,
          deleted_at,
          ...safeData
        } = user;
        return safeData;
      });
  
      res.status(200).json({ users: safeUsers });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Destructure untuk buang field sensitif
      const {
        password,
        device_hash_1,
        device_hash_2,
        deleted_at,
        ...safeUser
      } = user;
  
      res.status(200).json({ user: safeUser });
  
    } catch (error) {
      console.error("Error fetching user by id:", error);
      return res.status(500).json({ error: "Failed to fetch user" });
    }
  };
  

// const createUser = async (req, res) => {
//   const { name, email, password, role, max_login, max_devices } = req.body;
//   try {
//     const userData = {
//       name,
//       email,
//       password, // Password hash-nya nanti ditangani di service
//       role,
//       max_login,
//       max_devices,
//       is_active: 1,
//       created_at: new Date(),
//       updated_at: new Date(),
//     };

//     await userService.createUser(userData);
//     return res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ error: "Failed to create user" });
//   }
// };
const createUser = async (req, res) => {
    const { name, email, password, role, max_login, max_devices } = req.body;
  
    try {
      const userData = {
        name,
        email,
        password,
        role,
        max_login,
        max_devices,
        is_active: 1,
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      await userService.createUser(userData);
  
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error.message);
  
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
  
      return res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
  };
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userService.updateUser(id, updateData);
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await userService.deleteUser(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
