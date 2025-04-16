const _ = require('lodash');
class ProjectDTO {
  constructor(project) {
    this.id = project.id;
    this.projectNumber = project.project_number;
    
    this.name = project.name;
    this.orderNumber = project.orderNumber;
    this.description = project.description;
    this.startDate = project.start_date;
    this.endDate = project.end_date;
    this.customerName = project.customer_name;
    this.location = project.location;
    this.warningDaysBeforeDeadline = project.warning_days_before_deadline;
    this.createdBy = project.created_by;
    this.createdAt = project.created_at;
    this.updatedAt = project.updated_at;
    this.initialBudget = project.initial_budget;
    this.remainingBudget = project.remaining_budget;
    this.projectCode = project.project_code;
  }

  static fromArray(projects) {
    return projects.map(project => new ProjectDTO(project));
  }



  static toDatabase(projectData) {
    // Log data yang diterima oleh toDatabase
    console.log('Input to toDatabase:', projectData);
  
    // Konversi properti dari camelCase ke snake_case
    const snakeCaseData = _.mapKeys(projectData, (value, key) => _.snakeCase(key));
  
    // Log hasil konversi ke snake_case
    console.log('Converted to snake_case:', snakeCaseData);
  
    return {
      project_number: snakeCaseData.project_number || `PRJ-${Date.now()}`,
      name: snakeCaseData.name,
      orderNumber: snakeCaseData.order_number, // Pastikan ini sesuai dengan snake_case
      description: snakeCaseData.description,
      start_date: snakeCaseData.start_date,
      end_date: snakeCaseData.end_date,
      customer_name: snakeCaseData.customer_name,
      location: snakeCaseData.location,
      warning_days_before_deadline: snakeCaseData.warning_days_before_deadline || 7,
      created_by: snakeCaseData.created_by,
      initial_budget: snakeCaseData.initial_budget,
      remaining_budget: snakeCaseData.remaining_budget || snakeCaseData.initial_budget,
      project_code: snakeCaseData.project_code,
    };
  }
}

module.exports = ProjectDTO;