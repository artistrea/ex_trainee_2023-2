import { MenuCategory } from "@prisma/client";
import axios from "axios";
import { RoutesOutput } from "./routeOutputs";

export function deleteCategory(categoryId: number) {
  return axios.delete<RoutesOutput["categories"]["id"]["DELETE"]>(
    `/api/categories/${categoryId}`
  );
}
