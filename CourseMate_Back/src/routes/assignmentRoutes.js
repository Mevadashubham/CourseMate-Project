// routes/assignmentRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const assignmentController = require("../controllers/assignmentContoroller");

const upload = multer({ dest: "uploads/" }); // You can customize the storage engine

router.post(
  "/upload/:assignmentId",
  upload.single("file"),
  assignmentController.uploadAssignment
);

module.exports = router;
