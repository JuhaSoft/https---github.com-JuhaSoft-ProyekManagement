// src/models/Project.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Project extends Model {}

Project.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'ongoing'
  }
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'projects',
  timestamps: true
});

module.exports = Project;
