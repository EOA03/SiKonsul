const SpecializationModel = require("../models/specializationModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.createSpecialization = async (req, res) => {
  try {
    const { name } = req.body;

    const existingSpecialization =
      await SpecializationModel.getSpecializationByName(name);
    if (existingSpecialization) {
      return errorResponse(
        res,
        "Specialization with the same name already exists",
        400
      );
    }
    const specialization = await SpecializationModel.createSpecialization(name);

    return successResponse(res, "Specialization created successfully", {
      specialization,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      "Server error while creating specialization",
      500
    );
  }
};

exports.getSpecializations = async (req, res) => {
  try {
    const specializations = await SpecializationModel.getAllSpecializations();
    return successResponse(res, "Specializations retrieved successfully", {
      specializations,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      "Server error while retrieving specializations",
      500
    );
  }
};

exports.updateSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const { newName } = req.body;

    const updatedSpecialization =
      await SpecializationModel.updateSpecialization(parseInt(id), newName);

    return successResponse(res, "Specialization updated successfully", {
      updatedSpecialization,
    });
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      "Server error while updating specialization",
      500
    );
  }
};

exports.deleteSpecialization = async (req, res) => {
  try {
    const { id } = req.params;

    await SpecializationModel.deleteSpecialization(parseInt(id));

    return successResponse(res, "Specialization deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(
      res,
      "Server error while deleting specialization",
      500
    );
  }
};
