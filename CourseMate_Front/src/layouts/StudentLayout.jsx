import React from "react";
import StudentNavbar from "./studentNavbar";
import { Outlet } from "react-router-dom";

export const StudentLayout = () => {
  return (
    <>
      <StudentNavbar />
      <main className="app-main" style={{ marginTop: "60px" }}>
        {/* Main content goes here */}
        <Outlet />
      </main>
    </>
  );
};
