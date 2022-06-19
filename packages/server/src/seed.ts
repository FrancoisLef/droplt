import prisma from './services/prisma.js';

// A `main` function so that we can use async/await
async function main() {
  await prisma.torrent.deleteMany({});
  await prisma.torrentFile.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: 'admin@droplt.fr',
      firstName: 'Admin',
      lastName: 'Istrator',
    },
  });
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();

    console.log(`🌱 Database seeded`);
  });
