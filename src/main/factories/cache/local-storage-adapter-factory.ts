import { LocalStorageAdapter } from "@/infra/cache/local-storage-adapter";

export const makeLocalStorageAdapter = () => {
  const storage = new LocalStorageAdapter();

  return storage;
};
