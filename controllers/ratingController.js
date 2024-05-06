const RatingModel = require("../models/ratingModel");
const { successResponse, errorResponse } = require("../utils/response");

class RatingController {
  static async addOrUpdateRating(req, res) {
    try {
      const { lawyerId, rating } = req.body;
      const userId = req.user.userId;

      if (!rating || rating < 1 || rating > 5) {
        return errorResponse(
          res,
          "Invalid rating value. Rating must be between 1 and 5.",
          400
        );
      }

      const existingRating = await RatingModel.findRating(lawyerId, userId);

      let newRating;
      if (existingRating) {
        newRating = await RatingModel.updateRating(existingRating.id, rating);
      } else {
        newRating = await RatingModel.addRating(lawyerId, userId, rating);
      }

      const newAverageRating = await RatingModel.updateAverageRating(lawyerId);

      return successResponse(res, "Rating processed successfully", {
        newAverageRating,
        ratingId: newRating.id,
      });
    } catch (error) {
      console.error(error);
      return errorResponse(
        res,
        "Error while processing rating: " + error.message,
        500
      );
    }
  }
}

module.exports = RatingController;
