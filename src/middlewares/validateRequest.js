const { BadRequestError } = require('../Error/index');

/**
 * Middleware untuk validasi request body dengan Joi schema
 * @param {Joi.Schema} schema - Schema validasi Joi
 */
const validateRequest = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false, // Tampilkan semua error sekaligus
    allowUnknown: false, // Tidak boleh ada field tambahan
    stripUnknown: false // Jangan hapus field yang tidak divalidasi
  });

  if (error) {
    const errorMessages = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/['"]/g, '')
    }));
    
    throw new BadRequestError('Validation failed', errorMessages);
  }

  // Replace req.body dengan data yang sudah divalidasi
  req.body = value;
  next();
};

module.exports = validateRequest;