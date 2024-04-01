const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getUserProfile = async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const user = await userModel.findUserById(userId);

    if (!user) {
      return errorResponse(res, "User not found.", 403);
    }

    return successResponse(res, "Get user profile successfully", user);
  } catch (error) {
    return errorResponse(res, "Server error during getting user profile", 500);
  }
};

exports.changeEmail = async (req, res) => {
  const { userId } = req.user;
  const { email } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingUser = await userModel.findUserById(userId);

    if (!existingUser) {
      return errorResponse(res, "User not found.", 403);
    }

    const newEmail = await userModel.changeEmail(userId, email)

    return successResponse(res, "Update email successfully", newEmail)
  } catch (error) {
    return errorResponse(res, "Server error during change user email", 500);
  }
};

exports.changePassword = async (req, res) => {
  const { userId } = req.user;
  const { password } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingUser = await userModel.findUserById(userId);

    if (!existingUser) {
      return errorResponse(res, "User not found.", 403);
    }

    const newPassword = await userModel.changePassword(userId, password)

    return successResponse(res, "Update email successfully", newPassword)
  } catch (error) {
    return errorResponse(res, "Server error during change user email", 500);
  }
}