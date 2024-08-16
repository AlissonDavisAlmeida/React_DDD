import { type SetStorage } from "@/data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage {
  set (key: string, value: object): void {
    const valueInString = JSON.stringify(value);
    localStorage.setItem(key, valueInString);
  }
}
