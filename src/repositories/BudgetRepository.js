const db = require('../config/db');

class BudgetRepository {
  static tableName = 'budgets';

  static async findByProjectId(projectId) {
    return db(this.tableName).where({ project_id: projectId }).whereNull('deleted_at').first();
  }

  static async createOrUpdate(projectId, amount) {
    const existing = await this.findByProjectId(projectId).whereNull('deleted_at');
    
    if (existing) {
      const [budget] = await db(this.tableName)
        .where({ project_id: projectId })
        .update({ amount })
        .returning('*');
      return budget;
    } else {
      const [budget] = await db(this.tableName)
        .insert({ project_id: projectId, amount })
        .returning('*');
      return budget;
    }
  }
  static async softDelete(projectId) {
    await db(this.tableName)
      .where({ project_id: projectId })
      .update({ deleted_at: new Date() });
  }
  
  static async findByProjectId(projectId) {
    return db(this.tableName)
      .where({ project_id: projectId })
      .whereNull('deleted_at') // Hanya ambil yang aktif
      .first();
  }
  static async softDelete(projectId) {
  await db(this.tableName)
    .where({ project_id: projectId })
    .update({ deleted_at: new Date() });
}

static async findByProjectId(projectId) {
  return db(this.tableName)
    .where({ project_id: projectId })
    .whereNull('deleted_at') // Hanya ambil yang aktif
    .first();
}
}

module.exports = BudgetRepository;