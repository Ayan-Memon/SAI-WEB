import rateLimit from "express-rate-limit";

export const createRateLimiter = ({
  minutes = 15,
  maxAttempts = 5,
  message = "Too many requests",
}) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,

    max: maxAttempts,

    message: {
      success: false,
      message,
    },

    standardHeaders: true,
    legacyHeaders: false,
  });
};
