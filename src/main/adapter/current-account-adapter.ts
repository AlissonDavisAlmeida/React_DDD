import { UnexpectedError } from "@/domain/errors";
import { type AccountModel } from "@/domain/models";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const setCurrentAccountAdapter = (account: AccountModel) => {
  if (!account.token) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set("account", account);
};

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get("account");
};
