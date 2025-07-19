import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const FreeCoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [openLesson, setOpenLesson] = useState(null);
  const [openModule, setOpenModule] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/courses/${courseId}`);
        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setCourse({ error: true });
        console.log("Fetched course data:", data);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <div>Loading...</div>;
  if (course.error)
    return <div className="alert alert-danger mt-5">Course not found.</div>;

  return (
    <div className="container mt-5">
      <Link to="/student" className="btn btn-link mb-3">
        ← Back to Student Dashboard
      </Link>
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h1 className="fw-bold">{course.name}</h1>
        <p className="text-muted">{course.description}</p>
        <div className="mb-2">
          <span className="badge bg-primary me-2">
            Semester {course.semester}
          </span>
          <span className="badge bg-info">{course.credits} Credits</span>
        </div>
      </div>

      {/* Modules Section */}
      <div className="mb-4">
        <h4 className="fw-bold mb-3">Modules</h4>
        {course.modules?.length > 0 ? (
          <>
            {course.modules.map((mod, idx) => (
              <div className="accordion mb-3" key={idx}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        openModule === idx ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() =>
                        setOpenModule(openModule === idx ? null : idx)
                      }
                    >
                      {mod.title}
                    </button>
                  </h2>

                  {openModule === idx && (
                    <div className="accordion-body">
                      <p className="text-muted">{mod.description}</p>

                      {mod.lessons?.length > 0 ? (
                        <div className="list-group">
                          {mod.lessons.map((lesson, lIdx) => {
                            const lessonKey = `${idx}-${lIdx}`;
                            const isOpen = openLesson === lessonKey;
                            return (
                              <div key={lIdx} className="mb-3">
                                <button
                                  className={`btn btn-outline-secondary w-100 text-start ${
                                    isOpen ? "active" : ""
                                  }`}
                                  type="button"
                                  onClick={() =>
                                    setOpenLesson(isOpen ? null : lessonKey)
                                  }
                                >
                                  📘 {lesson.title}
                                </button>

                                {isOpen && (
                                  <div className="card card-body mt-2">
                                    {lesson.type === "video" ? (
                                      <>
                                        <iframe
                                          className="w-100"
                                          height="300"
                                          src={lesson.url}
                                          title={lesson.title}
                                          frameBorder="0"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                        ></iframe>
                                        {lesson.description && (
                                          <p className="mt-2 text-muted">
                                            {lesson.description}
                                          </p>
                                        )}
                                      </>
                                    ) : lesson.type === "pdf" ? (
                                      <a
                                        href={lesson.url}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        📄 View PDF
                                      </a>
                                    ) : (
                                      <p>No content available</p>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-muted">No lessons available</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-muted">No modules available.</div>
        )}
      </div>
    </div>
  );
};

export default FreeCoursePage;
