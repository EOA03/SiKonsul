const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.userPremium = async (req, res) => {
  const { userId } = req.user;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const user = await userModel.findUserById(userId);

    if (!user) {
      return errorResponse(res, "User not found.", 403);
    }

    const premium = await userModel.bePremium(userId);

    return successResponse(res, "User successfully become premium", premium);
  } catch (error) {
    console.error(error)
    return errorResponse(res, "Server error during user become premium", 500);
  }
};
