const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { successResponse, errorResponse } = require("../utils/response");

exports.getLatestNews = async (req, res) => {
  try {
    const newsFeed = await prisma.news.findMany({
      orderBy: {
        publishedAt: "desc",
      },
      select: {
        title: true,
        url: true,
        publishedAt: true,
      },
    });
    return successResponse(res, "Latest news fetched successfully", newsFeed);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Server error while fetching news", 500);
  }
};
