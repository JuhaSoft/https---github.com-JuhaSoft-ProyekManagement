const db = require('../config/db');
const logActivity = async (userId, action, description) => {
    await db('logs').insert({
      user_id: userId,
      action,
      description,
      created_at: new Date(),
    });
  };
  
  module.exports = { logActivity };