import { type HttpResponse, type HttpPostParams, type HttpPostClient } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const result = await axios.post(params.url, params?.body);

    return {
      statusCode: result.status,
      body: result.data
    };
  }
}
