import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findTeacher(email: string) {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        email: email
      }
    });

    if (teacher) {
      console.log(`Found teacher: ${teacher.name} with email: ${teacher.email}`);
      return teacher;
    } else {
      console.log(`No teacher found with email: ${email}`);
      return null;
    }
  } catch (error) {
    console.error("Error searching for teacher:", error);
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

  await findTeacher(email);
}

main();
