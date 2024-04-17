const { successResponse, errorResponse } = require("../utils/response");
const Lawyer = require("../models/lawyerModel");
const lawyerModel = require("../models/lawyerModel");

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
    const { search, page, limit, orderBy } = req.query;

    const result = await Lawyer.findLawyersBySpecialization({
      specializationId,
      search,
      page,
      limit,
      orderBy,
    });

    if (result.lawyers.length === 0) {
      return res
        .status(404)
        .json({ message: "No lawyers found for the given criteria." });
    }

    return res
      .status(200)
      .json({ message: "Lawyers fetched successfully.", data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while fetching lawyers by specialization.",
    });
  }
};

exports.getLawyerProfile = async (req, res) => {
  try {
    const { lawyerId } = req.user;

    const lawyer = await Lawyer.findLawyerById(lawyerId);

    if (!lawyer) {
      return res.status(404).json({ message: "Lawyer not found." });
    }

    return successResponse(res, "Lawyer profile fetched successfully", { lawyer });
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error while fetching lawyer profile", 500);
  }
};
