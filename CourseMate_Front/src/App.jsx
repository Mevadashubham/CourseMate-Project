import { Routes, Route } from "react-router-dom";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { StudentLayout } from "./layouts/StudentLayout";
import StudentProfilePage from "./student/SProfilePage";
import StudentCourse from "./student/StudentCourse";
import LandingPage from "./student/LandingPage";
import AdminDashboard from "./admin/adminDashboard";
import ProtectedRoute from "../src/hooks/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FreeCoursePage from "./components/freeCoursePage";

function App() {
  axios.defaults.baseURL = "https://coursemate-backend-tsb7.onrender.com";
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/*Student Role*/}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="studentprofile" element={<StudentProfilePage />} />
        <Route path="course" element={<StudentCourse />} />
      </Route>
      <Route path="free-course/:courseId" element={<FreeCoursePage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
