class ExpenseDTO {
    constructor(expense) {
      this.id = expense.id;
      this.projectId = expense.project_id;
      this.amount = expense.amount;
      this.expenseDate = expense.expense_date;
      this.description = expense.description;
      this.filePath = expense.file_path;
      this.createdBy = expense.created_by;
      this.createdAt = expense.created_at;
      this.updatedAt = expense.updated_at;
    }
  
    static fromArray(expenses) {
      return expenses.map(expense => new ExpenseDTO(expense));
    }
  
    static toDatabase(expenseData) {
      return {
        project_id: expenseData.projectId,
        amount: expenseData.amount,
        expense_date: expenseData.expenseDate,
        description: expenseData.description,
        file_path: expenseData.filePath,
        created_by: expenseData.createdBy,
      };
    }
  }
  
  module.exports = ExpenseDTO;