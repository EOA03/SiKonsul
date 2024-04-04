const cron = require("node-cron");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

const fetchTopLegalHeadlines = async () => {
  console.log("Fetching top legal headlines every hour");
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        q: "law",
        country: "id",
        pageSize: 3,
        apiKey: process.env.NEWSAPI_KEY,
      },
    });

    const articles = response.data.articles;
    for (const article of articles) {
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

const fetchNewsFromDB = async () => {
  console.log("Fetching news from database");
  const news = await prisma.news.findMany();
  console.log(news);
  return news;
};

const getNewsFeed = async (req, res) => {
  try {
    const newsFeed = await fetchNewsFromDB();
    res.status(200).json(newsFeed);
  } catch (error) {
    console.error("Error fetching news from database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

fetchTopLegalHeadlines();

cron.schedule("0 * * * * *", fetchTopLegalHeadlines);

module.exports = {
  fetchTopLegalHeadlines,
  fetchNewsFromDB,
  getNewsFeed,
};
