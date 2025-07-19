const express = require("express");
const multer = require("multer");
const adminController = require("../controllers/adminController");
const router = express.Router();

const upload = multer({ dest: "uploads/" }); // or use cloud storage for production

router.post(
  "/courses/:id/resources",
  upload.single("file"),
  adminController.addCourseResource
);

module.exports = router;
