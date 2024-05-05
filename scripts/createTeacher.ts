import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTeacher(teacherData: { name: string; email: string }) {
  try {
    const teacher = await prisma.teacher.create({
      data: teacherData
    });
    console.log(`Created teacher ${teacher.name} with ID: ${teacher.id}`);
    return teacher;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const args = process.argv.slice(2); 
  if (args.length < 2) {
    console.log("Please provide name and email as arguments");
    return;
  }

  const teacherName = args[0];
  const teacherEmail = args[1];

  await createTeacher({ name: teacherName, email: teacherEmail });
}

main();
