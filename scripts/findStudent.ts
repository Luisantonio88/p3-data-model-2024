import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findStudent(email: string) {
  try {
    const student = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (student) {
      console.log(`Found student: ${student.name} with email: ${student.email}`);
      return student;
    } else {
      console.log(`No student found with email: ${email}`);
      return null;
    }
  } catch (error) {
    console.error("Error searching for student:", error);
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

  await findStudent(email);
}

main();
