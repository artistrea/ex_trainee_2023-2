import { useRestaurant } from "@/clientApi/restaurants/useRestaurant";
import { RestaurantMenu } from "@/components/RestaurantMenu";
import { useRouter } from "next/router";

export default function RestaurantMenuPage() {
  const router = useRouter();

  const { restaurantSlug } = router.query;
  const restaurantSlugString =
    typeof restaurantSlug === "string" ? restaurantSlug : "";

  const { data: restaurant } = useRestaurant(restaurantSlugString, (err) => {
    alert(err);
  });

  return <RestaurantMenu restaurant={restaurant} />;
}
