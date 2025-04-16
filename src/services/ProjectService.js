const ProjectRepository = require('../repositories/ProjectRepository');
const { NotFoundError, ForbiddenError } = require('../errors');

class ProjectService {
  static async createProject(userId, projectData) {
    // Generate project number jika belum ada
    if (!projectData.project_number) {
      projectData.project_number = `PRJ-${Date.now()}`;
    }
    
    return ProjectRepository.create({
      ...projectData,
      created_by: userId,
      remaining_budget: projectData.initial_budget || 0
    });
  }

  static async getProject(userId, projectId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    
    // Tambahkan logic authorization jika diperlukan
    // if (project.created_by !== userId && !isAdmin) throw new ForbiddenError();
    
    return project;
  }

  static async updateProject(userId, projectId, updates) {
    const project = await this.getProject(userId, projectId);
    return ProjectRepository.update(project.id, updates);
  }

  static async deleteProject(userId, projectId) {
    await this.getProject(userId, projectId); // Validasi existence
    await ProjectRepository.softDelete(projectId);
  }

  static async listProjects(page, limit) {
    return ProjectRepository.listPaginated(page, limit);
  }
}

module.exports = ProjectService;