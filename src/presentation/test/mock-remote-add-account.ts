import { type AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";
import { type AddAccountParams, type AddAccount } from "@/domain/usecases";

export class RemoteAddAccountMock implements AddAccount {
  async add (params: AddAccountParams): Promise<AccountModel | undefined> {
    const accountModel = mockAccountModel();

    return await Promise.resolve(accountModel);
  }
}
