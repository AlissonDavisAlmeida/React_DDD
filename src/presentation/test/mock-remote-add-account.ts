import { type AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { type AddAccountParams, type AddAccount } from "@/domain/usecases";

export class RemoteAddAccountMock implements AddAccount {
  accessToken: string | undefined;
  name: string | undefined;
  async add (params: AddAccountParams): Promise<AccountModel | undefined> {
    const accountModel = mockAccountModel();
    this.accessToken = accountModel.token;
    this.name = accountModel.name;
    return await Promise.resolve(accountModel);
  }
}
