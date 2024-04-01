const jwt = require("jsonwebtoken");
const JWT_SIGN = process.env.JWT_SIGN;
const { errorResponse } = require("../utils/response");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Unauthorized - No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SIGN);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    errorResponse(res, "Unauthorized - Invalid token", 401);
  }
};

module.exports = authenticationMiddleware;
