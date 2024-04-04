const userModel = require("../models/userModel");
const lawyerModel = require("../models/lawyerModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.blockAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { role } = req.user;

    if (role === "LAWYER") {
      await lawyerModel.blockLawyer(parseInt(accountId));
      return successResponse(res, "Lawyer has been blocked successfully");
    } else if (role === "USER") {
      await userModel.blockUser(parseInt(accountId));
      return successResponse(res, "User has been blocked successfully");
    } else {
      return errorResponse(
        res,
        "You are not authorized to block this account",
        403
      );
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error during blocking account", 500);
  }
};

exports.unblockAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { role } = req.user;

    if (role === "LAWYER") {
      await lawyerModel.unblockLawyer(parseInt(accountId));
      return successResponse(res, "Lawyer has been unblocked successfully");
    } else if (role === "USER") {
      await userModel.unblockUser(parseInt(accountId));
      return successResponse(res, "User has been unblocked successfully");
    } else {
      return errorResponse(
        res,
        "You are not authorized to unblock this account",
        403
      );
    }
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error during unblocking account", 500);
  }
};
