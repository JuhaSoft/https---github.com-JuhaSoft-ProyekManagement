// src/models/Attachment.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SubProject = require('./SubProject');

class Attachment extends Model {}

Attachment.init({
  file_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Attachment',
  tableName: 'attachments',
  timestamps: true
});

// Relasi dengan SubProject
Attachment.belongsTo(SubProject, { foreignKey: 'sub_project_id' });
SubProject.hasMany(Attachment, { foreignKey: 'sub_project_id' });

module.exports = Attachment;
