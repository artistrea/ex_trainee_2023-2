import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient;
}

global.prisma = global.prisma || new PrismaClient();

export default prisma;
