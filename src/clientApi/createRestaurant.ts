import { RoutesOutput } from "./routeOutputs";
import { Prisma } from "@prisma/client";
import axios, { AxiosPromise } from "axios";

export function createRestaurant(
  data: Prisma.RestaurantCreateInput
): AxiosPromise<RoutesOutput["restaurants"]["POST"]> {
  return axios.post("/api/restaurants", data);
}
