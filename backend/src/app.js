import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import mongoSanitize from "@exortek/express-mongo-sanitize";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import facultyRouter from "./routes/faculty.route.js";
import { multerErrorHandler } from "./middlewares/upload.middleware.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.100.116:3000"],
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

export default app;
