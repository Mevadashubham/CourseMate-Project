import express from "express";
import multer from "multer";
import * as adminController from "../controllers/adminController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // or use cloud storage for production

router.post(
  "/courses/:id/resources",
  upload.single("file"),
  adminController.addCourseResource
);

export default router;
