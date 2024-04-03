const cron = require("node-cron");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchTopLegalHeadlines = async () => {
  console.log("Fetching top legal headlines every hour");
  try {
    const response = await newsapi.v2.topHeadlines({
      q: "hukum OR peradilan OR undang-undang",
      country: "id",
      pageSize: 3,
    });

    for (const article of response.articles) {
      await prisma.news.upsert({
        where: { url: article.url },
        update: {},
        create: {
          title: article.title,
          url: article.url,
          publishedAt: new Date(article.publishedAt),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching top legal headlines:", error);
  }
};

cron.schedule("0 * * * *", fetchTopLegalHeadlines);
