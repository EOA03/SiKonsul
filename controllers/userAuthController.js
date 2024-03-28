const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, NIK } = req.body;
  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "Email is already in use", 400);
    }

    const user = await userModel.createUser(name, email, password, NIK);

    return successResponse(res, "User registered successfully", {
      userId: user.id,
    });
  } catch (error) {
    console.error(error)
    return errorResponse(res, "Server error during registration", 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = userModel.generateToken(user.id);

    return successResponse(res, "Login successful", {
      token,
      userId: user.id,
      name: user.name,
    });
  } catch (error) {
    console.error(error)
    return errorResponse(res, "Server error during login", 500);
  }
};
