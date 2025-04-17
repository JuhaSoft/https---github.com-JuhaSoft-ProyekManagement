const db = require('../config/db');
const ExpenseDTO = require('../models/dto/ExpenseDTO'); // Adjust the path to your DTO

class ExpenseRepository {
  static tableName = 'expenses';

  static async create(expenseData) {
    const [expense] = await db(this.tableName)
      .insert(expenseData)
      .returning('*');
    return new ExpenseDTO(expense);
  }

  static async findById(id) {
    const expense = await db(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .first();
    return expense ? new ExpenseDTO(expense) : null;
  }

  static async getByProjectId(projectId) {
    const expenses = await db(this.tableName)
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .orderBy('expense_date', 'desc');
    return ExpenseDTO.fromArray(expenses);
  }

  static async update(id, updates) {
    const [expense] = await db(this.tableName)
      .where({ id })
      .whereNull('deleted_at')
      .update(updates)
      .returning('*');
    return expense ? new ExpenseDTO(expense) : null;
  }

  static async softDelete(id) {
    await db(this.tableName)
      .where({ id })
      .update({ deleted_at: new Date() });
  }

  static async getTotalExpenses(projectId) {
    const result = await db(this.tableName)
      .where({ project_id: projectId })
      .whereNull('deleted_at')
      .sum('amount as total')
      .first();
    return parseFloat(result.total) || 0;
  }
}

module.exports = ExpenseRepository;