const { z } = require("zod");

const loginSchema = z.object({
  username: z
    .string({
      required_error: "email is required",
      invalid_type_error: "must be a email type",
    })
    .email()
    .min(6, {
      message: "uername must be at least 6 charactes",
    })
    .trim()
    .toLowerCase(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(6, {
      message: "password must be at least 6 characters",
    })
    .trim(),
});

module.exports = loginSchema;
