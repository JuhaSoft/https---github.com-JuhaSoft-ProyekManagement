const db = require('../config/db');

class BudgetRepository {
  static tableName = 'budgets';

  static async findByProjectId(projectId) {
    return db(this.tableName).where({ project_id: projectId }).first();
  }

  static async createOrUpdate(projectId, amount) {
    const existing = await this.findByProjectId(projectId);
    
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
}

module.exports = BudgetRepository;