const ProjectMemberService = require('../services/ProjectMemberService');

exports.addMember = async (req, res) => {
  try {
    const member = await ProjectMemberService.addMember(
      req.user.id,
      req.params.projectId,
      req.body.user_id,
      req.body.role
    );
    res.status(201).json(member);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await ProjectMemberService.getMembers(req.params.projectId);
    res.json(members);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
exports.updateMemberRole = async (req, res) => {
  try {
    const result = await ProjectMemberService.updateMemberRole(
      req.user.id,
      req.params.projectId,
      req.params.userId,
      req.body.role
    );
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    await ProjectMemberService.removeMember(
      req.user.id,
      req.params.projectId,
      req.params.userId
    );
    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};