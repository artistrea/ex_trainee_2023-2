import { RoutesOutput } from "@/clientApi/routeOutputs";
import { useRestaurant } from "@/clientApi/useRestaurant";

type RestaurantMenuProps = {
  editable?: boolean;
  restaurant?: RoutesOutput["restaurants"]["slug"]["GET"];
};

export function RestaurantMenu({ restaurant, editable }: RestaurantMenuProps) {
  if (!restaurant || !restaurant.menu) return <>Loading</>;

  const menu = restaurant.menu;
  const categories = menu.categories;

  return <div></div>;
}
