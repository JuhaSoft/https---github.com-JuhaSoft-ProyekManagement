const Joi = require('joi');
const { parse, isBefore } = require('date-fns');

const expenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().max(255).required(),
  expense_date: Joi.date().iso().default(new Date()),
  file_path: Joi.string().uri().optional()
});

module.exports = {
  createExpense: expenseSchema,
  updateExpense: expenseSchema.keys({
    amount: Joi.number().positive().optional(),
    description: Joi.string().max(255).optional()
  })
};