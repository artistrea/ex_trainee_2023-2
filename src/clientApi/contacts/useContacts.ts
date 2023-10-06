import { RoutesOutput } from "../routeOutputs";
import axios from "axios";
import { useEffect, useState } from "react";

export function useContacts(onError: (err: any) => void) {
  const [data, setData] = useState<RoutesOutput["contacts"]["GET"]>([]);

  useEffect(() => {
    axios
      .get("/api/contacts")
      .then(({ data }) => {
        setData(data);
      })
      .catch(onError);
  }, []);

  return { data };
}
