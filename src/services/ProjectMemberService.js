const ProjectMemberRepository = require('../repositories/ProjectMemberRepository');
const ProjectRepository = require('../repositories/ProjectRepository');
const { NotFoundError, ForbiddenError } = require('../Error');

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
  static async updateMemberRole(requesterId, projectId, userId, newRole) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
  
    // Authorization: Hanya admin/project owner yang bisa update
    if (project.created_by !== requesterId) {
      throw new ForbiddenError('Only project owner can update roles');
    }
  
    await db('project_members')
      .where({ project_id: projectId, user_id: userId })
      .update({ role: newRole });
  
    return { userId, newRole };
  }
  
  static async removeMember(requesterId, projectId, userId) {
    const project = await ProjectRepository.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
  
    // Authorization: Hanya admin/project owner yang bisa hapus
    if (project.created_by !== requesterId) {
      throw new ForbiddenError('Only project owner can remove members');
    }
  
    await ProjectMemberRepository.removeMember(projectId, userId);
  }
}

module.exports = ProjectMemberService;