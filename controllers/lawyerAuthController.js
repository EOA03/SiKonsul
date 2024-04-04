const lawyerModel = require("../models/lawyerModel");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, NIK, address, university, specialization, description } = req.body;
  try {
    const existingLawyer = await lawyerModel.findLawyerByEmail(email);
    if (existingLawyer) {
      return errorResponse(res, "Email is already in use", 400);
    }

    const lawyer = await lawyerModel.createLawyer(name, email, password, NIK, address, university, specialization, description);

    return successResponse(res, "Lawyer registered successfully", {
      lawyerId: lawyer.id,
    });
  } catch (error) {
    console.error(error)
    return errorResponse(res, "Server error during registration", 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const lawyer = await lawyerModel.findLawyerByEmail(email);

    if (!lawyer) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, lawyer.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = lawyerModel.generateToken(lawyer.id);

    return successResponse(res, "Login successful", {
      token,
      lawyerId: lawyer.id,
      name: lawyer.name,
    });
  } catch (error) {
    console.error(error)
    return errorResponse(res, "Server error during login", 500);
  }
};
