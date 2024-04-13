const { z } = require("zod");
const updateSchema = z.object({
  firstname: z
    .string({
      required_error: "first name is required",
      invalid_type_error: "first name must be a string",
    })
    .trim()
    .optional(),
  lastname: z
    .string({
      required_error: "last name is required",
      invalid_type_error: "last name must be a string",
    })
    .trim()
    .optional(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(6, {
      message: "password must be at least 6 characters",
    })
    .trim()
    .optional(),
});

module.exports = updateSchema;
