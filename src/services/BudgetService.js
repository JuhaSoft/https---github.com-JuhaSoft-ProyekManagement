const BudgetRepository = require('../repositories/BudgetRepository');
const ProjectRepository = require('../repositories/ProjectRepository');
const { NotFoundError } = require('../Error');

class BudgetService {
  static async setBudget(userId, projectId, amount) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');

    const budget = await BudgetRepository.createOrUpdate(projectId, amount);
    
    // Update remaining_budget di project
    await ProjectRepository.update(projectId, { 
      initial_budget: amount,
      remaining_budget: amount 
    });

    return budget;
  }
  static async deleteBudget(projectId) {
    // Soft-delete budget
    await BudgetRepository.softDelete(projectId);
    
    // Reset budget proyek (tanpa hapus data)
    await ProjectRepository.update(projectId, { 
      initial_budget: 0,
      remaining_budget: 0 
    });
  }
}

module.exports = BudgetService;