const db = require('../config/db');
const UserDTO = require('../models/dto/UserDTO');

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
    // Ganti hard delete dengan soft-delete
    await db(this.tableName)
      .where({ project_id: projectId, user_id: userId })
      .update({ deleted_at: new Date() });
  }
  
  static async getMembers(projectId) {
    return db(this.tableName)
      .where({ project_id: projectId })
      .whereNull('deleted_at') // Hanya ambil yang tidak terhapus
      .join('users', 'project_members.user_id', 'users.id')
      .select('users.*', 'project_members.role');
  }
  static async removeMember(projectId, userId) {
    // Ganti hard delete dengan soft-delete
    await db(this.tableName)
      .where({ project_id: projectId, user_id: userId })
      .update({ deleted_at: new Date() });
  }
  
  static async getMembers(projectId) {
    return db(this.tableName)
      .where({ project_id: projectId })
      .whereNull('deleted_at') // Hanya ambil yang tidak terhapus
      .join('users', 'project_members.user_id', 'users.id')
      .select('users.*', 'project_members.role');
  }
}
module.exports = ProjectMemberRepository;