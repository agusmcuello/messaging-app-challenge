import { HttpStatusCode } from "../baseRepositories/api/http/constants";

export class BaseError<T = any> extends Error {
  public readonly status: HttpStatusCode;

  public readonly code?: number;

  public readonly response?: T;

  public readonly details?: T;

  constructor(
    message: string,
    status: HttpStatusCode,
    code?: number,
    response?: any,
    details?: any
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.response = response;
    this.details = details;
  }
}
