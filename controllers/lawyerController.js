const { successResponse, errorResponse } = require("../utils/response");
const Lawyer = require("../models/lawyerModel");

exports.getAllLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.findAllLawyers();
    return successResponse(res, "Lawyers fetched successfully", { lawyers });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error while fetching lawyers", 500);
  }
};

exports.getLawyersBySpecialization = async (req, res) => {
  try {
    const { specializationId } = req.params;
    const lawyers = await Lawyer.findLawyersBySpecialization(specializationId);

    if (!lawyers.length) {
      return errorResponse(
        res,
        "No lawyers found for the given specialization",
        404
      );
    }

    return successResponse(res, "Lawyers fetched successfully", { lawyers });
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      "Server error while fetching lawyers by specialization",
      500
    );
  }
};
