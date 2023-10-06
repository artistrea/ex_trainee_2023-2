import { MenuCategory } from "@prisma/client";
import axios from "axios";
import { RoutesOutput } from "../routeOutputs";

export function updateCategory(category: MenuCategory) {
  return axios.patch<RoutesOutput["categories"]["id"]["PATCH"]>(
    `/api/categories/${category.id}`,
    category
  );
}
