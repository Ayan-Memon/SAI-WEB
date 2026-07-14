import express from "express";
import tryCatch from "../middlewares/tryCatch.middleware.js";
import { authCheck, authorizeRole } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/upload.middleware.js";
import {
  deleteFaculty,
  getAllFaculties,
  getFacultiesByDepartment,
  uploadFaculty,
  getAllDepartments,
} from "../controllers/faculty.controller.js";

const router = express.Router();

router.get("/faculties", tryCatch(getAllFaculties));
router.get("/faculties/departments", tryCatch(getAllDepartments));
router.get("/faculties/:department", tryCatch(getFacultiesByDepartment));
router.post(
  "/upload-faculty",
  authCheck,
  authorizeRole("admin", "social_handler"),
  upload.single("image"),
  tryCatch(uploadFaculty),
);
router.delete(
  "/faculty/:id",
  authCheck,
  authorizeRole("admin", "social_handler"),
  tryCatch(deleteFaculty),
);

export default router;
