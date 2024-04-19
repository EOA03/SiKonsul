const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getLawyerProfileById = async (req, res) => {
    const { userId } = req.user;
    try {
      const { lawyerId } = req.params;
  
      const lawyer = await userModel.findLawyerById(lawyerId);
  
      if (!lawyer) {
        return res.status(404).json({ message: "Lawyer not found." });
      }
  
      return successResponse(res, "Lawyer profile fetched successfully", { lawyer });
    } catch (error) {
      console.error(error);
      return errorResponse(res, "Server error while fetching lawyer profile", 500);
    }
  };