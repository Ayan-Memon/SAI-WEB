import * as z from "zod";

export const registerZodSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be at most 20 characters long" }),
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
  confirmPassword: z.string().trim(),
});

export const loginZodSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim(),
});

export const emailZodSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
});

export const forgetPasswordZodSchema = z.object({
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
  confirmPassword: z.string().trim(),
  passwordResetToken: z.string().trim(),
});
export const zodErrorValidator = (validation, res) => {
  const zodError = validation.error;
  let firstErrorMessage = "Validation Error";
  let allError = [];

  if (zodError.issues && Array.isArray(zodError.issues)) {
    allError = zodError.issues.map((issue) => ({
      field: issue.path ? issue.path.join(".") : "unknown",
      message: issue.message || "Validation Error",
      code: issue.code,
    }));
  }

  firstErrorMessage = allError[0]?.message || firstErrorMessage;

  return res.status(400).json({
    message: firstErrorMessage,
    error: allError,
  });
};
