const db = require('.././../config/db');
 

class ProjectMember {
  static tableName = 'project_members';

  static async addMember(projectId, userId, role) {
    return db(this.tableName)
      .insert({
        project_id: projectId,
        user_id: userId,
        role,
      })
      .returning('*');
  }

  static async removeMember(projectId, userId) {
    return db(this.tableName)
      .where({ project_id: projectId, user_id: userId })
      .del();
  }

  static async updateRole(projectId, userId, role) {
    return db(this.tableName)
      .where({ project_id: projectId, user_id: userId })
      .update({ role })
      .returning('*');
  }

  static async getMembers(projectId) {
    return db(this.tableName)
      .where({ project_id: projectId })
      .join('users', 'project_members.user_id', 'users.id')
      .select('users.*', 'project_members.role', 'project_members.receive_email');
  }

  static async getProjectsForUser(userId) {
    return db(this.tableName)
      .where({ user_id: userId })
      .join('projects', 'project_members.project_id', 'projects.id')
      .select('projects.*', 'project_members.role');
  }
}

module.exports = ProjectMember;