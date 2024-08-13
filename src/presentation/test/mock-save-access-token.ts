import { type AccountModel } from "@/domain/models";
import { type SaveCurrentAccount } from "@/domain/usecases";

export class SaveAccessTokenMock implements SaveCurrentAccount {
  accessToken: string = "";
  async save (accountModel: AccountModel): Promise<void> {
    this.accessToken = accountModel.token;
  }
}
