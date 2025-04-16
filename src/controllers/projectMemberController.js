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