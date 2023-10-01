import { useRestaurant } from "@/clientApi/useRestaurant";
import { RestaurantMenu } from "@/components/RestaurantMenu";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

export { getServerSideProps } from "../[restaurantSlug]";

export default function AdminRestaurantMenu() {
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const { restaurantSlug } = router.query;
  const restaurantSlugString =
    typeof restaurantSlug === "string" ? restaurantSlug : "";

  const { data: restaurant } = useRestaurant(restaurantSlugString, (err) => {
    alert(err);
  });

  console.log(restaurantSlug);

  return (
    <>
      <button
        type="button"
        style={{ display: "contents" }}
        onClick={() => setEditing((pe) => !pe)}
      >
        <span
          style={{
            width: "max-content",
            padding: "0.5rem 1rem",
          }}
        >
          <EditIcon /> {editing ? "Desabilitar Edição" : "Habilitar Edição"}
        </span>
      </button>
      <RestaurantMenu restaurant={restaurant} editable={editing} />;
    </>
  );
}
