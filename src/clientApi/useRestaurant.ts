import { RoutesOutput } from "./routeOutputs";
import axios from "axios";
import { useEffect, useState } from "react";

export function useRestaurant(
  restaurantSlug: string,
  onError: (err: any) => void
) {
  const [data, setData] =
    useState<RoutesOutput["restaurants"]["slug"]["GET"]>();
  const [forceRefetch, setForceRefetch] = useState(0);

  useEffect(() => {
    if (restaurantSlug)
      axios
        .get(`/api/restaurants/${restaurantSlug}`)
        .then(({ data }) => {
          setData(data);
        })
        .catch(onError);
  }, [restaurantSlug, forceRefetch]);

  function refetch() {
    setForceRefetch((prev) => prev + 1);
  }

  return { data, refetch };
}
