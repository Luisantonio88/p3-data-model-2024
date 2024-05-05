import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCourse(courseData: { title: string; teacherId: number; userId: number }) {
  try {
    const course = await prisma.course.create({
      data: courseData
    });
    console.log(`Created  course with ID: ${course.id} and title: ${course.title}`);
    return course;
  } catch (error) {
    console.error("Failed to create course:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const [title, teacherId, userId] = process.argv.slice(2);
  if (!title || !teacherId) {
    console.log("Please provide a title, teacher ID, and userID");
    return;
  }

  await createCourse({ title, teacherId: parseInt(teacherId), userId: parseInt(userId) });

}

main();
