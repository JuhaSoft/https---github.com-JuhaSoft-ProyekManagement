const db = require("../config/db");
const bcrypt = require("bcryptjs");
const AppError = require('../utils/AppError'); // Assuming you have an AppError class for error handling
const getAllUsers = async () => {
  return await db("users").whereNull("deleted_at");
};

const getUserById = async (id) => {
  return await db("users").where({ id }).whereNull("deleted_at").first();
};
const createUser = async (userData) => {
    console.log("Creating user with data:", userData);
  
    // Cek apakah email sudah digunakan (tidak termasuk yang dihapus)
    const existingUser = await db('users')
      .where({ email: userData.email })
      .first();
  
    if (existingUser) {
      if (existingUser.deleted_at) {
        throw new AppError('Email pernah digunakan oleh akun yang sudah dihapus.', 409);
      } else {
        throw new AppError('Email sudah digunakan.', 409);
      }
    }
  
    // Hash password jika ada
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
  
    return await db('users').insert(userData);
  };

// const createUser = async (userData) => {
//     console.log("Creating user with data:", userData);
  
//     // Cek apakah email sudah digunakan
//     const existingUser = await db('users')
//       .where({ email: userData.email })
//       .whereNull('deleted_at')
//       .first();
  
//     if (existingUser) {
//       throw new Error('Email already registered.');
//     }
  
//     // Hash password jika ada
//     if (userData.password) {
//       userData.password = await bcrypt.hash(userData.password, 10);
//     }
  
//     return await db('users').insert(userData);
//   };
  

const updateUser = async (id, updateData) => {
  // Kalau user ingin update password, hash juga
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  return await db("users")
    .where({ id })
    .update({ ...updateData, updated_at: new Date() });
};

const deleteUser = async (id) => {
  return await db("users")
    .where({ id })
    .update({ deleted_at: new Date() });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
