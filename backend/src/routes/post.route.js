import express from "express";
import tryCatch from "../middlewares/tryCatch.middleware.js";
import { authCheck, authorizeRole } from "../middlewares/auth.middlewares.js";
import {
  getPostByFolderName,
  getAllFolderNames,
  uploadPosts,
  deletePost,
} from "../controllers/posts.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/get-posts", tryCatch(getPostByFolderName));
router.post(
  "/upload-posts",
  authCheck,
  authorizeRole("admin", "social_handler"),
  upload.array("images"),
  tryCatch(uploadPosts),
);
router.get(
  "/get-folder-names",
  tryCatch(getAllFolderNames),
);

router.delete(
  "/delete-post/:id",
  authCheck,
  authorizeRole("admin"),
  tryCatch(deletePost),
);

export default router;
