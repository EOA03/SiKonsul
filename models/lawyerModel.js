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

  static async createLawyer(name, email, password, NIK) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newLawyer = await prisma.lawyer.create({
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

  static generateToken(lawyerId) {
    const secret = process.env.JWT_SIGN;
    const tokenExpired = process.env.ACCESS_TOKEN_EXPIRATION;
    return jwt.sign({ lawyerId }, secret, { expiresIn: tokenExpired });
  }

  static async blockLawyer(lawyerId) {
    return await prisma.lawyer.update({
      where: { id: lawyerId },
      data: { isBlocked: true },
    });
  }

  static async unblockLawyer(lawyerId) {
    return await prisma.lawyer.update({
      where: { id: lawyerId },
      data: { isBlocked: false },
    });
  }
}

module.exports = lawyerModel;
