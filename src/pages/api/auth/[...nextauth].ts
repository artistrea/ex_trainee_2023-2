import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma";

async function googleCallback(profile: GoogleProfile) {
  const canLogIn = await prisma.canLogIn
    .findUnique({
      where: {
        email: profile.email,
      },
    })
    .catch(() => false);

  if (canLogIn || profile.email.endsWith("@struct.unb.br")) {
    return profile.email_verified;
  }
  return false;
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

      async profile(profile: GoogleProfile) {
        const restaurantInfo = await prisma.canLogIn
          .findUnique({
            where: {
              email: profile.email,
            },
            select: {
              restaurantId: true,
            },
          })
          .catch(() => null);

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: null,
          image: profile.picture,
          role: profile.email.endsWith("@struct.unb.br")
            ? "super_admin"
            : profile.role || "admin",
          restaurantId: restaurantInfo?.restaurantId ?? null,
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return await googleCallback(profile as GoogleProfile);
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    async session({ session, user }) {
      if (session.user) session.user.role = user.role;
      if (session.user)
        session.user.restaurantSlug =
          (
            await prisma.restaurant.findUnique({
              where: {
                id: user.restaurantId ?? undefined,
              },
              select: {
                slug: true,
              },
            })
          )?.slug || null;

      return session;
    },

    redirect() {
      return Promise.resolve("/api/after_auth");
    },
  },
};

export default NextAuth(authOptions);
