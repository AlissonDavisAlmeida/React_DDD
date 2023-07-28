import { type HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  async post (url: string): Promise<void> {
    this.url = url;
    await Promise.resolve();
  }
}

describe('RemoteAuthentication', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const httpPostClient = new HttpPostClientSpy();
    const url = 'any_url';
    const sut = new RemoteAuthentication(url, httpPostClient);

    await sut.auth();

    expect(httpPostClient.url).toBe(url);
  });
});
