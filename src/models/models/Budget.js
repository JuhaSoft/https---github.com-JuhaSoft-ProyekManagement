const db = require('.././../config/db'); // Adjust the path to your db config

class Budget {
  static tableName = 'budgets';

  static async create(budgetData) {
    return db(this.tableName).insert(budgetData).returning('*');
  }

  static async findByProjectId(projectId) {
    return db(this.tableName).where({ project_id: projectId }).first();
  }

  static async updateByProjectId(projectId, updates) {
    return db(this.tableName)
      .where({ project_id: projectId })
      .update(updates)
      .returning('*');
  }

  static async deleteByProjectId(projectId) {
    return db(this.tableName)
      .where({ project_id: projectId })
      .update({ deleted_at: new Date() });
  }
}

module.exports = Budget;