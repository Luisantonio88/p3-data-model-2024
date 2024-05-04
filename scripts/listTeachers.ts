import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const teachers = await prisma.teacher.findMany();
  console.log('Teachers: ', teachers);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
