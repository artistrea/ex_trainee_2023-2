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
      menuPages: {
        create: [
          {
            title: "Menu de Entradas",
            categories: {
              create: [
                {
                  title: "Aperitivos",
                  items: {
                    create: [
                      {
                        name: "Bruschetta Caprese",
                        priceInCents: 899,
                        description:
                          "Pão italiano crocante coberto com tomate fresco, mussarela de búfala, manjericão e azeite de oliva.",
                      },
                      {
                        name: "Camarões Grelhados",
                        priceInCents: 1499,
                        description:
                          "Camarões suculentos grelhados com temperos especiais, acompanhados de molho de alho.",
                      },
                      {
                        name: "Tábua de Queijos",
                        priceInCents: 1599,
                        description:
                          "Seleção de queijos finos, nozes e frutas secas, servidos com geleia de figo.",
                      },
                      {
                        name: "Salada Caprese",
                        priceInCents: 799,
                        description:
                          "Fatias de tomate e mussarela de búfala, regadas com azeite de manjericão e vinagre balsâmico.",
                      },
                      {
                        name: "Croquetes de Frango",
                        priceInCents: 1099,
                        description:
                          "Croquetes de frango caseiros, servidos com molho de mostarda e mel.",
                      },
                      {
                        name: "Cogumelos Recheados",
                        priceInCents: 1299,
                        description:
                          "Cogumelos recheados com queijo de cabra, espinafre e alho, assados até dourar.",
                      },
                      {
                        name: "Sopa de Cebola",
                        priceInCents: 899,
                        description:
                          "Sopa de cebola gratinada com queijo derretido e croutons.",
                      },
                      {
                        name: "Lula à Dorê",
                        priceInCents: 1299,
                        description:
                          "Anéis de lula empanados e fritos, acompanhados de molho tártaro.",
                      },
                      {
                        name: "Tábua de Frios",
                        priceInCents: 1599,
                        description:
                          "Seleção de presunto, salame, queijos e azeitonas.",
                      },
                      {
                        name: "Batata Frita Trufada",
                        priceInCents: 1099,
                        description:
                          "Batata frita crocante temperada com azeite trufado e queijo parmesão.",
                      },
                    ],
                  },
                },
                {
                  title: "Carpaccios",
                  items: {
                    create: [
                      {
                        name: "Carpaccio de Carne",
                        priceInCents: 1399,
                        description:
                          "Finas fatias de carne bovina crua marinadas em molho de mostarda e alcaparras, servidas com rúcula e parmesão.",
                      },
                      {
                        name: "Carpaccio de Salmão",
                        priceInCents: 1499,
                        description:
                          "Salmão defumado fatiado, servido com creme de wasabi e rúcula.",
                      },
                      {
                        name: "Carpaccio de Abobrinha",
                        priceInCents: 1299,
                        description:
                          "Finas fatias de abobrinha crua marinadas em azeite de oliva, limão e ervas, servidas com queijo feta.",
                      },
                      {
                        name: "Carpaccio de Beterraba",
                        priceInCents: 1099,
                        description:
                          "Beterraba crua fatiada, servida com ricota temperada e nozes picadas.",
                      },
                      {
                        name: "Carpaccio de Polvo",
                        priceInCents: 1699,
                        description:
                          "Finas fatias de polvo cozido, servidas com azeitonas e azeite de limão.",
                      },
                      {
                        name: "Carpaccio de Abacate",
                        priceInCents: 1199,
                        description:
                          "Abacate maduro fatiado, servido com molho de limão e pimenta rosa.",
                      },
                      {
                        name: "Carpaccio de Cogumelos",
                        priceInCents: 1399,
                        description:
                          "Cogumelos frescos fatiados, marinados em azeite de trufa e servidos com parmesão.",
                      },
                      {
                        name: "Carpaccio de Beterraba",
                        priceInCents: 1199,
                        description:
                          "Beterraba crua fatiada, servida com molho de mostarda e iogurte.",
                      },
                      {
                        name: "Carpaccio de Pera",
                        priceInCents: 1299,
                        description:
                          "Pera fatiada finamente, servida com gorgonzola e rúcula.",
                      },
                      {
                        name: "Carpaccio de Berinjela",
                        priceInCents: 1399,
                        description:
                          "Berinjela crua fatiada, servida com molho de tahine e sementes de romã.",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            title: "Pratos Principais",
            titleClassName: "accentedBg",

            categories: {
              create: [
                {
                  title: "Massas",
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
                {
                  title: "Risotos",
                  items: {
                    create: [
                      {
                        name: "Risoto de Funghi",
                        priceInCents: 5990,
                        description:
                          "Risoto de funghi com molho de queijo parmesão",
                      },
                      {
                        name: "Risoto de Camarão",
                        priceInCents: 6990,
                        description:
                          "Risoto de camarão com molho de maracujá e limão",
                      },
                      {
                        name: "Risoto de Frango",
                        priceInCents: 5990,
                        description:
                          "Risoto de frango com molho de mostarda e mel",
                      },
                      {
                        name: "Risoto de Carne",
                        priceInCents: 5990,
                        description:
                          "Risoto de carne com molho madeira (com maçã verde) e cogumelos",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
}

seed();
