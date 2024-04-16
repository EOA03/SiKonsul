const lawyerModel = require("../models/lawyerModel");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { name, email, password, NIK, address, university, description, specializationIds } =
    req.body;
  try {
    const existingLawyer = await lawyerModel.findLawyerByEmail(email);
    if (existingLawyer) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const result = await lawyerModel.createLawyer(
      name,
      email,
      password,
      NIK,
      address,
      university,
      description,
      specializationIds
    );

    if (result.invalidSpecializationIds) {
      return res.status(400).json({
        error: "Invalid specialization IDs provided",
        invalidIds: result.invalidSpecializationIds,
      });
    }

    return res.status(201).json({
      message: "Lawyer registered successfully",
      lawyerId: result.lawyer.id,
      profile: result.lawyer.profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error during registration" });
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
    console.error(error);
    return errorResponse(res, "Server error during login", 500);
  }
};
