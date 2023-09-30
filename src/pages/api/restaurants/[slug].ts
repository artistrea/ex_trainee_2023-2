// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CategoryItem, Menu, MenuCategory, Restaurant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type RestaurantWithFullMenu = {
  menu:
    | (Menu & {
        categories: (MenuCategory & {
          items: CategoryItem[];
        })[];
      })
    | null;
} & Restaurant;

export type RouteOutput = {
  GET: RestaurantWithFullMenu;
  PATCH: Menu;
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
          menu: {
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
