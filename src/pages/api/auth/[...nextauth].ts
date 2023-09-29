import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../../prisma";

function googleCallback(profile: GoogleProfile) {
  return profile.email_verified && profile.email.endsWith("@struct.unb.br");
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",

      profile(profile, tkns) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role || "admin",
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return googleCallback(profile as GoogleProfile);
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },

    session({ session, user }) {
      if (session.user) session.user.role = user.role;
      return session;
    },

    redirect() {
      return Promise.resolve("/api/after_auth");
    },
  },
};

export default NextAuth(authOptions);
