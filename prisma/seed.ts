import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Users
    await prisma.user.createMany({
        data: [
            { name: "Leo Mercury", email: "lmercury@gmail.com" },
            { name: "Luna Silvermoon", email: "lsilvermoon@gmail.com" },
            { name: "Ava Rivers", email: "arivers@gmail.com" },
            { name: "Damien Nightshade", email: "dnightshade@gmail.com" },
            { name: "Isabella Rose", email: "irose@gmail.com" },
        ],
    });

    // Teachers
    await prisma.teacher.createMany({
        data: [
            { name: "Thomas Hardy", email: "thardy@gmail.com" },
            { name: "Virginia Woolf", email: "vwoolf@gmail.com" },
            { name: "James Joyce", email: "jj@gmail.com" },
            { name: "Emily Dickinson", email: "edickinson@gmail.com" },
            { name: "Mark Twain", email: "mtwain@gmail.com" },
        ],
    });

    // Courses - Uno por profesor y alumno   
    const users = await prisma.user.findMany();
    const teachers = await prisma.teacher.findMany();
    await prisma.course.createMany({
        data: [
            { title: "English Literature", userId: users[0].id, teacherId: teachers[0].id },
            { title: "Modernist Narratives", userId: users[1].id, teacherId: teachers[1].id },
            { title: "Consciousness", userId: users[2].id, teacherId: teachers[2].id },
            { title: "American Poetry", userId: users[3].id, teacherId: teachers[3].id },
            { title: "The Great American Novel", userId: users[4].id, teacherId: teachers[4].id },
        ],
    });

    // Lessons - una lecciön por profe
    const courses = await prisma.course.findMany();
    await prisma.lesson.createMany({
        data: [
            { title: "Introduction to Romanticism", content: "Detailed study of Romantic poets.", courseId: courses[0].id },
            { title: "Exploring Virginia Woolf", content: "Analysis of Woolf's narrative techniques.", courseId: courses[1].id },
            { title: "James Joyce's Innovation", content: "In-depth look at Joyce's novels.", courseId: courses[2].id },
            { title: "Poetry of Emily Dickinson", content: "Comprehensive exploration of Dickinson's poetry.", courseId: courses[3].id },
            { title: "Mark Twain and Humor", content: "Study of Twain's use of humor in American literature.", courseId: courses[4].id },
        ],
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

