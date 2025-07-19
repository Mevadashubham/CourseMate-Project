import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      const user = res.data.data;
      console.log(res.data);

      if (res.status === 200) {
        alert("Login Success"); //tost...
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);
        localStorage.setItem("id", user._id); // for /getuser/:id
        localStorage.setItem("role", user.roleId.name); // role check
        localStorage.setItem("user", JSON.stringify(user)); // optional full user for instant access
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        if (res.data.data.roleId.name === "admin") {
          navigate("/admin"); //check in app.js
        } else if (res.data.data.roleId.name === "user") {
          navigate("/student");
        } else if (res.data.data.roleId.name === "instructor") {
          navigate("/admin");
        } else {
          alert("Unknown role");
        }
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || "Login Failed"); // Show backend error message if available
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "radial-gradient(circle, #6a11cb, #2575fc)" }}

      // style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
    >
      <div
        className="registration-form bg-white text-dark p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-3">
          <h2 className="fw-bold">LOGIN USER</h2>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email-input">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              required
              id="email-input"
              className="form-control"
              placeholder="enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-lable" htmlFor="password-input">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              required
              id="password-input"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div>
            <input
              type="submit"
              className="btn w-100 text-white"
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                border: "none",
              }}
            ></input>
          </div>
          <div className="text-center text-muted mt-3">
            <div className="text-blue-500 hover:underline hover:!text-blue-700">
              Forgot Password?
            </div>
          </div>
          <div className="text-center text-muted mt-3">
            Create an Account
            <a
              href="/signup"
              className="text-blue-500 hover:underline hover:!text-blue-700"
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
