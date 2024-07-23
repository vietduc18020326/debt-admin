"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@/hooks";
import { IUser } from "shared-core";

interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: (user: any) => {
    console.log("empty setUser function");
  },
});

export const AuthProvider = function ({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  useAuth();

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
