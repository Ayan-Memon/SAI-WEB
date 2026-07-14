import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import mongoSanitize from "@exortek/express-mongo-sanitize";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import facultyRouter from "./routes/faculty.route.js";
import { multerErrorHandler } from "./middlewares/upload.middleware.js";
import { FRONTEND_URL } from "./config/config.js";

const app = express();

// middlewares
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);
app.use(mongoSanitize());
app.use(multerErrorHandler);

// auth router
app.use("/api/auth", authRouter);

// user router
app.use("/api/user", userRouter);

// post router
app.use("/api/post", postRouter);

// faculty router
app.use("/api", facultyRouter);

// global error handler — ensures any next(error) call still returns
// clean JSON (and the correct status code) instead of Express's
// default HTML/500 response
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});


export default app;
