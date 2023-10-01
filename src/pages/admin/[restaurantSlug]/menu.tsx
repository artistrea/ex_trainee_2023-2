import { useRestaurant } from "@/clientApi/useRestaurant";
import { RestaurantMenu } from "@/components/RestaurantMenu";
import { useRouter } from "next/router";

export default function AdminRestaurantMenu() {
  const router = useRouter();

  const { restaurantSlug } = router.query;
  const restaurantSlugString =
    typeof restaurantSlug === "string" ? restaurantSlug : "";

  const { data: restaurant } = useRestaurant(restaurantSlugString, (err) => {
    alert(err);
  });

  console.log(restaurantSlug);

  return <RestaurantMenu restaurant={restaurant} editable />;
}
