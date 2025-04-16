const Joi = require('joi');

const projectSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  orderNumber: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  start_date: Joi.date().iso().required(),
  end_date: Joi.date().iso().greater(Joi.ref('start_date')) // end_date harus lebih besar dari start_date
    .messages({
      'date.greater': 'Tanggal akhir harus setelah tanggal mulai'
    }),
  customer_name: Joi.string().max(255).optional(),
  location: Joi.string().max(255).optional(),
  initial_budget: Joi.number().min(0).optional(),
  warning_days_before_deadline: Joi.number().min(1).default(7)
});

module.exports = {
  createProject: projectSchema,
  updateProject: projectSchema.keys({
    name: Joi.string().min(3).max(255).optional(),
    start_date: Joi.date().iso().optional()
  })
};