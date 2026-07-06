import express from "express";
import tryCatch from "../middlewares/tryCatch.middleware.js";
import {
  login,
  refreshToken,
  register,
  forgetPasswordRequest,
  verifyEmail,
  loginOut,
  loginOutAll,
  forgetPassword,
  sendVerificationEmail,
} from "../controllers/auth.controller.js";
import { createRateLimiter } from "../utils/rateLimiter.js";

const loginLimiter = createRateLimiter({
  minutes: 15,
  maxAttempts: 10,
  handler: (req, res) =>
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again later.",
    }),
});
const verifyEmailLimiter = createRateLimiter({
  minutes: 15,
  maxAttempts: 3,
  handler: (req, res) =>
    res.status(429).json({
      success: false,
      message: "Too many email requests. Try again later.",
    }),
});
const forgetPasswordLimiter = createRateLimiter({
  minutes: 15,
  maxAttempts: 3,
  handler: (req, res) =>
    res.status(429).json({
      success: false,
      message: "Too many reset requests. Try again later.",
    }),
});

// rate limiters middlewares

const router = express.Router();

router.post("/register", tryCatch(register));
router.post("/login", loginLimiter, tryCatch(login));
router.post("/refresh-token", tryCatch(refreshToken));
router.get("/verify-email", tryCatch(verifyEmail));
router.post(
  "/resend-email",
  verifyEmailLimiter,
  tryCatch(sendVerificationEmail),
);
router.post(
  "/forget-password",
  forgetPasswordLimiter,
  tryCatch(forgetPasswordRequest),
);
router.post("/reset-password", tryCatch(forgetPassword));
router.post("/login-out", tryCatch(loginOut));
router.post("/login-out-all", tryCatch(loginOutAll));

export default router;
