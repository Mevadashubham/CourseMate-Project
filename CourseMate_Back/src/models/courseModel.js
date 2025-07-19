const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  day: String,
  time: String,
  room: String,
});

const LessonSchema = new Schema({
  title: String,
  type: {
    type: String,
    enum: ["video", "pdf", "text"],
    default: "video",
  },
  url: String,
  description: String,
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  lessons: [LessonSchema],
});

const AssignmentSchema = new Schema({
  title: String,
  due: String,
  status: String,
});

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },

  description: String,
  status: {
    type: String,
    enum: ["pending", "ongoing", "completed"],
    default: "pending",
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  modules: [ModuleSchema],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  semester: { type: Number, required: true },
  schedule: [ScheduleSchema],
  assignments: [AssignmentSchema],
  progress: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  videos: [
    {
      title: String,
      url: String,
      description: String,
      type: { type: String, enum: ["youtube", "upload"], default: "youtube" },
      duration: String,
    },
  ],
  resources: [
    {
      title: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("Course", CourseSchema);
