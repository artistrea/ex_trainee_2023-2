import { RouteOutput as ContactRouteOutput } from "@/pages/api/contacts";
import { RouteOutput as RestaurantRouteOutput } from "@/pages/api/restaurants";

export type RoutesOutput = {
  contacts: ContactRouteOutput;
  restaurants: RestaurantRouteOutput;
};
