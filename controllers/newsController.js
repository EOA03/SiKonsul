const cron = require("node-cron");
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");

const fetchTopLegalHeadlines = async () => {
  console.log("Fetching top legal headlines every hour");
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "law",
        apiKey: process.env.NEWSAPI_KEY,
      },
    });

    const articles = response.data.articles.slice(0, 3);

    // console.log(articles); 
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

    const allNews = await prisma.news.findMany({
      orderBy: {
        publishedAt: "asc",
      },
    });

    if (allNews.length > 3) {
      const numberOfNewsToDelete = allNews.length - 3;
      for (let i = 0; i < numberOfNewsToDelete; i++) {
        await prisma.news.delete({
          where: {
            id: allNews[i].id,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error fetching top legal headlines:", error);
  }
};

const fetchNewsFromDB = async () => {
  // console.log("Fetching news from database");
  const news = await prisma.news.findMany();
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

cron.schedule("0 * * * *", fetchTopLegalHeadlines);

module.exports = {
  fetchTopLegalHeadlines,
  fetchNewsFromDB,
  getNewsFeed,
};

const deleteAllNews = async () => {
  try {
    const result = await prisma.news.deleteMany();
    console.log(`Berhasil menghapus ${result.count} berita.`);
  } catch (error) {
    console.error("Terjadi kesalahan saat menghapus data berita:", error);
  }
};

// deleteAllNews();
