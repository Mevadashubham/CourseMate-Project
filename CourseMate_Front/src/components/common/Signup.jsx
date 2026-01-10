import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/css/signup.css";
import axios from "axios";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [role, setRole] = useState("user");

  const userRoleId = "687e60d521d27a0be0175843";
  const adminRoleId = "687e60fe21d27a0be0175845";
  const instructorRoleId = "687e614e21d27a0be0175849";

  const submitHandler = async (data) => {
    console.log(data);

    data.roleId =
      role === "user"
        ? userRoleId
        : role === "instructor"
        ? instructorRoleId
        : adminRoleId;

    const res = await axios.post("/user", data);
    res.status;
    if (res.status === 201) {
      alert("User created successfully");
      navigate("/login");
    } else {
      alert("User not created");
    }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "radial-gradient(circle, #6a11cb, #2575fc)",
        minHeight: "100vh",
      }}
    >
      <div
        className="registration-from bg-white text-dark p-4 col-mb-5"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="">
          <div className="text-center ">
            <h2>Create Your Account</h2>
            <p>Sign up to get started!</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div className="row mb-5 pl-4">
              <div className="col">
                <label className="form-label">Role</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      id="studentRadio"
                      value="user"
                      name="selectRadio"
                      className="form-check-input"
                      checked={role === "user"}
                      onChange={() => handleRoleChange("user")}
                    />
                    <label className="form-check-label" htmlFor="studentRadio">
                      Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="instructorRadio"
                      value="instructor"
                      name="selectRadio"
                      className="form-check-input"
                      checked={role === "instructor"}
                      onChange={() => handleRoleChange("instructor")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="instructorRadio"
                    >
                      Instructor
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      id="adminRadio"
                      value="admin"
                      name="selectRadio"
                      className="form-check-input"
                      checked={role === "admin"}
                      onChange={() => handleRoleChange("admin")}
                    />
                    <label className="form-check-label" htmlFor="adminRadio">
                      Admin
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label text-start " htmlFor="firstname">
                    FirstName
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    placeholder="Enter your Firstname"
                    className={`form-control ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="lastname" className="form-label">
                    LastName
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    placeholder="Enter your Lastname"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 1, message: "Age must be at least 1" },
                      max: { value: 120, message: "Age must be reasonable" },
                    })}
                    placeholder="Enter age"
                    className={`form-control ${
                      errors.age ? "border-red-500" : ""
                    }`}
                  />
                  {errors.age && (
                    <p className="text-danger text-sm">{errors.age.message}</p>
                  )}
                </div>

                <div className="col-6">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone must be 10 digits",
                      },
                    })}
                    placeholder="Enter phone number"
                    className={`form-control ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-danger text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label htmlFor="program" className="form-label">
                    Program
                  </label>
                  <select
                    {...register("program", {
                      required: "Program is required",
                    })}
                    className={`form-select ${
                      errors.program ? "border-red-500" : ""
                    }`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your program
                    </option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">
                      Information Technology
                    </option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                  {errors.program && (
                    <p className="text-danger text-sm">
                      {errors.program.message}
                    </p>
                  )}
                </div>

                <div className="col-3">
                  <label htmlFor="semester" className="form-label">
                    Semester
                  </label>
                  <select {...register("semester")} className="form-control">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        {sem}
                      </option>
                    ))}
                  </select>
                  {errors.semester && (
                    <p className="text-danger text-sm">
                      {errors.semester.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-mb-3">
                  <label className="form-label" htmlFor="email-input">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                        message: "Invalid email format",
                      },
                    })}
                    required
                    id="email-input"
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: 6,
                    })}
                    required
                    id="password-input"
                    placeholder="Enter password"
                    className={`form-control ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>
              </div>
              <div className="row">
                <div>
                  <button
                    type="submit"
                    className="btn w-100 text-white"
                    style={{
                      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="text-center">
            Already Have a Account <a href="/Login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};
