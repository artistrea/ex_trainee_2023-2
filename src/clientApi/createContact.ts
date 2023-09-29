import { Prisma } from "@prisma/client";
import axios from "axios";

export function createContact(
  data: Prisma.ContactCreateInput
): Promise<Prisma.ContactCreateInput> {
  return axios.post("/api/contact", data);
}
