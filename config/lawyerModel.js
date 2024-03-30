const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class lawyerModel {
  static async findLawyerByEmail(email) {
    return await prisma.lawyer.findUnique({
      where: { email },
    });
  }

  static async createUser(name, email, password, NIK) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        NIK,
        role: "LAWYER",
      },
    });
    return newLawyer;
  }

  static generateToken(userId) {
    const secret = process.env.JWT_SIGN;
    const tokenExpired = process.env.ACCESS_TOKEN_EXPIRATION;
    return jwt.sign({ userId }, secret, { expiresIn: tokenExpired });
  }
}

module.exports = userModel;
