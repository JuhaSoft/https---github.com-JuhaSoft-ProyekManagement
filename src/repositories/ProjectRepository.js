const db = require('../config/db');
const ProjectDTO = require('../models/dto/ProjectDTO');

class ProjectRepository {
  static tableName = 'projects';

  static async create(projectData) {
    const [project] = await db(this.tableName)
      .insert(projectData)
      .returning('*');
    return new ProjectDTO(project);
  }

  static async findById(id) {
    const project = await db(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .first();
    return project ? new ProjectDTO(project) : null;
  }

  static async listPaginated(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const projects = await db(this.tableName)
      .whereNull('deleted_at')
      .limit(limit)
      .offset(offset);
    return ProjectDTO.fromArray(projects);
  }

  static async update(id, updates) {
    const [project] = await db(this.tableName)
      .where({ id })
      .update(updates)
      .returning('*');
    return project ? new ProjectDTO(project) : null;
  }

  static async softDelete(id) {
    await db(this.tableName)
      .where({ id })
      .update({ deleted_at: new Date() });
  }
}

module.exports = ProjectRepository;