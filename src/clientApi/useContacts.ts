import { Contact } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export function useContacts(onError: (err: any) => void) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    axios
      .get("/api/contacts")
      .then(({ data }) => {
        setContacts(data);
      })
      .catch(onError);
  }, []);

  return { contacts };
}
