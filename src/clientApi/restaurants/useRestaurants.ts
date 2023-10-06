import { RoutesOutput } from "../routeOutputs";
import axios from "axios";
import { useEffect, useState } from "react";

export function useRestaurants(onError: (err: string) => void) {
  const [data, setData] = useState<RoutesOutput["restaurants"]["GET"]>([]);

  useEffect(() => {
    axios
      .get("/api/restaurants")
      .then(({ data }) => {
        setData(data);
      })
      .catch(onError);
  }, []);

  return { data };
}
