import express from "express";
import * as courseController from "../controllers/courseController.js";

const routes = express.Router();

routes.post("/", courseController.createCourse);
routes.get("/", courseController.getCourses);
routes.get("/stats/overview", courseController.getCourseStats);
routes.get("/semester/:sem", courseController.getCoursesBySemester);
routes.get(
  "/instructor/:instructorId",
  courseController.getCoursesByInstructor
);
routes.get("/:courseId", courseController.getCourseById);
routes.put("/:courseId", courseController.updateCourse);
routes.patch("/:id/add-student", courseController.addStudentToCourse);
routes.delete("/:Id", courseController.deleteCourse);

export default routes;
