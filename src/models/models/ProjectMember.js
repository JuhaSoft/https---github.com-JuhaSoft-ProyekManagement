// src/models/ProjectMember.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Project = require('./Project');

class ProjectMember extends Model {}

ProjectMember.init({
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ProjectMember',
  tableName: 'project_members',
  timestamps: true
});

// Relasi dengan Project dan User
ProjectMember.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(ProjectMember, { foreignKey: 'user_id' });

ProjectMember.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(ProjectMember, { foreignKey: 'project_id' });

module.exports = ProjectMember;
