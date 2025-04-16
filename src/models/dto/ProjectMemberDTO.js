class ProjectMemberDTO {
    constructor(member) {
      this.userId = member.user_id;
      this.projectId = member.project_id;
      this.role = member.role;
      this.receiveEmail = member.receive_email === 1;
      this.user = member.name ? { 
        id: member.id, 
        name: member.name, 
        email: member.email 
      } : null;
    }
  
    static fromArray(members) {
      return members.map(member => new ProjectMemberDTO(member));
    }
  }
  
  module.exports = ProjectMemberDTO;