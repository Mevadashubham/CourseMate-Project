// routes/assignmentRoutes.js
import express from "express";
import multer from "multer";
import * as assignmentController from "../controllers/assignmentContoroller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // You can customize the storage engine

router.post(
  "/upload/:assignmentId",
  upload.single("file"),
  assignmentController.uploadAssignment
);

export default router;
