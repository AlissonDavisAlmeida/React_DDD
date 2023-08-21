import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials.error';
import { UnexpectedError } from '@/domain/errors/unexpected.error';

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: any
}

export const MapHttpStatusToDomainError = new Map<HttpStatusCode, () => Error>([
  [HttpStatusCode.unauthorized, () => { throw new InvalidCredentialsError(); }],
  [HttpStatusCode.badRequest, () => { throw new UnexpectedError(); }],
  [HttpStatusCode.serverError, () => { throw new UnexpectedError(); }],
  [HttpStatusCode.notFound, () => { throw new UnexpectedError(); }]

]);
