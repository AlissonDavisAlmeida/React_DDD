import { type SetStorage } from "../protocols/cache/set-storage";

export class SetStorageMock implements SetStorage {
  key: string = "";
  value: string = "";

  set (key: string, value: object): void {
    this.key = key;
    this.value = JSON.stringify(value);
  }
}
