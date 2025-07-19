const routes = require("express").Router();
const courseController = require("../controllers/courseController.js");

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

module.exports = routes;
