import { LocalSaveAccessToken } from "@/data/useCases/save-access-token/local-save-access-token";
import { type SaveAccessToken } from "@/domain/usecases/save-access-token";
import { makeLocalStorageAdapter } from "@/main/factories/cache/local-storage-adapter-factory";

export const makeSaveAccessToken = (): SaveAccessToken => {
  const setStorage = makeLocalStorageAdapter();
  const localSaveAccessToken = new LocalSaveAccessToken(setStorage);

  return localSaveAccessToken;
};
