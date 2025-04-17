const db = require('.././../config/db'); // Adjust the path to your db config
const bcrypt = require('bcrypt');

const UserModel = {
  async findAll() {
    return await db('users').select('*');
  },

  async findById(id) {
    return await db('users').where({ id }).whereNull('deleted_at').first();
  },

  async findByEmail(email) {
    return await db('users').where({ email }).whereNull('deleted_at').first();
  },

  async create(data) {
    const [user] = await db('users').insert(data).returning('*');
    return user;
  },

  async update(id, data) {
    const [user] = await db('users').where({ id }).update(data).returning('*');
    return user;
  },

  async remove(id) {
    return await db('users').where({ id }).del();
  }
};

module.exports = UserModel;
