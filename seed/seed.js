const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

const specializations = [
  { id: 1, name: "Hukum Bisnis" },
  { id: 2, name: "Hukum Kontrak" },
  { id: 3, name: "Hukum Properti" },
  { id: 4, name: "Hukum Pidana" },
  { id: 5, name: "Hukum Ketenagakerjaan" },
];

async function main() {
  console.log(`Start seeding ...`);

  await prisma.lawyerSpecialization.deleteMany({});
  console.log("Deleting all lawyer profiles...");
  await prisma.lawyerProfile.deleteMany({});
  console.log("Deleting all lawyers...");
  await prisma.lawyer.deleteMany({});
  console.log("Deleting all specializations...");
  await prisma.specialization.deleteMany({});
  console.log("All related records and lawyers deleted.");

  const specializedData = await Promise.all(
    specializations.map(async (spec) => {
      const specialization = await prisma.specialization.create({
        data: { name: spec.name },
      });
      return specialization;
    })
  );

  for (let i = 0; i < 10; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const NIK = "1234567890123456";
    const shuffledSpecializations = specializations.sort(
      () => 0.5 - Math.random()
    );
    const lawyerSpecializations = shuffledSpecializations.slice(
      0,
      Math.floor(Math.random() * shuffledSpecializations.length) + 1
    );

    const lawyer = await prisma.lawyer.create({
      data: {
        name,
        email,
        password,
        NIK,
        role: "LAWYER",
        isPremium: faker.datatype.boolean(),
        rating: parseFloat(faker.finance.amount(0, 5, 2)),
        address: "address",
        description: faker.lorem.paragraph(),
        university: "akademi",
        profile: {
          create: [
            {
              alumnus: faker.random.alpha(10),
              STRNumber: "1234567890123456",
              specialization: {
                create: lawyerSpecializations.map((spec) => ({
                  specialization: {
                    connect: { id: spec.id },
                  },
                })),
              },
            },
          ],
        },
      },
    });
    console.log(`Created lawyer with id: ${lawyer.id}`);
  }

  console.log(`Seeding finished.`);
}

main();
