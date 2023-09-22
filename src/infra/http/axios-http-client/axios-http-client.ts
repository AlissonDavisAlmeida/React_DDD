import { type HttpResponse, type HttpPostParams } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const result = await axios.post(params.url, params?.body);

    return {
      statusCode: result.status,
      body: result.data
    };
  }
}
