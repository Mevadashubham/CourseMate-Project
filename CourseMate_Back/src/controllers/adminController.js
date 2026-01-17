import Course from "../models/courseModel.js";

export const addCourseResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, url } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (type === "youtube") {
      course.resources.push({ title, type, url });
    } else if (type === "file" && req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      course.resources.push({ title, type, url: fileUrl });
    } else {
      return res.status(400).json({ message: "Invalid resource data" });
    }

    await course.save();
    res.status(200).json({ message: "Resource added", course });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
