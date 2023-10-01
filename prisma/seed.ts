import prisma from "./";

async function seed() {
  await prisma.user
    .create({
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
    })
    .catch(() => console.warn("Could not create first user"));

  await prisma.restaurant.create({
    data: {
      slug: "ristorante",
      name: "Ristorante Adelante",
      description: "A melhor comida italiana de Brasília",
      canLogIn: {
        create: {
          email: "apiravesi@gmail.com",
        },
      },
      menu: {
        create: {
          categories: {
            create: [
              {
                title: "Entradas",
                titleClassName: "accentedBg",
                items: {
                  create: [
                    {
                      name: "Raviolitos",
                      priceInCents: 2990,
                      description:
                        "6 unidades de ravioli frito, recheado com queijo fromaggio",
                    },
                    {
                      name: "Bruschetta",
                      priceInCents: 1990,
                      description:
                        "6 unidades de bruschetta de tomate. Pão, azeite, tomate e tempeiros",
                    },
                  ],
                },
              },
              {
                title: "Pratos Principais",
                items: {
                  create: [
                    {
                      name: "Ravioli",
                      priceInCents: 4990,
                      description:
                        "Prato individual de raviolis assados no molho 4 queijos.",
                    },
                    {
                      name: "Penne",
                      priceInCents: 4990,
                      description: "Prato individual de penne ao molho sugo",
                    },
                    {
                      name: "Lasanha Especiale",
                      priceInCents: 5990,
                      description:
                        "Lasanha da casa. Molho bolonhesa ou 4 queijos.",
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
  });
}

seed();
