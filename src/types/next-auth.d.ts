import { User as PrismaUser } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string;
      restaurantSlug: string | null;
    } & DefaultSession["user"];
  }

  interface User extends PrismaUser {}
}
