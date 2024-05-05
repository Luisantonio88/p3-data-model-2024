import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteTeacher(email: string) {
  try {
    const deletedTeacher = await prisma.teacher.delete({
      where: {
        email: email
      }
    });

    console.log(`Deleted student ${deletedTeacher.name} with email: ${deletedTeacher.email}`);
    return deletedTeacher;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.log("Please provide an email as an argument");
    return;
  }

  await deleteTeacher(email);
}

main();
