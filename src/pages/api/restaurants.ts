// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma";
import { Restaurant } from "@prisma/client";

export type RouteOutput = {
  GET: Restaurant[];
  POST: Restaurant;
};

type DataReturned = RouteOutput[keyof RouteOutput] | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataReturned>
) {
  if (req.method === "GET") {
    const restaurants = await prisma.restaurant.findMany();

    return res.status(200).json(restaurants);
  } else if (req.method === "POST") {
    try {
      const { name, description, slug } = req.body;

      const restaurant = await prisma.restaurant.create({
        data: {
          name,
          description,
          slug,
        },
      });

      return res.status(200).json(restaurant);
    } catch (e) {
      if (e instanceof Error) return res.status(500).json({ error: e.message });
      return res.status(500).json({ error: "Unknown error" });
    }
  } else if (req.method === "PATCH") {
    try {
      const { name, description, slug } = req.body;

      const restaurant = await prisma.restaurant.update({
        where: { slug },
        data: {
          name,
          description,
          slug,
        },
      });

      return res.status(200).json(restaurant);
    } catch (e) {
      if (e instanceof Error) return res.status(500).json({ error: e.message });
      return res.status(500).json({ error: "Unknown error" });
    }
  }
}
