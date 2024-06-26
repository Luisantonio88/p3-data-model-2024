import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUser(userData: { name: string; email: string }) {
  try {
    const user = await prisma.user.create({
      data: userData
    });
    console.log(`Created user ${user.name} with ID: ${user.id}`);
    return user;
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

  const userName = args[0];
  const userEmail = args[1];

  await createUser({ name: userName, email: userEmail });
}

main();
