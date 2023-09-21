import { type HttpPostParams, type HttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCode, type HttpResponse } from '@/data/protocols/http/http-response';

export class HttpPostClientSpy<BodyRequest, ResponseBody> implements HttpPostClient<BodyRequest, ResponseBody> {
  url?: string;
  body?: BodyRequest;
  response: HttpResponse<ResponseBody> = {
    statusCode: HttpStatusCode.ok
  };

  async post ({ url, body }: HttpPostParams<BodyRequest>): Promise<HttpResponse<ResponseBody>> {
    this.url = url;
    this.body = body;
    return await Promise.resolve(this.response);
  }
}
