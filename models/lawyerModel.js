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
  static async createLawyer(
    name,
    email,
    password,
    NIK,
    address,
    university,
    description,
    alumnus,
    STRNumber,
    experience,
    specializationIds
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingSpecializations = await prisma.specialization.findMany({
      where: { id: { in: specializationIds } },
      select: { id: true },
    });

    const existingSpecializationIds = existingSpecializations.map((s) => s.id);

    const invalidSpecializationIds = specializationIds.filter(
      (id) => !existingSpecializationIds.includes(id)
    );

    if (invalidSpecializationIds.length > 0) {
      return { invalidSpecializationIds };
    }

    const newLawyer = await prisma.lawyer.create({
      data: {
        name,
        email,
        password: hashedPassword,
        NIK,
        address,
        university,
        description,
        role: "LAWYER",
        isPremium: false,
        rating: 0,
        profile: {
          create: {
            alumnus,
            STRNumber,
            experience,
            specialization: {
              createMany: {
                data: specializationIds.map((id) => ({ specializationId: id })),
              },
            },
          },
        },
      },
      include: {
        profile: {
          include: {
            specialization: true,
          },
        },
      },
    });
    return { lawyer: newLawyer };
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

  static async findLawyersBySpecialization({
    specializationId,
    search = "",
    page = 1,
    limit = 10,
    orderBy = "rating:desc",
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

    const lawyers = await prisma.lawyer.findMany({
      where: {
        id: { in: lawyerIds },
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: {
        [sortField]: sortOrder,
      },
      skip: offset,
      take: pageSize,
    });

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

  static async findAllLawyers() {
    return await prisma.lawyer.findMany({
      include: {
        profile: {
          include: {
            specialization: {
              select: {
                specialization: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  static async findLawyerById(lawyerId) {
    return await prisma.lawyer.findUnique({
      where: { id: parseInt(lawyerId) },
      select: {
        id: true,
        name: true,
        email: true,
        NIK: true,
        university: true,
        description: true,
        profile: {
          select: {
            alumnus: true,
            STRNumber: true,
            experience: true,
            specialization: {
              select: {
                specialization: {
                  select: {
                    name: true,
                  }
                }
              },
            },
            // You can include other fields of LawyerProfile here if needed
          },
        },
      },
    });
  }  
}

module.exports = lawyerModel;
