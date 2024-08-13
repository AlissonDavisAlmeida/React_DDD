import { LocalSaveCurrentAccount } from "@/data/useCases/local-save-current-account/local-save-current-account";
import { type SaveCurrentAccount } from "@/domain/usecases";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-adapter-factory";

export const makeSaveAccessToken = (): SaveCurrentAccount => {
  const setStorage = makeLocalStorageAdapter();
  const localSaveAccessToken = new LocalSaveCurrentAccount(setStorage);

  return localSaveAccessToken;
};
