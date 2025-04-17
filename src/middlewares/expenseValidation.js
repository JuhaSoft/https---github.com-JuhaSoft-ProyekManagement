const Joi = require('joi');

const expenseSchema = Joi.object({
  amount: Joi.number().positive().required()
    .messages({
      'number.positive': 'Amount must be positive',
      'any.required': 'Amount is required'
    }),
  description: Joi.string().max(255).required(),
  expense_date: Joi.date().iso().default(new Date()),
  file_path: Joi.string().uri().optional()
}).options({ abortEarly: false });

module.exports = {
  createExpense: expenseSchema,
  updateExpense: expenseSchema.keys({
    amount: Joi.number().positive().optional(),
    description: Joi.string().max(255).optional()
  })
};