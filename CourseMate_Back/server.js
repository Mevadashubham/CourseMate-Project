const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// import dotenv from "dotenv";

// dotenv.config();
const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// console.log(
//   "Payload size in MB:",
//   JSON.stringify(payload).length / 1024 / 1024
// );

const userRoutes = require("./src/routes/userRoutes.js");
app.use(userRoutes);

const courseRoutes = require("./src/routes/courseRoutes.js");
app.use("/courses", courseRoutes);

const roleRoutes = require("./src/routes/roleRoutes.js");
app.use(roleRoutes);

const assignmentRoutes = require("./src/routes/assignmentRoutes");
app.use("/assignments", assignmentRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/CourseMate_Backend")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
