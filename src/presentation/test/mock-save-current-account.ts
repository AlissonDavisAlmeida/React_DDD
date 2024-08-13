import { type AccountModel } from "@/domain/models";
import { type SaveCurrentAccount } from "@/domain/usecases";

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  accessToken: string = "";
  async save (accountModel: AccountModel): Promise<void> {
    this.accessToken = accountModel.token;
  }
}
