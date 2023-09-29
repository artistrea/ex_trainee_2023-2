import { Prisma } from "@prisma/client";
import axios, { AxiosPromise } from "axios";

export function createContact(
  data: Prisma.ContactCreateInput
): AxiosPromise<Prisma.ContactCreateInput> {
  return axios.post("/api/contact", data);
}
