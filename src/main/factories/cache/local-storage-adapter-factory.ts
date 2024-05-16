import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";

export const makeLocalStorageAdapter = () => {
  const setStorage = new LocalStorageAdapter();

  return setStorage;
};
