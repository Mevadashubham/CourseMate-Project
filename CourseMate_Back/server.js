const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
import dotenv from "dotenv";

dotenv.config();
const app = express();

/* ----------- MIDDLEWARE ----------- */
app.use(
  cors({
    origin: [
      "https://course-mate-project-z9wv-bwsui0oug-shubham-mevadas-projects.vercel.app/",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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

/* ----------- DB + SERVER ----------- */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB error:", err));
