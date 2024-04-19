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
        isPremium: true,
        occupation: true,
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

  static async findLawyersBySpecialization({
    specializationId,
    search = "",
    page = 1,
    limit = 10,
    orderBy = "rating:asc",
    isPremium,
  }) {
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);
    const offset = (pageNumber - 1) * pageSize;

    const [sortField, sortOrder] = orderBy.split(":");

    const profiles = await prisma.lawyerSpecialization.findMany({
      where: { specializationId: parseInt(specializationId) },
      include: {
        lawyerProfile: true,
      },
    });

    const lawyerIds = profiles.map((profile) => profile.lawyerProfile.lawyerId);

    let lawyers;

    if (isPremium) {
      lawyers = await prisma.lawyer.findMany({
        where: {
          id: { in: lawyerIds },
          name: {
            contains: search,
          },
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        skip: offset,
        take: pageSize,
      });
    } else {
      const freeLawyersCount = 3;

      const freeLawyers = await prisma.lawyer.findMany({
        where: {
          id: { in: lawyerIds },
          name: {
            contains: search,
          },
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        take: freeLawyersCount,
      });

      lawyers = freeLawyers;
    }

    const totalRecords = await prisma.lawyer.count({
      where: {
        id: { in: lawyerIds },
      },
    });

    return {
      lawyers,
      totalRecords,
      totalPages: Math.ceil(totalRecords / pageSize),
      currentPage: pageNumber,
    };
  }

  static async findLawyerById(lawyerId) {
    return await prisma.lawyer.findUnique({
      where: { id: parseInt(lawyerId) },
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
