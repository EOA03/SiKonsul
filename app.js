require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const express = require("express");

const errorFormatter = require("./middleware/errorFormatter");
const applyMiddleware = require("./middleware/index");

const app = express();
app.use(cors());

applyMiddleware(app);

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(errorFormatter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
