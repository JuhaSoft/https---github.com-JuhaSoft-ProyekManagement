const db = require(".././../config/db"); // Adjust the path to your db config
const bcrypt = require("bcrypt");

class Project {
  static tableName = "projects";

  static async create(projectData) {
    const [result] = await db(this.tableName).insert(projectData);
    console.log("projectData", projectData); // Debugging
    return { insertId: result }; // Pastikan mengembalikan insertId
  }

  static async findById(id) {
    console.log("Finding project by ID:", id); // Debugging
    return db(this.tableName).where({ id }).first();
  }
  static async findByProjectNumber(projectNumber) {
    return db(this.tableName).where({ project_number: projectNumber }).first();
  }
  static async findBy(orderNumber) {
    return db(this.tableName).where({ orderNumber: orderNumber }).first();
  }
  static async update(id, updates) {
    return db(this.tableName).where({ id }).update(updates).returning("*");
  }

  static async delete(id) {
    return db(this.tableName).where({ id }).update({ deleted_at: new Date() });
  }

  static async list() {
    return db(this.tableName).whereNull("deleted_at");
  }

  static async getWithMembers(id) {
    const project = await this.findById(id);
    if (!project) return null;

    const members = await db("project_members")
      .where({ project_id: id })
      .join("users", "project_members.user_id", "users.id")
      .select(
        "users.*",
        "project_members.role",
        "project_members.receive_email"
      );

    return { ...project, members };
  }
  static async listPaginated(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return db(this.tableName)
      .whereNull("deleted_at")
      .limit(limit)
      .offset(offset)
      .orderBy("created_at", "desc");
  }

  static async getWithMembers(id) {
    const [project, members] = await Promise.all([
      db(this.tableName).where({ id }).first(),
      db("project_members")
        .where({ project_id: id })
        .join("users", "project_members.user_id", "users.id")
        .select(
          "users.id",
          "users.name",
          "users.email",
          "project_members.role"
        ),
    ]);

    return project ? { ...project, members } : null;
  }
}

module.exports = Project;
