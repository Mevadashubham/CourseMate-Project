import Course from "../models/courseModel.js";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const data = req.body;

    data.isFree = data.isFree === true || data.isFree === "true";

    if (!data.instructor || data.instructor === "") {
      data.instructor = null;
    } else if (!mongoose.isValidObjectId(data.instructor)) {
      const [firstName, lastName] = data.instructor.trim().split(" ");
      const foundInstructor = await User.findOne({ firstName, lastName });
      data.instructor = foundInstructor ? foundInstructor._id : null;
    }

    data.id = uuidv4();
    data.created_at = new Date();

    const course = new Course(data);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    console.error("Error in createCourse:", err.message);
    console.log("Payload:", req.body);
    res.status(500).json({ error: err.message });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "firstName lastName email"
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;

    let course = null;

    // Try custom `id` (e.g., Date.now())
    course = await Course.findOne({ id: courseId });

    // If not found, and it's a valid Mongo ObjectId, try with _id
    if (!course && mongoose.Types.ObjectId.isValid(courseId)) {
      course = await Course.findById(courseId);
    }

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error("Error in getCourseById:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update course

export const updateCourse = async (req, res) => {
  try {
    const data = req.body;

    if (!data.instructor || data.instructor === "") {
      data.instructor = null;
    }

    const updated = await Course.findByIdAndUpdate(req.params.courseId, data, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Course not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findOneAndDelete(req.params.courseId);
    if (!deleted) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Course Stats
export const getCourseStats = async (req, res) => {
  try {
    const total = await Course.countDocuments({});
    const ongoing = await Course.countDocuments({ status: "ongoing" });
    const completed = await Course.countDocuments({ status: "completed" });
    const pending = await Course.countDocuments({ status: "pending" });

    res.json({ total, ongoing, completed, pending });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCoursesBySemester = async (req, res) => {
  try {
    const courses = await Course.find({ semester: req.params.sem });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch semester-wise courses." });
  }
};

export const addStudentToCourse = async (req, res) => {
  const { id } = req.params;
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({ message: "studentId is required" });
  }

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Ensure students array is present
    if (!Array.isArray(course.students)) {
      course.students = [];
    }

    const alreadyExists = course.students.some(
      (s) => s.toString() === studentId.toString()
    );

    if (!alreadyExists) {
      course.students.push(new mongoose.Types.ObjectId(studentId));
      await course.save();
    }

    res.status(200).json({ message: "Student added", course });
  } catch (err) {
    console.error("Error in addStudentToCourse:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
export const addVideo = async (req, res) => {
  const { id } = req.params;
  const { title, url, type, duration } = req.body;

  const course = await Course.findById(id);
  course.videos.push({ title, url, type, duration });
  await course.save();

  res.status(200).json(course);
};
export const getCoursesByInstructor = async (req, res) => {
  try {
    const instructorId = req.params.instructorId;

    const courses = await Course.find({
      $or: [
        { instructor: instructorId },
        { isFree: true }, // ← include free courses
      ],
    }).populate("instructor", "firstName lastName email");
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch instructor courses" });
  }
};
