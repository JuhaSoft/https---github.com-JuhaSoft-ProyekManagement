// src/models/SubProject.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Project = require('./Project');

class SubProject extends Model {}

SubProject.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'not started'
  }
}, {
  sequelize,
  modelName: 'SubProject',
  tableName: 'sub_projects',
  timestamps: true
});

// Relasi dengan Project
SubProject.belongsTo(Project, { foreignKey: 'project_id' });
Project.hasMany(SubProject, { foreignKey: 'project_id' });

module.exports = SubProject;
