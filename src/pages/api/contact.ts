// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
// id        Int      @id @default(autoincrement())
//   name      String
//   email     String
//   phone     String?
//   message   String
//   createdAt DateTime @default(now())

type DataReturned =
  | {
      id: number;
      name: string;
      email: string;
      phone: string | null;
      message: string;
      createdAt: string;
    }
  | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataReturned>
) {
  if (req.method === "POST") {
    try {
      const { name, email, phone, message } = req.body;

      const createdContact = await prisma.contact.create({
        data: {
          name,
          email,
          phone,
          message,
        },
      });

      console.log(name, email, phone, message);
      res.status(200).json({
        id: createdContact.id,
        name: createdContact.name,
        email: createdContact.email,
        phone: createdContact.phone,
        message: createdContact.message,
        createdAt: createdContact.createdAt.toISOString(),
      });
    } catch (err: unknown) {
      if (err instanceof PrismaClientValidationError)
        res.status(400).json({ error: err.message });
      else res.status(500).json({ error: "Unknown error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
