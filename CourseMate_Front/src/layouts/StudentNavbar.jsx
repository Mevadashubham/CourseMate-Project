import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import GooeyNav from "../assets/GooeyNav";
import "../assets/css/studentNavbar.css";
import { useNavigate, Link, useLocation } from "react-router-dom";

const StudentNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    { label: "Home", href: "/student" },
    { label: "Courses", href: "/student/course" },
    { label: "ContactUs", href: "/student" },
    { label: "About Us", href: "/student" },
  ];
  const activeIndex = items.findIndex(
    (item) => item.href === location.pathname
  );
  const onLogout = () => {
    localStorage.clear("user");
    navigate("/login");
  };
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark p-2"
      style={{
        backgroundColor: "rgba(33, 37, 41, 0.4)",
        backdropFilter: "blur(8px)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand text-white me-3" href="/user/homepage">
          Course-Mate
        </a>
        <div style={{ flex: 1 }}>
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            activeIndex={activeIndex === -1 ? 0 : activeIndex}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
        <div className="p-4">
          <a
            className="text-white text-decoration-none fs-5"
            href="/student/studentprofile"
          >
            Profile
          </a>
        </div>
        <button className="btn btn-danger btn-m" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default StudentNavbar;
