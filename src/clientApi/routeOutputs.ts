import { RouteOutput as ContactRouteOutput } from "@/pages/api/contacts";
import { RouteOutput as RestaurantRouteOutput } from "@/pages/api/restaurants";
import { RouteOutput as RestaurantSlugRouteOutput } from "@/pages/api/restaurants/[slug]";
import { RouteOutput as CategoriesIdRouteOutput } from "@/pages/api/categories/[id]";

export type RoutesOutput = {
  contacts: ContactRouteOutput;
  restaurants: RestaurantRouteOutput & {
    slug: RestaurantSlugRouteOutput;
  };
  categories: { id: CategoriesIdRouteOutput };
};
