import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });
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

import userRoutes from "./src/routes/userRoutes.js";
app.use(userRoutes);

import courseRoutes from "./src/routes/courseRoutes.js";
app.use("/courses", courseRoutes);

import roleRoutes from "./src/routes/roleRoutes.js";
app.use(roleRoutes);

import assignmentRoutes from "./src/routes/assignmentRoutes.js";
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
