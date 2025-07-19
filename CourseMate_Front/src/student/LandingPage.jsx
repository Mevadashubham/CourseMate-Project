import { Color } from "ogl";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/courses");
  };

  return (
    <div className="min-vh-70 ">
      {/* Navigation Bar */}

      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-md-0 align-items-md-center">
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#programs">
                Programs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#placements">
                Placements
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item ms-md-3">
              <button onClick={handleLoginClick} className="btn btn-primary">
                Student Portal
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="position-relative d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1607237138185-eedd9c632b0b') center center / cover no-repeat",
          }}
        ></div>
        <div
          className="position-relative text-center text-white container"
          style={{ zIndex: 2 }}
        >
          <h1 className="display-3 fw-bold mb-4 text-white">
            Welcome to ABC Institute of Technology
          </h1>
          <p className="fs-4 mb-5 opacity-75">
            Your future begins here — learn, build, and succeed with us.
          </p>
          <div className="d-flex flex-column flex-md-row gap-4 justify-content-center">
            <button
              onClick={handleLoginClick}
              className="btn btn-primary btn-lg fw-semibold px- hover:bg-indigo-700 transition-colors"
              style={{
                paddingTop: "13px",
                paddingBottom: "15px",
              }}
            >
              Access Student Portal
            </button>
            <a
              href="#programs"
              className="btn btn-outline-light btn-lg fw-semibold"
              style={{
                paddingTop: "10px",
                paddingBottom: "5px",
                paddingLeft: "10px",
                marginTop: "10px",
              }}
            >
              Explore Programs
            </a>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="about" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h4 className="display-6 fw-bold mb-3 text-black">
              🎖️ Our Achievements
            </h4>
            <p className="fs-4 text-secondary">
              Excellence in education and innovation
            </p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="text-center p-4 bg-light rounded">
                <div className="fs-2 fw-bold text-primary mb-2">NAAC A+</div>
                <div className="text-secondary">Accredited Institution</div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="text-center p-4 bg-light rounded">
                <div className="fs-2 fw-bold text-primary mb-2">95%</div>
                <div className="text-secondary">Placement Rate</div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="text-center p-4 bg-light rounded">
                <div className="fs-2 fw-bold text-primary mb-2">50+</div>
                <div className="text-secondary">
                  Research Publications in 2024
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="text-center p-4 bg-light rounded">
                <div className="fs-2 fw-bold text-primary mb-2">10+</div>
                <div className="text-secondary">International MoUs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h3 className="display-6 fw-bold mb-3 text-black ">
              🎓 Offered Programs
            </h3>
            <p className="fs-5 text-secondary">
              Choose from our comprehensive range of programs
            </p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top"
                  style={{
                    height: "12rem",
                    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
                  }}
                ></div>
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-semibold">
                    B.Tech - Computer Science
                  </h3>
                  <p className="card-text text-secondary">
                    4-year undergraduate program in computer science and
                    engineering
                  </p>
                  <div className="d-flex justify-content-between">
                    <span className="text-primary fw-semibold">4 Years</span>
                    <span className="text-muted">120 Credits</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top"
                  style={{
                    height: "12rem",
                    background: "linear-gradient(to right, #22c55e, #14b8a6)",
                  }}
                ></div>
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-semibold">
                    B.Tech - Electronics & Communication
                  </h3>
                  <p className="card-text text-secondary">
                    4-year undergraduate program in electronics and
                    communication
                  </p>
                  <div className="d-flex justify-content-between">
                    <span className="text-primary fw-semibold">4 Years</span>
                    <span className="text-muted">120 Credits</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top"
                  style={{
                    height: "12rem",
                    background: "linear-gradient(to right, #f59e42, #ef4444)",
                  }}
                ></div>
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-semibold">
                    BBA - Business Administration
                  </h3>
                  <p className="card-text text-secondary">
                    3-year undergraduate program in business administration
                  </p>
                  <div className="d-flex justify-content-between">
                    <span className="text-primary fw-semibold">3 Years</span>
                    <span className="text-muted">90 Credits</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top"
                  style={{
                    height: "12rem",
                    background: "linear-gradient(to right, #a21caf, #ec4899)",
                  }}
                ></div>
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-semibold">
                    MBA - Master of Business Administration
                  </h3>
                  <p className="card-text text-secondary">
                    2-year postgraduate program in business administration
                  </p>
                  <div className="d-flex justify-content-between">
                    <span className="text-primary fw-semibold">2 Years</span>
                    <span className="text-muted">60 Credits</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top"
                  style={{
                    height: "12rem",
                    background: "linear-gradient(to right, #6366f1, #2563eb)",
                  }}
                ></div>
                <div className="card-body">
                  <h3 className="card-title fs-5 fw-semibold">
                    M.Tech - Data Science
                  </h3>
                  <p className="card-text text-secondary">
                    2-year postgraduate program in data science and analytics
                  </p>
                  <div className="d-flex justify-content-between">
                    <span className="text-primary fw-semibold">2 Years</span>
                    <span className="text-muted">60 Credits</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placement Highlights */}
      <section id="placements" className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3 text-black">
              💼 Placement Highlights
            </h2>
            <p className="fs-5 text-secondary">
              Our students are recruited by top companies worldwide
            </p>
          </div>
          <div className="bg-light rounded p-4">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Students Placed</th>
                    <th>Average Package</th>
                    <th>Highest Package</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-medium">Google</td>
                    <td>5</td>
                    <td>₹25 LPA</td>
                    <td className="text-success fw-semibold">₹45 LPA</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Amazon</td>
                    <td>10</td>
                    <td>₹22 LPA</td>
                    <td className="text-success fw-semibold">₹38 LPA</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">Infosys</td>
                    <td>25</td>
                    <td>₹8 LPA</td>
                    <td className="text-success fw-semibold">₹15 LPA</td>
                  </tr>
                  <tr>
                    <td className="fw-medium">TCS</td>
                    <td>30</td>
                    <td>₹7 LPA</td>
                    <td className="text-success fw-semibold">₹12 LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-12 col-md-3">
              <h3 className="fs-4 fw-bold mb-3">ABC Institute of Technology</h3>
              <p className="text-secondary">
                Excellence in education and innovation since 1990
              </p>
            </div>
            <div className="col-12 col-md-3">
              <h4 className="fs-5 fw-semibold mb-3">Quick Links</h4>
              <ul className="list-unstyled text-secondary">
                <li>
                  <a
                    href="#about"
                    className="text-secondary text-decoration-none hover-text-white"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    className="text-secondary text-decoration-none hover-text-white"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#placements"
                    className="text-secondary text-decoration-none hover-text-white"
                  >
                    Placements
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLoginClick}
                    className="btn btn-link text-secondary p-0 text-decoration-none hover-text-white"
                  >
                    Student Portal
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <h4 className="fs-5 fw-semibold mb-3">Contact Info</h4>
              <ul className="list-unstyled text-secondary">
                <li>📧 info@abcit.edu</li>
                <li>📞 +91-12345-67890</li>
                <li>📍 123 Education Street, Tech City</li>
              </ul>
            </div>
            <div className="col-12 col-md-3">
              <h4 className="fs-5 fw-semibold mb-3">Follow Us</h4>
              <div className="d-flex gap-3">
                <a
                  href="#"
                  className="text-secondary text-decoration-none hover-text-white"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-secondary text-decoration-none hover-text-white"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-secondary text-decoration-none hover-text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary mt-4 pt-4 text-center text-secondary">
            <p className="mb-0">
              &copy; 2025 ABC Institute of Technology. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
