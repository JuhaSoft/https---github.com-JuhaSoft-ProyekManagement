const { z } = require("zod");

const createUserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["super_admin", "admin", "user"]),
  max_login: z.number().int().min(1).default(2),
  max_devices: z.number().int().min(1).default(2),
  is_active: z.boolean().default(true),
});

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["super_admin", "admin", "user"]).optional(),
  max_login: z.number().int().min(1).optional(),
  max_devices: z.number().int().min(1).optional(),
  is_active: z.boolean().optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
