const db = require('.././../config/db'); 

class Expense {
  static tableName = 'expenses';

  static async create(expenseData) {
    return db(this.tableName).insert(expenseData).returning('*');
  }

  static async findById(id) {
    return db(this.tableName).where({ id }).whereNull('deleted_at').first();
  }

  static async findByProjectId(projectId) {
    return db(this.tableName).where({ project_id: projectId }).whereNull('deleted_at');
  }

  static async update(id, updates) {
    return db(this.tableName).where({ id }).update(updates).returning('*');
  }

  static async delete(id) {
    return db(this.tableName).where({ id }).update({ deleted_at: new Date() });
  }

  static async getTotalExpenses(projectId) {
    const result = await db(this.tableName)
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .sum('amount as total')
      .first();

    return result.total || 0;
  }
}

module.exports = Expense;