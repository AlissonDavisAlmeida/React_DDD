import { type AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { type AddAccountParams, type AddAccount } from "@/domain/usecases";

export class RemoteAddAccountMock implements AddAccount {
  accessToken: string | undefined;
  async add (params: AddAccountParams): Promise<AccountModel | undefined> {
    const accountModel = mockAccountModel();
    this.accessToken = accountModel.accessToken;
    return await Promise.resolve(accountModel);
  }
}
