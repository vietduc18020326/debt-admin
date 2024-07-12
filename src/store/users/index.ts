import { createArrayZustand, createObjectZustand } from "@/utils";
import { IUser } from "@/store/users/type";

export const [useMe, getMe, syncMe] = createObjectZustand<IUser | undefined>(
  undefined
);

export const [
  useUser,
  getUser,
  useUserByQuery,
  getUserByQuery,
  syncUser,
  setUserQueries,
  deleteUser,
  resetUser,
  useUserMap,
  getUserMap,
] = createArrayZustand<IUser>(["id"]);
