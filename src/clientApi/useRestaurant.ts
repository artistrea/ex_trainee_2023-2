import { RoutesOutput } from "./routeOutputs";
import axios from "axios";
import { useEffect, useState } from "react";

export function useRestaurant(
  restaurantSlug: string,
  onError: (err: any) => void
) {
  const [data, setData] =
    useState<RoutesOutput["restaurants"]["slug"]["GET"]>();

  useEffect(() => {
    axios
      .get(`/api/restaurants/${restaurantSlug}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch(onError);
  }, []);

  return { data };
}