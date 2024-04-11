import { type HttpResponse } from "./";

export interface HttpPostParams<BodyRequest> {
  url: string
  body?: BodyRequest
}

export interface HttpPostClient<BodyRequest, BodyResponse> {
  post: (params: HttpPostParams<BodyRequest>) => Promise<HttpResponse<BodyResponse>>
}
