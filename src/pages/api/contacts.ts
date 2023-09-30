// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Contact } from "@prisma/client";

export type RouteOutput = {
  POST: Omit<Contact, "createdAt"> & { createdAt: string };
  GET: (Omit<Contact, "createdAt"> & { createdAt: string })[];
};

type DataReturned = RouteOutput[keyof RouteOutput] | { error: string };

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
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || session.user.role !== "super_admin")
      return res.status(401).json({ error: "Unauthorized" });

    const contacts = await prisma.contact.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        message: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(
      contacts.map((contact) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        message: contact.message,
        createdAt: contact.createdAt.toISOString(),
      }))
    );
  }
}
