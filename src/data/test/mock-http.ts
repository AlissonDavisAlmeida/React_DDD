import { HttpStatusCode, type HttpPostClient, type HttpPostParams, type HttpResponse } from "@/data/protocols/http/";
import { faker } from "@faker-js/faker/locale/pt_BR";

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

export const mockPostRequest = (): HttpPostParams<any> => {
  return {
    url: faker.internet.url(),
    body: faker.person.bio
  };
};