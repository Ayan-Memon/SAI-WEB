import express from "express";
import tryCatch from "../middlewares/tryCatch.middleware.js";
import { authCheck, authorizeRole } from "../middlewares/auth.middlewares.js";
import {
  getAllUsers,
  getUser,
  updateUserRole,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authCheck, tryCatch(getUser));
router.get(
  "/get-users",
  authCheck,
  authorizeRole("admin"),
  tryCatch(getAllUsers),
);
router.patch(
  "/update-role/:id",
  authCheck,
  authorizeRole("admin"),
  tryCatch(updateUserRole),
);

export default router;
