const ExpenseRepository = require('../repositories/ExpenseRepository');
const ProjectRepository = require('../repositories/ProjectRepository');
const { NotFoundError, ForbiddenError } = require('../Error/index');

class ExpenseService {
  static async addExpense(userId, projectId, expenseData) {
    return db.transaction(async trx => {
      const project = await ProjectRepository.findById(projectId);
      if (!project) throw new NotFoundError('Project not found');

      // Cek sisa budget
      const totalExpenses = await ExpenseRepository.getTotalExpenses(projectId);
      const remainingBudget = project.initial_budget - totalExpenses;
      
      if (expenseData.amount > remainingBudget) {
        throw new ForbiddenError('Expense exceeds remaining budget');
      }

      const expense = await ExpenseRepository.create({
        ...expenseData,
        project_id: projectId,
        created_by: userId
      });

      return expense;
    });
  }

  static async updateExpense(userId, expenseId, updates) {
    return db.transaction(async trx => {
      const expense = await ExpenseRepository.findById(expenseId);
      if (!expense) throw new NotFoundError('Expense not found');

      const project = await ProjectRepository.findById(expense.project_id);

      // Kembalikan budget lama
      const newRemaining = project.remaining_budget + expense.amount;
      await ProjectRepository.update(expense.project_id, { 
        remaining_budget: newRemaining 
      });

      // Validasi budget baru jika amount berubah
      if (updates.amount) {
        const totalExpenses = await ExpenseRepository.getTotalExpenses(expense.project_id);
        const remainingAfterUpdate = project.initial_budget - totalExpenses + expense.amount - updates.amount;
        
        if (remainingAfterUpdate < 0) {
          throw new ForbiddenError('Updated expense exceeds budget');
        }
      }

      const updatedExpense = await ExpenseRepository.update(expenseId, updates);

      // Update budget dengan perubahan baru
      await ProjectRepository.update(expense.project_id, { 
        remaining_budget: remainingAfterUpdate 
      });

      return updatedExpense;
    });
  }

  static async cancelExpense(userId, expenseId) {
    return db.transaction(async trx => {
      const expense = await ExpenseRepository.findById(expenseId);
      if (!expense) throw new NotFoundError('Expense not found');

      // Kembalikan budget
      const project = await ProjectRepository.findById(expense.project_id);
      await ProjectRepository.update(expense.project_id, {
        remaining_budget: project.remaining_budget + expense.amount
      });

      await ExpenseRepository.softDelete(expenseId);
    });
  }

  static async getExpenses(projectId) {
    return ExpenseRepository.getByProjectId(projectId);
  }
}

module.exports = ExpenseService;