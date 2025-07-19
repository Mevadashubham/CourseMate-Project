import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOCAL_KEY = "admin_courses";

function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    credits: 3,
    // instructor: undefined,
    isFree: false,
    semester: 1,
    description: "",
    status: "pending",
    schedule: [{ day: "", time: "", room: "" }],
    assignments: [{ title: "", due: "", status: "pending" }],
    video: "",
    modules: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [semesterFilter, setSemesterFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const onLogout = () => {
    localStorage.clear("user");
    navigate("/login");
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.roleId?.name === "admin";

    const fetchCourses = async () => {
      const url = isAdmin
        ? "http://localhost:5000/courses"
        : `http://localhost:5000/courses/instructor/${user._id}`;

      const res = await fetch(url);
      const data = await res.json();
      setCourses(data);
    };

    fetchCourses();
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/courses")
  //     .then((res) => res.json())
  //     .then(setCourses)
  //     .catch(console.error);
  // }, []);

  const postCourseToBackend = async (course) => {
    try {
      const response = await fetch("http://localhost:5000/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      if (!response.ok) throw new Error("Failed to post course");
      const data = await response.json();
      // Optionally update local state with response
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    const course = {
      ...newCourse,
      instructor: newCourse.isFree ? undefined : user._id,
      isFree: newCourse.isFree,
      createdAt: new Date().toISOString(),
      progress: newCourse.status === "completed" ? 100 : 0,
      assignments: newCourse.assignments,
      videos: newCourse.video
        ? [
            {
              title: "Main Video",
              url: newCourse.video,
              type: newCourse.video.includes("youtube.com")
                ? "youtube"
                : "upload",
              description: "Primary video resource",
              duration: "",
            },
          ]
        : [],
    };
    // Post to backend
    const addedCourse = await postCourseToBackend(course);
    // Update local state
    setCourses([...courses, addedCourse]);
    setNewCourse({
      name: "",
      code: "",
      credits: 3,
      instructor: "",
      description: "",
      status: "pending",
      schedule: [{ day: "", time: "", room: "" }],
      assignments: [{ title: "", due: "", status: "pending" }],
    });
  };
  const handleAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...newCourse.assignments];
    updatedAssignments[index][field] = value;
    setNewCourse({ ...newCourse, assignments: updatedAssignments });
  };

  const addAssignmentField = () => {
    setNewCourse({
      ...newCourse,
      assignments: [
        ...newCourse.assignments,
        { title: "", due: "", status: "pending" },
      ],
    });
  };

  const removeAssignmentField = (index) => {
    const updatedAssignments = newCourse.assignments.filter(
      (_, i) => i !== index
    );
    setNewCourse({ ...newCourse, assignments: updatedAssignments });
  };

  const handleCourseChange = (e, index) => {
    const updatedSchedule = [...newCourse.schedule];
    updatedSchedule[index][e.target.name] = e.target.value;
    setNewCourse({ ...newCourse, schedule: updatedSchedule });
  };

  const addScheduleField = () => {
    setNewCourse({
      ...newCourse,
      schedule: [...newCourse.schedule, { day: "", time: "", room: "" }],
    });
  };
  // Add a new module
  const addModule = () => {
    const updatedModules = [
      ...newCourse.modules,
      { title: "", description: "", lessons: [] },
    ];
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Remove a module
  const removeModule = (index) => {
    const updatedModules = newCourse.modules.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Update module fields
  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[index][field] = value;
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Add a lesson to a module
  const addLessonToModule = (moduleIndex) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[moduleIndex].lessons = [
      ...(updatedModules[moduleIndex].lessons || []),
      { title: "", type: "video", url: "", description: "" },
    ];
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Update lesson field
  const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  // Remove lesson
  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[moduleIndex].lessons = updatedModules[
      moduleIndex
    ].lessons.filter((_, i) => i !== lessonIndex);
    setNewCourse({ ...newCourse, modules: updatedModules });
  };

  const removeScheduleField = (index) => {
    const updatedSchedule = newCourse.schedule.filter((_, i) => i !== index);
    setNewCourse({ ...newCourse, schedule: updatedSchedule });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      // Delete from backend
      try {
        const response = await fetch(`http://localhost:5000/courses/${id}`, {
          method: "DELETE",
        });
        if (!response.ok)
          throw new Error(`http://localhost:5000/courses/${id}`);
      } catch (error) {
        console.error(error);
        alert("Error deleting course from backend.");
        return;
      }
      // Delete from UI
      const updated = courses.filter((course) => course._id !== id);
      setCourses(updated);
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = async (editedCourse) => {
    try {
      await axios.put(
        `http://localhost:5000/courses/${editedCourse._id}`,
        editedCourse
      );

      const updated = courses.map((course) =>
        course._id === editedCourse._id ? editedCourse : course
      );
      setCourses(updated);
      setEditingId(null);
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course in database.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ongoing":
        return "badge bg-primary";
      case "completed":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      default:
        return "badge bg-secondary";
    }
  };

  const filteredCourses = courses
    .filter((course) => course && course.semester !== undefined)
    .filter((course) => {
      const matchesSemester =
        semesterFilter === "" || course.semester === semesterFilter;
      const matchesSearch =
        course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || course.status === filterStatus;

      return matchesSemester && matchesSearch && matchesFilter;
    });

  const stats = {
    total: courses.length,
    ongoing: courses.filter((c) => c.status === "ongoing").length,
    completed: courses.filter((c) => c.status === "completed").length,
    pending: courses.filter((c) => c.status === "pending").length,
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-white shadow-sm border-bottom">
        <div className="container-fluid px-4 py-3">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 mb-0 text-primary">
                <i className="bi bi-gear-fill me-2"></i>
                Admin Dashboard - Course Management
              </h1>
            </div>
            <div className="col-auto">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to Home
              </button>
              <button className="btn btn-danger btn-m" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4">
        {/* Statistics Cards */}
        <div className="row mb-4">
          <div className="col-md-3 col-6 mb-3">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Total Courses</h5>
                    <h2 className="mb-0">{stats.total}</h2>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-book-fill fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card bg-success text-white">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Ongoing</h5>
                    <h2 className="mb-0">{stats.ongoing}</h2>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-play-circle-fill fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card bg-info text-white">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Completed</h5>
                    <h2 className="mb-0">{stats.completed}</h2>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-check-circle-fill fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-6 mb-3">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Pending</h5>
                    <h2 className="mb-0">{stats.pending}</h2>
                  </div>
                  <div className="ms-3">
                    <i className="bi bi-clock-fill fs-1"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Course Form */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              <i className="bi bi-plus-circle me-2"></i>
              Add New Course
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddCourse}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Course Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter course name"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3 mt-4 pt-2">
                  <select
                    className="form-control"
                    value={newCourse.semester}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, semester: e.target.value })
                    }
                  >
                    <option value="">Select Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-4">
                  <label className="form-label">Course Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., CS101"
                    value={newCourse.code}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, code: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Credits</label>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="6"
                    value={newCourse.credits}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        credits: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Instructor</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Instructor name"
                    value={newCourse.instructor}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, instructor: e.target.value })
                    }
                    disabled={newCourse.isFree}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={newCourse.status}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, status: e.target.value })
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Course description"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Assignments</label>
                {newCourse.assignments.map((assignment, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Assignment Title"
                        value={assignment.title}
                        onChange={(e) =>
                          handleAssignmentChange(index, "title", e.target.value)
                        }
                        // required
                      />
                    </div>
                    <div className="col-md-4">
                      <input
                        type="date"
                        className="form-control"
                        value={assignment.due}
                        onChange={(e) =>
                          handleAssignmentChange(index, "due", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <select
                        className="form-select"
                        value={assignment.status}
                        onChange={(e) =>
                          handleAssignmentChange(
                            index,
                            "status",
                            e.target.value
                          )
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="col-md-1">
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeAssignmentField(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={addAssignmentField}
                >
                  <i className="bi bi-plus"></i> Add Assignment
                </button>
              </div>
              {newCourse.isFree && (
                <div className="mt-4">
                  <h5>📚 Free Course Modules</h5>

                  {newCourse.modules.map((mod, modIdx) => (
                    <div
                      key={modIdx}
                      className="border p-3 mb-3 bg-light rounded"
                    >
                      <div className="mb-2 d-flex justify-content-between align-items-center">
                        <strong>Module {modIdx + 1}</strong>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeModule(modIdx)}
                        >
                          Remove Module
                        </button>
                      </div>

                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Module Title"
                        value={mod.title}
                        onChange={(e) =>
                          handleModuleChange(modIdx, "title", e.target.value)
                        }
                      />

                      <textarea
                        className="form-control mb-3"
                        placeholder="Module Description"
                        value={mod.description}
                        onChange={(e) =>
                          handleModuleChange(
                            modIdx,
                            "description",
                            e.target.value
                          )
                        }
                      />

                      <h6>Lessons</h6>
                      {mod.lessons?.map((lesson, lIdx) => (
                        <div
                          key={lIdx}
                          className="border p-2 mb-2 rounded bg-white"
                        >
                          <div className="d-flex justify-content-between">
                            <strong>Lesson {lIdx + 1}</strong>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => removeLesson(modIdx, lIdx)}
                            >
                              Remove
                            </button>
                          </div>

                          <input
                            type="text"
                            className="form-control my-2"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) =>
                              handleLessonChange(
                                modIdx,
                                lIdx,
                                "title",
                                e.target.value
                              )
                            }
                          />

                          <select
                            className="form-select mb-2"
                            value={lesson.type}
                            onChange={(e) =>
                              handleLessonChange(
                                modIdx,
                                lIdx,
                                "type",
                                e.target.value
                              )
                            }
                          >
                            <option value="video">Video</option>
                            <option value="pdf">PDF</option>
                          </select>

                          <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Lesson URL"
                            value={lesson.url}
                            onChange={(e) =>
                              handleLessonChange(
                                modIdx,
                                lIdx,
                                "url",
                                e.target.value
                              )
                            }
                          />

                          <textarea
                            className="form-control"
                            placeholder="Lesson Description"
                            value={lesson.description}
                            onChange={(e) =>
                              handleLessonChange(
                                modIdx,
                                lIdx,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}

                      <button
                        className="btn btn-sm btn-outline-success mt-2"
                        onClick={() => addLessonToModule(modIdx)}
                      >
                        + Add Lesson
                      </button>
                    </div>
                  ))}

                  <button
                    className="btn btn-outline-primary"
                    onClick={addModule}
                  >
                    ➕ Add Module
                  </button>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Schedule</label>
                {newCourse.schedule.map((slot, index) => (
                  <div key={index} className="row mb-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Day (e.g., Monday)"
                        name="day"
                        value={slot.day}
                        onChange={(e) => handleCourseChange(e, index)}
                        required
                        disabled={newCourse.isFree}
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Time (e.g., 10:00 AM - 11:30 AM)"
                        name="time"
                        value={slot.time}
                        onChange={(e) => handleCourseChange(e, index)}
                        required
                        disabled={newCourse.isFree}
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Room (e.g., R-101)"
                        name="room"
                        value={slot.room}
                        onChange={(e) => handleCourseChange(e, index)}
                        required
                        disabled={newCourse.isFree}
                      />
                    </div>

                    <div className="col-md-3">
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => removeScheduleField(index)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="col-md-4 mb-3 pt-4">
                  <label className="form-label">Free Course</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={newCourse.isFree}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          isFree: e.target.checked,
                          instructor: e.target.checked
                            ? undefined
                            : newCourse.instructor,
                        })
                      }
                      id="freeCourseCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="freeCourseCheck"
                    >
                      Mark as Free Course (no instructor)
                    </label>
                  </div>
                </div>
                {newCourse.isFree && (
                  <div className="mt-3">
                    <label className="form-label">
                      Video URL (YouTube or uploaded file)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://youtube.com/..."
                      value={newCourse.video || ""}
                      onChange={(e) =>
                        setNewCourse({ ...newCourse, video: e.target.value })
                      }
                    />
                    <small className="text-muted">
                      Paste a YouTube link or video resource URL
                    </small>
                  </div>
                )}
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={addScheduleField}
                >
                  <i className="bi bi-plus me-1"></i>
                  Add Time Slot
                </button>
              </div>

              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>
                Add Course
              </button>
            </form>
          </div>
        </div>

        {/* All Courses Table */}
        <div className="card">
          <div className="card-header bg-dark text-white">
            <div className="row align-items-center">
              <div className="col">
                <h5 className="mb-0">
                  <i className="bi bi-table me-2"></i>
                  All Courses
                </h5>
              </div>
              <div className="col-auto">
                <div className="row g-2">
                  <div className="col-auto">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Search courses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <select
                      className="form-select form-select-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Course Details</th>
                    <th>Instructor</th>
                    <th>Status</th>
                    <th>Schedule</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-4">
                        No courses found
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) =>
                      editingId === course._id ? (
                        <EditCourseRow
                          key={course._id}
                          course={course}
                          onSave={handleSaveEdit}
                          onCancel={handleCancelEdit}
                        />
                      ) : (
                        <ViewCourseRow
                          key={course._id}
                          course={course}
                          getStatusBadge={getStatusBadge}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card mt-4">
          <div className="card-header bg-info text-white">
            <h5 className="mb-0">
              <i className="bi bi-gift me-2"></i>
              Free Courses by Semester
            </h5>
          </div>
          <div className="card-body">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const freeCourses = courses.filter(
                (c) => c.isFree === true && c.semester === sem
              );

              return (
                <div key={sem} className="mb-3">
                  <h6 className="fw-bold">Semester {sem}</h6>
                  {freeCourses.length === 0 ? (
                    <div className="text-muted">
                      No free courses for this semester.
                    </div>
                  ) : (
                    <ul className="list-group">
                      {freeCourses.map((course) => (
                        <li
                          key={course._id || course.id}
                          className="list-group-item list-group-item-action"
                          onClick={() =>
                            navigate(`/freecourse/${course._id || course.id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <strong>{course.name}</strong> ({course.code}) -{" "}
                          {course.credits} Credits
                          <span className="ms-2 text-muted">
                            {course.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// View Course Row Component
const ViewCourseRow = ({ course, getStatusBadge, onEdit, onDelete }) => (
  <tr key={course._id}>
    <td>
      <div>
        <h6 className="mb-1">{course.name}</h6>
        <small className="text-muted">
          {course.code} • {course.credits} Credits
        </small>
        {course.description && (
          <p className="mb-0 text-muted small">{course.description}</p>
        )}
      </div>
    </td>
    <td>
      <span className="text-muted">
        {course.instructor
          ? `${course.instructor.firstName} ${course.instructor.lastName}`
          : "Free Course"}
      </span>
    </td>
    <td>
      <span className={getStatusBadge(course.status)}>
        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
      </span>
    </td>
    <td>
      <div className="small">
        {course.schedule.map((slot, i) => (
          <div key={i} className="mb-1">
            <strong>{slot.day}</strong>
            <br />
            {slot.time}
            <br />
            <span className="text-muted">{slot.room}</span>
          </div>
        ))}
      </div>
    </td>
    <td>
      <div className="btn-group" role="group">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => onEdit(course._id)}
          title="Edit"
        >
          <i className="bi bi-pencil">Edit</i>
        </button>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => onDelete(course.id)}
          title="Delete"
        >
          <i className="bi bi-trash">Delete</i>
        </button>
      </div>
    </td>
  </tr>
);

// Edit Course Row Component
const EditCourseRow = ({ course, onSave, onCancel }) => {
  const [editCourse, setEditCourse] = useState({ ...course });

  const updateCourse = (field, value) => {
    setEditCourse((prev) => ({ ...prev, [field]: value }));
  };

  const updateSchedule = (index, field, value) => {
    setEditCourse((prev) => ({
      ...prev,
      schedule: prev.schedule.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      ),
    }));
  };

  return (
    <tr>
      <td>
        <div className="mb-2">
          <input
            className="form-control form-control-sm mb-1"
            value={editCourse.name}
            onChange={(e) => updateCourse("name", e.target.value)}
            placeholder="Course name"
          />
          <input
            className="form-control form-control-sm mb-1"
            value={editCourse.code}
            onChange={(e) => updateCourse("code", e.target.value)}
            placeholder="Course code"
          />
          <input
            type="number"
            className="form-control form-control-sm mb-1"
            value={editCourse.credits}
            onChange={(e) => updateCourse("credits", parseInt(e.target.value))}
            min="1"
            max="6"
          />
          <textarea
            className="form-control form-control-sm"
            value={editCourse.description || ""}
            onChange={(e) => updateCourse("description", e.target.value)}
            placeholder="Description"
            rows="2"
          />
        </div>
      </td>
      <td>
        <input
          className="form-control form-control-sm"
          value={editCourse.instructor || ""}
          onChange={(e) => updateCourse("instructor", e.target.value)}
          placeholder="Instructor"
        />
      </td>
      <td>
        <select
          className="form-select form-select-sm"
          value={editCourse.status}
          onChange={(e) => updateCourse("status", e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </td>
      <td>
        {editCourse.schedule.map((slot, i) => (
          <div key={i} className="mb-2">
            <input
              className="form-control form-control-sm mb-1"
              value={slot.day}
              onChange={(e) => updateSchedule(i, "day", e.target.value)}
              placeholder="Day"
            />
            <input
              className="form-control form-control-sm mb-1"
              value={slot.time}
              onChange={(e) => updateSchedule(i, "time", e.target.value)}
              placeholder="Time"
            />
            <input
              className="form-control form-control-sm"
              value={slot.room}
              onChange={(e) => updateSchedule(i, "room", e.target.value)}
              placeholder="Room"
            />
          </div>
        ))}
      </td>
      <td>
        <div className="btn-group-vertical" role="group">
          <button
            className="btn btn-success btn-sm"
            onClick={() => onSave(editCourse)}
            title="Save"
          >
            <i className="bi bi-check">Save</i>
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
            title="Cancel"
          >
            <i className="bi bi-x">Cancel</i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminDashboard;
