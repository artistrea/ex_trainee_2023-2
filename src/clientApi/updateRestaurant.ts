import { RoutesOutput } from "./routeOutputs";
import { Prisma } from "@prisma/client";
import axios, { AxiosPromise } from "axios";

export function updateRestaurant(
  data: Prisma.RestaurantCreateWithoutMenuInput
): AxiosPromise<RoutesOutput["restaurants"]["PATCH"]> {
  return axios.patch("/api/restaurants", data);
}
