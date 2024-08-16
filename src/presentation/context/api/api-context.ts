import { type AccountModel } from "@/domain/models";
import { createContext } from "react";

export interface ApiContextProps {
  setCurrentAccount: (account: AccountModel) => void
}

export const ApiContext = createContext<ApiContextProps>({
  setCurrentAccount: () => {}
});
