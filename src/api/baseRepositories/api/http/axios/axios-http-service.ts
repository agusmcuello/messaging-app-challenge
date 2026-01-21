import { AxiosError, AxiosProgressEvent } from "axios";

import apiClient from "./client";

import { ContentType, HttpRequest, RequestData } from "../../../../http/Http";
import { HttpProgressEvent } from "../../../../http/HttpProgressEvent";
import HttpResponse from "../../../../http/HttpResponse";
import { HttpStatusCode } from "../constants";
import { throwHttpError } from "../http-error";
import { parseResponse } from "./parsers";

export class HttpService {
  public static async postAsync(data: RequestData) {
    return HttpService.executeRequestAsync(HttpService.executePostAsync, data);
  }

  public static async putAsync(data: RequestData) {
    return HttpService.executeRequestAsync(HttpService.executePutAsync, data);
  }

  public static async getAsync(data: RequestData) {
    return HttpService.executeRequestAsync(HttpService.executeGetAsync, data);
  }

  public static async deleteAsync(data: RequestData) {
    return HttpService.executeRequestAsync(
      HttpService.executeDeleteAsync,
      data
    );
  }

  private static async executeRequestAsync(
    requestAsync: HttpRequest,
    data: RequestData
  ) {
    const isFormData =
      data.body && typeof data.body === "object" && "_parts" in data.body;

    if (isFormData) {
      data.headers = {
        ...data.headers,
        "Content-Type": "multipart/form-data" as any,
      };
    } else {
      data.headers = data.headers ?? { "Content-Type": ContentType.JSON };
    }

    data.params = data.params ?? {};
    data.body = data.body ?? {};

    try {
      const response = await requestAsync(data);
      return response.body;
    } catch (e: any) {
      const { response } = e as AxiosError<any, any>;

      const error = new HttpResponse(
        response?.status ?? HttpStatusCode.FRONTEND_ERROR,
        response?.data,
        response?.headers
      );

      return throwHttpError(error);
    }
  }

  private static async executePostAsync(
    data: RequestData
  ): Promise<HttpResponse> {
    const axiosResponse = await apiClient.post(data.endpoint, data.body, {
      headers: data.headers,
      params: data.params,
      signal: data.abort?.getSignal(),
      onUploadProgress: (axiosProgressEvent) =>
        parseProgressEvent(axiosProgressEvent, data.handleUploadProgress),
    });

    return parseResponse(axiosResponse);
  }

  private static async executeGetAsync(
    data: RequestData
  ): Promise<HttpResponse> {
    const axiosResponse = await apiClient.get(data.endpoint, {
      headers: data.headers!,
      params: data.params!,
      signal: data.abort?.getSignal(),
    });

    return parseResponse(axiosResponse);
  }

  private static async executePutAsync(
    data: RequestData
  ): Promise<HttpResponse> {
    const axiosResponse = await apiClient.put(data.endpoint, data.body!, {
      headers: data.headers!,
      params: data.params!,
      signal: data.abort?.getSignal(),
      onUploadProgress: (axiosProgressEvent) =>
        parseProgressEvent(axiosProgressEvent, data.handleUploadProgress),
    });

    return parseResponse(axiosResponse);
  }

  private static async executeDeleteAsync(
    data: RequestData
  ): Promise<HttpResponse> {
    const axiosResponse = await apiClient.delete(data.endpoint, {
      headers: data.headers!,
      params: data.params!,
      signal: data.abort?.getSignal(),
    });

    return parseResponse(axiosResponse);
  }
}

function parseProgressEvent(
  axiosProgressEvent: AxiosProgressEvent,
  handleUploadProgress?: HttpProgressEvent
) {
  if (handleUploadProgress) {
    const total = axiosProgressEvent.total ?? axiosProgressEvent.loaded;
    const { loaded, bytes } = axiosProgressEvent;
    const percentage = Math.round((loaded / total) * 100);

    handleUploadProgress(percentage, loaded, total, bytes);
  }
}
