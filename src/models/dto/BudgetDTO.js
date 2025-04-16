class BudgetDTO {
    constructor(budget) {
      this.id = budget.id;
      this.projectId = budget.project_id;
      this.amount = budget.amount;
      this.limitPercentage = budget.limit_percentage;
      this.createdBy = budget.created_by;
      this.notes = budget.notes;
      this.createdAt = budget.created_at;
      this.updatedAt = budget.updated_at;
    }
  
    static fromArray(budgets) {
      return budgets.map(budget => new BudgetDTO(budget));
    }
  
    static toDatabase(budgetData) {
      return {
        project_id: budgetData.projectId,
        amount: budgetData.amount,
        limit_percentage: budgetData.limitPercentage || 90.0,
        created_by: budgetData.createdBy,
        notes: budgetData.notes,
      };
    }
  }
  
  module.exports = BudgetDTO;