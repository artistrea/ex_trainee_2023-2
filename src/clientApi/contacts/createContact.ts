import { RoutesOutput } from "../routeOutputs";
import { Prisma } from "@prisma/client";
import axios, { AxiosPromise } from "axios";

export function createContact(
  data: Prisma.ContactCreateInput
): AxiosPromise<RoutesOutput["contacts"]["POST"]> {
  return axios.post("/api/contacts", data);
}
