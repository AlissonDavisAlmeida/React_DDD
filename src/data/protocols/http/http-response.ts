import { InvalidCredentialsError, UnexpectedError } from "@/domain/errors";
import { EmailInUseError } from "@/domain/errors/email-in-use.error";

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  emailInUse = 403,
  notFound = 404,
  serverError = 500
}

export interface HttpResponse<BodyResponse = any> {
  statusCode: HttpStatusCode
  body?: BodyResponse
}

export const MapHttpStatusToDomainError = new Map<HttpStatusCode, () => Error>([
  [HttpStatusCode.unauthorized, () => { throw new InvalidCredentialsError(); }],
  [HttpStatusCode.badRequest, () => { throw new UnexpectedError(); }],
  [HttpStatusCode.serverError, () => { throw new UnexpectedError(); }],
  [HttpStatusCode.notFound, () => { throw new UnexpectedError(); }],
  [HttpStatusCode.emailInUse, () => { throw new EmailInUseError(); }]

]);
