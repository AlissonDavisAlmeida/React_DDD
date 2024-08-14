import { type SetStorage } from "@/data/protocols/cache/set-storage";
import { type AccountModel } from "@/domain/models";
import { type SaveCurrentAccount } from "@/domain/usecases";

export class LocalSaveCurrentAccount implements SaveCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}
  async save (accountModel: AccountModel): Promise<void> {
    const accountModelString = JSON.stringify(accountModel);
    this.setStorage.set("accountModel", accountModelString);
  }
}
