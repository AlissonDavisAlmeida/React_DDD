import { LocalSaveAccessToken } from "@/data/useCases/save-access-token/local-save-access-token";
import { type SaveCurrentAccount } from "@/domain/usecases";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-adapter-factory";

export const makeSaveAccessToken = (): SaveCurrentAccount => {
  const setStorage = makeLocalStorageAdapter();
  const localSaveAccessToken = new LocalSaveAccessToken(setStorage);

  return localSaveAccessToken;
};
