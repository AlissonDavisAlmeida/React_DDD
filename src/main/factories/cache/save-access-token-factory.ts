import { LocalSaveAccessToken } from "@/data/useCases/save-access-token/local-save-access-token";
import { type SaveAccessToken } from "@/domain/usecases/save-access-token";
import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";

export const makeSaveAccessToken = (): SaveAccessToken => {
  const setStorage = new LocalStorageAdapter();
  const localSaveAccessToken = new LocalSaveAccessToken(setStorage);

  return localSaveAccessToken;
};
