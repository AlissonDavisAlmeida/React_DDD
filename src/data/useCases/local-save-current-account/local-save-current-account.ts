import { type SetStorage } from "@/data/protocols/cache/set-storage";
import { type AccountModel } from "@/domain/models";
import { type SaveCurrentAccount } from "@/domain/usecases";

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}
  save (accountModel: AccountModel): void {
    this.setStorage.set("accountModel", accountModel);
  }
}
