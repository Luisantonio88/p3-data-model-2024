import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(userData: { name: string; email: string }) {
  try {
    const user = await prisma.user.create({
      data: userData
    });
    console.log(`Created new user with ID: ${user.id}`);
    return user;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const args = process.argv.slice(2); // Skip the first two default arguments
  if (args.length < 2) {
    console.log("Please provide both a name and an email as arguments");
    return;
  }

  const userName = args[0];
  const userEmail = args[1];

  await createUser({ name: userName, email: userEmail });
}

main();
