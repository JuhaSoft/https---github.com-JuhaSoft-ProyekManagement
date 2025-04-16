const db = require('../config/db');
const UserDTO = require('../dtos/UserDTO');

class ProjectMemberRepository {
  static tableName = 'project_members';

  static async addMember(projectId, userId, role = 'member') {
    const [member] = await db(this.tableName)
      .insert({ project_id: projectId, user_id: userId, role })
      .returning('*');
    return member;
  }

  static async getMembers(projectId) {
    const members = await db(this.tableName)
      .where({ project_id: projectId })
      .join('users', 'project_members.user_id', 'users.id')
      .select('users.*', 'project_members.role');
    return UserDTO.fromArray(members);
  }

  static async removeMember(projectId, userId) {
    await db(this.tableName)
      .where({ project_id: projectId, user_id: userId })
      .del();
  }
}

module.exports = ProjectMemberRepository;