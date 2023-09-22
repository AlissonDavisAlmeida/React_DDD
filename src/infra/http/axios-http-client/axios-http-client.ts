import { type HttpPostParams } from '@/data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post (params: HttpPostParams<any>) {
    await axios.post(params.url);
  }
}
