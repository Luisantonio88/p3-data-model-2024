import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteStudent(email: string) {
  try {
    const deletedStudent = await prisma.user.delete({
      where: {
        email: email
      }
    });

    console.log(`Deleted student ${deletedStudent.name} with email: ${deletedStudent.email}`);
    return deletedStudent;
  } catch (error) {
    console.error("Error deleting student:", error);
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

  await deleteStudent(email);
}

main();
