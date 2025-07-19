import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/studentprofilepage.css";
import ProfileImage from "../assets/img/OIP.jpeg";

const StudentProfilePage = () => {
  const [userData, setUserData] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    program: "",
    image: "",
  });

  const [newAddress, setNewAddress] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
      setNewAddress(storedUser.address || "");
      setImagePreview(storedUser.image || ProfileImage);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // show preview
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/user/${userData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: newAddress,
          image: imagePreview,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      localStorage.setItem("user", JSON.stringify(updated.data));
      alert("Profile updated!");
      navigate(0); // refresh
    } catch (err) {
      console.error("Update error:", err);
      alert("Could not update profile.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center px-5 py-5"
      style={{
        background: "radial-gradient(circle, #6a11cb, #2575fc)",
        marginTop: "5.5rem",
      }}
    >
      <form
        onSubmit={handleSave}
        className="p-5 row g-3 rounded shadow bg-white"
        style={{ maxWidth: "700px", width: "100%" }}
      >
        <div className="m-3 text-center">
          <h1 className="fw-bold">Student Profile</h1>
          <p className="text-muted">Update your profile information below.</p>
        </div>

        <section className="row align-items-center mb-4">
          <div className="col-sm-5 text-center">
            <img
              src={imagePreview || ProfileImage}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "2px solid #6a11cb",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control mt-2"
            />
          </div>
          <div className="col-sm-7">
            <p className="text-muted fs-5">
              <strong>Program:</strong>{" "}
              <span className="text-dark">{userData.program || "N/A"}</span>
            </p>
          </div>
        </section>

        <div className="col-md-6">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={userData.firstName}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={userData.lastName}
            readOnly
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={userData.age}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="tel"
            className="form-control"
            value={userData.phone}
            readOnly
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={userData.email}
            readOnly
          />
        </div>

        <div className="col-md-12">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </div>

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfilePage;
