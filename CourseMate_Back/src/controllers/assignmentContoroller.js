import Course from "../models/courseModel.js";

export const uploadAssignment = async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const course = await Course.findOne({ "assignments._id": assignmentId });

    if (!course) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Update assignment status to completed
    const assignment = course.assignments.id(assignmentId);
    if (assignment) {
      assignment.status = "completed";
      await course.save();
    }

    res
      .status(200)
      .json({ message: "Assignment submitted successfully", assignment });
  } catch (err) {
    console.error("Assignment upload failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
