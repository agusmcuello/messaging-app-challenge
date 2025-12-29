import HttpResponse from './HttpResponse';
import { AbortClass } from '../classes/AbortClass';
import { HttpProgressEvent } from './HttpProgressEvent';

export interface RequestData<T = any> {
  endpoint: string;

  body?: T;

  headers?: HttpHeader;

  params?: Params;

  abort?: AbortClass;

  handleUploadProgress?: HttpProgressEvent;
}

export type Params = Record<string, any>;

export interface HttpHeader {
  Authorization?: string;

  'Content-Type'?: ContentType;

  [key: string]: any;
}

export enum ContentType {
  JSON = 'application/json;charset=UTF-8',

  FORMDATA = 'multipart/form-data'
}

export type HttpRequest = (data: RequestData) => Promise<HttpResponse>;
