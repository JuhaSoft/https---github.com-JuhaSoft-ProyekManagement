const ProjectMemberRepository = require('../repositories/ProjectMemberRepository');
const ProjectRepository = require('../repositories/ProjectRepository');
const { NotFoundError, ForbiddenError } = require('../errors');

class ProjectMemberService {
  static async addMember(requesterId, projectId, userId, role) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');

    // Authorization: Hanya admin/project owner yang bisa tambah anggota
    if (project.created_by !== requesterId) {
      throw new ForbiddenError('Only project owner can add members');
    }

    return ProjectMemberRepository.addMember(projectId, userId, role);
  }

  static async getMembers(projectId) {
    return ProjectMemberRepository.getMembers(projectId);
  }
}

module.exports = ProjectMemberService;