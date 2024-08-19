import { type GetStorage } from "@/data/protocols/cache/get-storage";
import { type SetStorage } from "@/data/protocols/cache/set-storage";

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set (key: string, value: object): void {
    const valueInString = JSON.stringify(value);
    localStorage.setItem(key, valueInString);
  }

  get (key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
}
