// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  CategoryItem,
  MenuPage,
  MenuPageCategory,
  Restaurant,
} from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type RestaurantWithFullMenu = {
  menuPages:
    | (MenuPage & {
        categories: (MenuPageCategory & {
          items: CategoryItem[];
        })[];
      })[]
    | null;
} & Restaurant;

export type RouteOutput = {
  GET: RestaurantWithFullMenu;
  PATCH: MenuPage;
};

type DataReturned = RouteOutput[keyof RouteOutput] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataReturned>
) {
  if (req.method === "GET") {
    const { slug } = req.query;
    const slugString = Array.isArray(slug) ? slug[0] : slug;

    const restaurant = await prisma.restaurant
      .findUnique({
        where: { slug: slugString },
        include: {
          menuPages: {
            include: {
              categories: {
                include: {
                  items: true,
                },
              },
            },
          },
        },
      })
      .catch(() => null);

    if (!restaurant) return res.status(404).json({ error: "Not found" });

    res.status(200).json(restaurant);
  }
}
