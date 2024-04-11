import { type HttpResponse, type HttpPostParams, type HttpPostClient } from "@/data/protocols/http";
import axios, { type AxiosError } from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post (params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    try {
      const { data, status } = await axios.post(params.url, params?.body);

      return {

        statusCode: status,
        body: data
      };
    } catch (error: any) {
      const errorResponse = error as AxiosError;
      return {
        statusCode: errorResponse.response?.status as number,
        body: errorResponse.response?.data

      };
    }
  }
}
