import { MapHttpStatusToDomainError, type HttpPostClient } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { type AccountModel } from "@/domain/models";
import { type AddAccountParams, type AddAccount } from "@/domain/usecases";

export class RemoteAddAccountUseCase implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AddAccountParams, AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel | undefined> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });

    const error = MapHttpStatusToDomainError.get(httpResponse.statusCode);

    if (error) {
      error();
    }

    if (!httpResponse.body) {
      throw new UnexpectedError();
    }

    return await Promise.resolve(httpResponse.body);
  }
}
