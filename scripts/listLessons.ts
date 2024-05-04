import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const lessons = await prisma.lesson.findMany();
  console.log('Lessons: ', lessons);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
