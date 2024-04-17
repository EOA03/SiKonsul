const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SpecializationModel {
  static async createSpecialization(name) {
    const existingSpecialization = await prisma.specialization.findUnique({
      where: {
        name: name,
      },
    });
    if (existingSpecialization) {
      throw new Error("Specialization with the same name already exists");
    }

    const specialization = await prisma.specialization.create({
      data: {
        name,
      },
    });
    return specialization;
  }

  static async getAllSpecializations() {
    return await prisma.specialization.findMany();
  }

  static async getSpecializationByName(name) {
    return await prisma.specialization.findUnique({
      where: {
        name: name,
      },
    });
  }

  static async updateSpecialization(id, newName) {
    return await prisma.specialization.update({
      where: {
        id: id,
      },
      data: {
        name: newName,
      },
    });
  }

  static async deleteSpecialization(id) {
    return await prisma.specialization.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = SpecializationModel;
