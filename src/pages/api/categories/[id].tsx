// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MenuCategory } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export type RouteOutput = {
  PATCH: MenuCategory;
  DELETE: MenuCategory;
};

type DataReturned = RouteOutput[keyof RouteOutput] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataReturned>
) {
  console.warn("idString");

  if (req.method === "PATCH") {
    const { id } = req.query;
    const idString = Array.isArray(id) ? id[0] : id;

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (session.user.role !== "super_admin") {
      const category = await prisma.menuCategory
        .findUnique({
          where: { id: Number(idString) },
          include: {
            menu: {
              include: {
                restaurant: {
                  include: {
                    user: {
                      select: {
                        email: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .catch(() => null);

      if (!category) return res.status(404).json({ error: "Not found" });

      if (
        !category.menu?.restaurant.user.some(
          (u) => u.email === session.user.email
        )
      ) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    const { title, description } = req.body;

    const updatedCategory = await prisma.menuCategory.update({
      where: { id: Number(idString) },
      data: { title, description },
    });

    res.status(200).json(updatedCategory);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const idString = Array.isArray(id) ? id[0] : id;

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (session.user.role !== "super_admin") {
      const category = await prisma.menuCategory
        .findUnique({
          where: { id: Number(idString) },
          include: {
            menu: {
              include: {
                restaurant: {
                  include: {
                    user: {
                      select: {
                        email: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        .catch(() => null);

      if (!category) return res.status(404).json({ error: "Not found" });

      if (
        !category.menu?.restaurant.user.some(
          (u) => u.email === session.user.email
        )
      ) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    const deletedCategory = await prisma.menuCategory.delete({
      where: { id: Number(idString) },
    });

    res.status(200).json(deletedCategory);
  }
}
