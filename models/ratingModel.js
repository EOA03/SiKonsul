const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RatingModel {
  static async findRating(lawyerId, userId) {
    return await prisma.rating.findFirst({
      where: {
        lawyerId,
        userId,
      },
    });
  }

  static async addRating(lawyerId, userId, ratingValue) {
    return await prisma.rating.create({
      data: {
        lawyerId,
        userId,
        value: ratingValue,
      },
    });
  }

  static async updateRating(id, ratingValue) {
    return await prisma.rating.update({
      where: { id },
      data: { value: ratingValue },
    });
  }

  static async updateAverageRating(lawyerId) {
    const aggregate = await prisma.rating.aggregate({
      where: { lawyerId },
      _avg: {
        value: true,
      },
    });

    const newAverageRating = aggregate._avg.value || 0;
    const formattedAverageRating = Number(newAverageRating.toFixed(1));

    await prisma.lawyer.update({
      where: { id: lawyerId },
      data: { rating: formattedAverageRating },
    });

    return formattedAverageRating;
  }
}

module.exports = RatingModel;
