import { type HttpPostClient } from '@/data/protocols/http/http-post-client';
import { MapHttpStatusToDomainError } from '@/data/protocols/http/http-response';
import { type AuthenticationParams } from '@/domain/usecases/authentication';

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) { }

  async auth (authenticationParams: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: authenticationParams });

    // switch (httpResponse.statusCode) {
    //   case HttpStatusCode.unauthorized: {
    //     throw new InvalidCredentialsError();
    //   }
    //   case HttpStatusCode.badRequest: {
    //     throw new UnexpectedError();
    //   }
    //   default: {
    //     await Promise.resolve();
    //   }
    // }

    const error = MapHttpStatusToDomainError.get(httpResponse.statusCode);
    if (error) {
      error();
    }

    await Promise.resolve();
  }
}
