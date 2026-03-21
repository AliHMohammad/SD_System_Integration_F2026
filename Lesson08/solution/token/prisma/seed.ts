import { prisma } from "./prisma";

async function main() {
    await prisma.user.upsert({
        where: { id: 1 },
        update: {},
        create: { username: "yourself", password: "helloWorld" },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
