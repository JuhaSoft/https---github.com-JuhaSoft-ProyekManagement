const Project = require("../models/models/Project");
const ProjectDTO = require("../models/dto/ProjectDTO");
const {
  createProject,
  updateProject,
} = require("../validations/projectValidation");
const _ = require("lodash");
// Helper untuk handle error validasi
const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details[0].message });
  next();
};

exports.createProject = [
  validateRequest(createProject),
  async (req, res) => {
    try {
      // Konversi req.body dari snake_case ke camelCase
      const camelCaseBody = _.mapKeys(req.body, (value, key) =>
        _.camelCase(key)
      );

      // Gunakan ProjectDTO.toDatabase untuk mempersiapkan data
      const projectData = ProjectDTO.toDatabase({
        ...camelCaseBody,
        createdBy: req.user.id, // Pastikan ini sesuai dengan camelCase
      });

      console.log("Request body:", req.body);
      console.log("Converted camelCaseBody:", camelCaseBody);
      console.log("projectData1:", projectData);

      // Simpan data ke database
      const insertResult = await Project.create(projectData);

      // Ambil ID dari data yang baru saja dimasukkan
      const newProjectId = insertResult.insertId;
      console.log("newProjectId", newProjectId);
      if (!newProjectId) {
        throw new Error("Gagal mendapatkan ID proyek yang baru saja dibuat.");
      }

      // // Ambil data proyek yang baru saja dibuat
      const newProject = await Project.findById(newProjectId);

      // Kirim respons dengan pesan sukses dan data proyek baru
      res.status(201).json({
        message: "Proyek berhasil dibuat",
        data: new ProjectDTO(newProject),
      });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Gagal membuat proyek" });
    }
  },
];

exports.getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const projects = await Project.listPaginated(page, limit);
    res.json(ProjectDTO.fromArray(projects));
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil daftar proyek" });
  }
};

exports.getProjectDetails = async (req, res) => {
  try {
    const project = await Project.getWithMembers(req.params.id);
    if (!project)
      return res.status(404).json({ error: "Proyek tidak ditemukan" });
    res.json(new ProjectDTO(project));
  } catch (error) {
    res.status(500).json({ error: "Gagal mengambil detail proyek" });
  }
};

exports.updateProject = [
  validateRequest(updateProject),
  async (req, res) => {
    try {
      const updated = await Project.update(
        req.params.id,
        ProjectDTO.toDatabase(req.body)
      );
      if (!updated)
        return res.status(404).json({ error: "Proyek tidak ditemukan" });
      res.json(new ProjectDTO(updated[0]));
    } catch (error) {
      res.status(500).json({ error: "Gagal memperbarui proyek" });
    }
  },
];

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await Project.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Proyek tidak ditemukan" });
    res.json({ message: "Proyek berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ error: "Gagal menghapus proyek" });
  }
};
