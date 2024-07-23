import { createArrayZustand } from "shared-core";
import { ICredential } from "./type";

export const [
  useCredential,
  getCredential,
  useCredentialByQuery,
  getCredentialByQuery,
  syncCredential,
  setCredentialQueries,
  deleteCredential,
  resetCredential,
  useCredentialMap,
  getCredentialMap,
] = createArrayZustand<ICredential>(["email"]);
