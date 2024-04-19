const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class userModel {
  static async findUserByEmail(email) {
    return await prisma.user.findFirst({
      where: { email },
    });
  }

  static async createUser(name, email, password, NIK, occupation) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        NIK,
        occupation,
        role: "USER",
      },
    });
    return newUser;
  }

  static generateToken(userId) {
    const secret = process.env.JWT_SIGN;
    const tokenExpired = process.env.ACCESS_TOKEN_EXPIRATION;
    return jwt.sign({ userId }, secret, { expiresIn: tokenExpired });
  }

  static async findUserById(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        NIK: true,
      },
    });
  }

  static async changeEmail(userId, email) {
    const newEmail = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
      },
    });
    return newEmail;
  }

  static async changePassword(userId, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPassword = await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
    return newPassword;
  }

  static async blockUser(userId) {
    return await prisma.user.update({
      where: { id: userId },
      data: { isBlocked: true },
    });
  }

  static async unblockUser(userId) {
    return await prisma.user.update({
      where: { id: userId },
      data: { isBlocked: false },
    });
  }

  static async bePremium(userId) {
    return await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true },
    });
  }

  static async findLawyerById(lawyerId) {
    return await prisma.lawyer.findUnique({
      where: { id: lawyerId },
      select: {
        id: true,
        profile: {
          select: {
            alumnus: true,
            STRNumber: true,
            experience: true,
            specialization: {
              select: {
                specializationId: true,
              },
            },
            // You can include other fields of LawyerProfile here if needed
          },
        },
      },
    });
  }  
}

module.exports = userModel;
