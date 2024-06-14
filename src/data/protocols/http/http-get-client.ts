import { type HttpResponse } from "./";

export interface HttpGetParams {
  url: string
}

export interface HttpGetClient<BodyResponse> {
  get: (params: HttpGetParams) => Promise<HttpResponse<BodyResponse>>
}
