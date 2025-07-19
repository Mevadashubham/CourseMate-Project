const { compareSync } = require("bcryptjs"); // Add this line
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const foundUserFromEmail = await userModel
      .findOne({ email: email })
      .populate("roleId");

    if (!foundUserFromEmail) {
      return res.status(404).json({
        message: "Email not found.",
      });
    }

    const isMatch = compareSync(password, foundUserFromEmail.password);

    if (isMatch) {
      res.status(200).json({
        message: "Login successful",
        data: foundUserFromEmail,
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);

    res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};
const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.json({
    message: "User fetched successfully..",
    data: users,
  });
};
const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundUser,
  });
};

const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { address, image } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { address, image },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update profile." });
  }
};

module.exports = {
  signup,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserProfile,
};
