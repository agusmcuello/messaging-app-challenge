import { AxiosResponse } from 'axios';

import HttpResponse from '../../../../http/HttpResponse';
import { HttpStatusCode } from '../constants';

export function parseResponse(response: AxiosResponse): HttpResponse {
  const body = response.status === HttpStatusCode.NO_CONTENT ? null : response.data;

  return new HttpResponse(response.status, body, response.headers);
}
