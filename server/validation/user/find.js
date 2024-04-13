const { z } = require("zod");

const findUserSchema = z.object({
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
});

module.exports = findUserSchema;
