import { type AccountModel } from "@/domain/models";
import { type SaveCurrentAccount } from "@/domain/usecases";

export class SaveCurrentAccountMock implements SaveCurrentAccount {
  accessToken: string = "";
  save = (accountModel: AccountModel): void => {
    // this.accessToken = accountModel.token;
  };
}
