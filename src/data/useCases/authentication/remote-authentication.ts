import { MapHttpStatusToDomainError, type HttpPostClient } from "@/data/protocols/http";
import { type AccountModel } from "@/domain/models";
import { type Authentication, type AuthenticationParams } from "@/domain/usecases";

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth (authenticationParams: AuthenticationParams) {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: authenticationParams });

    const error = MapHttpStatusToDomainError.get(httpResponse.statusCode);
    if (error) {
      error();
    }

    if (!httpResponse.body) {
      throw new Error("Unexpected error");
    }
    console.log(httpResponse.body);
    return await Promise.resolve(httpResponse.body);
  }
}
