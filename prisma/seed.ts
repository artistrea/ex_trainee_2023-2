import prisma from "./";

async function seed() {
  await prisma.user.create({
    data: {
      name: "Artur Padovesi Piratelli",
      accounts: {
        create: {
          provider: "google",
          providerAccountId: "107863575319267530603",
          type: "oauth",
        },
      },
      email: "apiravesi@struct.unb.br",
      role: "super_admin",
      sessions: {
        create: {
          expires: new Date(60 * 60 * 1000).toISOString(),
          sessionToken: "asfadgsvasdf1342y38w#asd",
        },
      },
    },
  });
}

seed();
