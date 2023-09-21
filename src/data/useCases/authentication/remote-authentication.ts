import { type HttpPostClient } from '@/data/protocols/http/http-post-client';
import { MapHttpStatusToDomainError } from '@/data/protocols/http/http-response';
import { type AccountModel } from '@/domain/models/account.model';
import { type Authentication, type AuthenticationParams } from '@/domain/usecases/authentication';

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
      throw new Error('Unexpected error');
    }

    return await Promise.resolve(httpResponse.body);
  }
}
