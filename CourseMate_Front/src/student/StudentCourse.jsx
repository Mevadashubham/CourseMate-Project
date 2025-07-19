import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../assets/css/studentCourse.css";

const dummyStudent = {
  id: "S001",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  program: "Computer Science",
  semester: 1,
  cgpa: 3.85,
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Jane+Doe",
};

const CourseManagementPortal = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [freeCourses, setFreeCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("http://localhost:5000/courses");
      const data = await res.json();
      setCourses(data);

      const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!storedUser) return;

      setStudent(storedUser);

      const free = data.filter((course) => {
        const isSameSemester = course.semester === storedUser.semester;
        const isMarkedFree = course.isFree === true;
        const isNotAlreadyEnrolled =
          Array.isArray(course.students) &&
          !course.students.includes(storedUser._id);

        return isSameSemester && isMarkedFree && isNotAlreadyEnrolled;
      });

      setFreeCourses(free);
    };

    fetchCourses();
  }, []);

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const res = await fetch("http://localhost:5000/courses");
  //     const data = await res.json();
  //     setCourses(data);

  //     if (student?._id) {
  //       const free = data.filter((course) => {
  //         const isSameSemester = course.semester === student.semester;
  //         const isMarkedFree = course.isFree === true;
  //         const isNotAlreadyEnrolled =
  //           Array.isArray(course.students) &&
  //           !course.students.includes(student._id);

  //         return isSameSemester && isMarkedFree && isNotAlreadyEnrolled;
  //       });

  //       setFreeCourses(free);
  //     }
  //   };

  //   fetchCourses();
  // }, [student]);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  //   if (storedUser) setStudent(storedUser);
  // }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing":
        return "bg-status-ongoing";
      case "completed":
        return "bg-status-completed";
      case "pending":
        return "bg-status-pending";
      case "dropped":
        return "bg-status-dropped";
      default:
        return "bg-secondary";
    }
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-progress-orange";
    if (progress < 70) return "bg-progress-blue";
    return "bg-progress-green";
  };

  const filteredCourses = courses.filter((course) => {
    const isStudentEnrolled =
      Array.isArray(course.students) &&
      student?._id &&
      course.students.some((s) => s?.toString() === student._id.toString());

    const isSemesterCourse =
      student &&
      course.semester === student.semester &&
      course.instructor &&
      course.instructor &&
      (typeof course.instructor === "object" ||
        course.instructor.trim() !== "");

    const matchesSearch =
      course.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filter === "all" || course.status === filter;

    return (
      (isStudentEnrolled || isSemesterCourse) && matchesSearch && matchesFilter
    );
  });

  const handleAddCourse = async (course) => {
    try {
      const response = await fetch(
        `http://localhost:5000/courses/${course._id}/add-student`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId: student._id }),
        }
      );

      if (response.ok) {
        setFreeCourses((prevCourses) =>
          prevCourses.filter((c) => c._id !== course._id)
        );

        setCourses((prev) =>
          prev.map((c) =>
            c._id === course._id
              ? { ...c, students: [...(c.students || []), student._id] }
              : c
          )
        );
      }
    } catch (error) {
      console.error("Failed to add course:", error);
    }
  };

  const schedule = courses
    .filter(
      (course) => course.status === "ongoing" && course.schedule.length > 0
    )
    .flatMap((course) =>
      course.schedule.map((s) => ({
        course: course.name,
        code: course.code,
        day: s.day,
        time: s.time,
        room: s.room,
        instructor:
          typeof course.instructor === "string"
            ? course.instructor
            : course.instructor
            ? `${course.instructor.firstName} ${course.instructor.lastName}`
            : "N/A",
      }))
    )
    .sort((a, b) => {
      const daysOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      return daysOrder.indexOf(a.day) - daysOrder.indexOf(b.day);
    });

  const exportTimetablePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Weekly Timetable", 14, 22);

    const tableColumn = ["Course", "Code", "Day", "Time", "Room", "Instructor"];
    const tableRows = [];

    schedule.forEach((item) => {
      const rowData = [
        item.course,
        item.code,
        item.day,
        item.time,
        item.room,
        item.instructor,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [76, 81, 191] },
    });

    doc.save("weekly_timetable.pdf");
  };
  console.log("Student", student);
  console.log("Courses", courses);

  return (
    <div className="container-fluid px-4 py-5" style={{ marginTop: "4.5rem" }}>
      <header className="bg-white shadow-sm mb-4">
        <div className="container-fluid px-4">
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ height: "3rem" }}
          >
            <div className="d-flex align-items-center">
              <Link to="/student">
                <button className="btn btn-link text-primary fw-medium text-decoration-none">
                  ← Back to Home
                </button>
              </Link>
              <h1 className="ms-4 fs-5 fw-bold text-dark">
                Course Management Portal
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="gradient-indigo-purple rounded p-4 mb-4 text-white">
        <h2 className="fs-3 fw-bold mb-2">
          {" "}
          Welcome back, {student?.name || "Student"}!
        </h2>
        <p className="fs-5">
          {student?.program || "Unknown Program"} - Sem{" "}
          {student?.semester || "N/A"}
        </p>
        <div className="d-flex gap-4">
          <div className="text-center">
            <div className="fs-4 fw-bold">
              {student && courses.length > 0
                ? courses.filter(
                    (c) =>
                      c.status === "ongoing" && c.semester === student.semester
                  ).length
                : "-"}
            </div>
            <div>Ongoing Courses</div>
          </div>
          <div className="text-center">
            <div className="fs-4 fw-bold">
              {student && courses.length > 0
                ? courses.filter(
                    (c) =>
                      c.status === "completed" &&
                      c.semester === student.semester
                  ).length
                : "-"}
            </div>
            <div>Completed</div>
          </div>
          {/* <div className="text-center">
            <div className="fs-4 fw-bold">{student?.cgpa || "N/A"}</div>
            <div>CGPA</div>
          </div> */}
        </div>
      </div>

      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-between">
          <input
            type="text"
            placeholder="Search courses by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
          <div className="d-flex gap-2">
            {["all", "ongoing", "completed", "pending"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`btn btn-sm fw-medium ${
                  filter === status ? "btn-primary" : "btn-light text-dark"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4 mb-4">
        {filteredCourses.map((course) => (
          <div key={course._id} className="col">
            <div
              className="card shadow-sm border h-100 cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 className="card-title fs-5 fw-semibold text-dark mb-1">
                      {course.name}
                    </h3>
                    <p className="text-secondary fs-6">
                      {course.code} • {course.credits} Credits
                    </p>
                  </div>
                  <span
                    className={`badge rounded-pill ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-secondary fs-6 mb-3">{course.description}</p>
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center fs-6 text-secondary mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress" style={{ height: "0.5rem" }}>
                    <div
                      className={`progress-bar ${getProgressColor(
                        course.progress
                      )}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center fs-6 text-secondary">
                  <span>
                    👨‍🏫{" "}
                    {course.instructor && typeof course.instructor === "object"
                      ? `${course.instructor.firstName} ${course.instructor.lastName}`
                      : "Not assigned"}
                  </span>
                  <span>{course.schedule.length} Classes/Week</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {freeCourses.length > 0 && (
        <div className="mb-4">
          <h4 className="text-dark mb-3"> Available Free Courses</h4>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4">
            {freeCourses.map((course) => (
              <div key={course._id} className="col">
                <div className="card border-info shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-dark">{course.name}</h5>
                    <p className="text-secondary">
                      {course.code} • {course.credits} Credits
                    </p>
                    <p className="text-muted">{course.description}</p>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleAddCourse(course)}
                    >
                      ➕ Add Course
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedCourse && (
        <div
          className="modal fade show"
          style={{
            display: "block",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1050,
          }}
          onClick={() => setSelectedCourse(null)} // Close on backdrop click
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            style={{ pointerEvents: "auto", margin: "10% auto" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold">{selectedCourse.name}</h5>
                  <small className="text-muted">
                    {selectedCourse.code} • {selectedCourse.credits} Credits
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedCourse(null)}
                ></button>
              </div>

              <div className="modal-body">
                <p className="mb-3">{selectedCourse.description}</p>

                <p className="mb-1">
                  <strong>Instructor:</strong>{" "}
                  {selectedCourse.instructor &&
                  typeof selectedCourse.instructor === "object"
                    ? `${selectedCourse.instructor.firstName} ${selectedCourse.instructor.lastName}`
                    : selectedCourse.instructor || "Not assigned"}
                </p>

                <p className="mb-3">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${getStatusColor(selectedCourse.status)}`}
                  >
                    {selectedCourse.status}
                  </span>
                </p>

                <div className="mb-3">
                  <strong>Progress:</strong>
                  <div className="progress mt-1" style={{ height: "0.5rem" }}>
                    <div
                      className={`progress-bar ${getProgressColor(
                        selectedCourse.progress
                      )}`}
                      style={{ width: `${selectedCourse.progress}%` }}
                    ></div>
                  </div>
                  <small className="text-muted">
                    {selectedCourse.progress}% complete
                  </small>
                </div>

                {selectedCourse.schedule.length > 0 && (
                  <div className="mb-3">
                    <strong>Schedule:</strong>
                    <ul className="list-group list-group-flush mt-2">
                      {selectedCourse.schedule.map((item, idx) => (
                        <li
                          key={idx}
                          className="list-group-item d-flex justify-content-between"
                        >
                          <span>{item.day}</span>
                          <span>{item.time}</span>
                          <span>{item.room}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedCourse.assignments &&
                selectedCourse.assignments.length > 0 ? (
                  selectedCourse.assignments.map((assignment, idx) => (
                    <li key={idx} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div>
                          <strong>{assignment.title}</strong>
                          <br />
                          <small>Due: {assignment.due}</small>
                        </div>
                        <span
                          className={`badge ${
                            assignment.status === "completed"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>

                      {/* File Upload */}
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const file =
                            e.target.elements[`file-${idx}`].files[0];
                          if (!file) return alert("Please select a file");
                          const formData = new FormData();
                          formData.append("file", file);

                          try {
                            const res = await fetch(
                              `http://localhost:5000/assignments/upload/${assignment._id}`,
                              {
                                method: "POST",
                                body: formData,
                              }
                            );
                            const data = await res.json();

                            alert("Uploaded successfully!");

                            // Update assignment status in state
                            setSelectedCourse((prev) => {
                              const updatedAssignments = prev.assignments.map(
                                (a, i) =>
                                  i === idx ? { ...a, status: "completed" } : a
                              );
                              return {
                                ...prev,
                                assignments: updatedAssignments,
                              };
                            });
                          } catch (err) {
                            console.error(err);
                            alert("Upload failed");
                          }
                        }}
                      >
                        <div className="input-group mt-2">
                          <input
                            type="file"
                            name={`file-${idx}`}
                            className="form-control"
                            accept=".pdf,.doc,.docx"
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </li>
                  ))
                ) : (
                  <div className="text-muted text-center my-3">
                    📭 No assignments assigned for this course.
                  </div>
                )}
              </div>
              {(!selectedCourse.instructor || selectedCourse.isFree) && (
                <Link
                  to={`/free-course/${selectedCourse._id}`}
                  className="btn btn-outline-primary mt-3 d-block mx-auto"
                >
                  📺 Go to Course Content
                </Link>
              )}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedCourse(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-4 fw-bold text-dark">📅 Weekly Timetable</h2>
          <button onClick={exportTimetablePDF} className="btn btn-primary">
            📄 Export PDF
          </button>
        </div>
        {schedule.length === 0 ? (
          <div className="text-center py-4 text-secondary">
            <p className="fs-5">No ongoing classes scheduled</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Code</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Room</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.course}</td>
                    <td>{item.code}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                    <td>{item.room}</td>
                    <td>{item.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagementPortal;
